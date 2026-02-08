import { fetchExternal } from "../api";
import { Subject, User } from "./types";

export function getUserInfo() : Promise<{ user: User }> {
    return fetchExternal('wanikani', 'user')
        .then(({data}) => ({
            user: {
                profileUrl: data.profile_url,
                username: data.username,
                level: data.level,
            }
        }))
        .catch((error) => {
            console.error('Failed to fetch user info:', error);
            throw error;
        })
}

export function getDueItems() : Promise<{ reviews: Subject[]; lessons: Subject[] }> {
    return fetchExternal('wanikani', 'summary')
        .then((json) => {
            const reviewIds = json.data.reviews[0].subject_ids;
            const lessonIds = json.data.lessons[0].subject_ids;
            
            return Promise.all([
                getSubjectsById(reviewIds),
                getSubjectsById(lessonIds)
            ]).then(([reviews, lessons]) => ({
                reviews,
                lessons
            }));
        })
        .catch((error) => {
            console.error('Failed to fetch due items:', error);
            throw error;
        })
}

export function getRecentMisses() : Promise<{ recentMisses: Subject[] }> {
    const daysAgo = 7;
    const oneWeekAgoMidnightUtc = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    oneWeekAgoMidnightUtc.setUTCHours(0, 0, 0, 0);
    const iso = oneWeekAgoMidnightUtc.toISOString(); // 2026-01-01T00:00:00.000Z
    return fetchExternal('wanikani', `review_statistics?updated_after=${iso}`)
        .then((json) => {
            const recentMissIds = (json.data as any[])
            .map(nested => nested.data)
            .filter(subject => subject.percentage_correct != 100 && (subject.reading_current_streak == 1 || subject.meaning_current_streak == 1))
            .map(subject => subject.subject_id);
            
            return getSubjectsById(recentMissIds)
                .then((recentMisses) => ({
                    recentMisses
                }));
        })
        .catch((error) => {
            console.error('Failed to fetch recent misses:', error);
            throw error;
        })
}

export function getPastMisses() : Promise<{ pastMisses: Subject[] }> {
    const percentThreshold = 85;
    return fetchExternal('wanikani', `review_statistics?percentages_less_than=${percentThreshold}`)
        .then((json) => {
            const pastMissIds = (json.data as any[])
            .map(nested => nested.data)
            .filter(subject => (subject.meaning_incorrect + subject.reading_incorrect) >= 5)
            .map(subject => subject.subject_id);
            
            return getSubjectsById(pastMissIds)
                .then((pastMisses) => ({
                    pastMisses
                }));
        })
        .catch((error) => {
            console.error('Failed to fetch past misses:', error);
            throw error;
        })
}

function getSubjectsById(subjectIds: number[]): Promise<Subject[]> {
    const batchSize = 100;
    const numBatches = Math.ceil(subjectIds.length / batchSize);
    const fetches: Promise<Subject[]>[] = [];
    
    for (let i = 0; i < numBatches; i++) {
        const batchIds = subjectIds.slice(i * batchSize, (i + 1) * batchSize);
        if (batchIds.length > 0) {
            fetches.push(
                fetchExternal('wanikani', `subjects?ids=${batchIds.join(',')}`).then((json) => json.data)
            );
        }
    }
    
    return Promise.all(fetches).then((results) => results.flat());
}