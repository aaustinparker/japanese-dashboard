import { fetchExternal } from "../api";

export function getUserLevel() : Promise<{ level: number }> {
    return fetchExternal('bunpro', 'user')
        .then(({user}) => ({
            level: user.data.attributes.level as number,
        }))
        .catch((error) => {
            console.error('Failed to fetch user info:', error);
            throw error;
        })
}

export function getDueItems() : Promise<{ grammarDue: number; vocabDue: number }> {
  return fetchExternal('bunpro', 'user/due')
    .then((json) => ({
        grammarDue: json.total_due_grammar as number,
        vocabDue: json.total_due_vocab as number,
    }))
    .catch((error) => {
      console.error('Failed to fetch due items:', error);
      throw error;
    })
}

export function getTotalProgress() : Promise<{ totalProgress: any }> {
    return fetchExternal('bunpro', 'user_stats/jlpt_progress_mixed')
        .then((json) => ({
            totalProgress: json
        }))
        .catch((error) => {
            console.error('Failed to fetch total progress:', error);
            throw error;
        })
}