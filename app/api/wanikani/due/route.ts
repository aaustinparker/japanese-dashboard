import { fetchExternal } from '@/lib/api';

export async function GET() {
  return fetchExternal('wanikani', 'summary')
    .then((json) => {
      const totalReviews = json.data.reviews[0].subject_ids.length;
      const totalLessons = json.data.lessons[0].subject_ids.length;
      return Response.json({
        reviews: totalReviews,
        lessons: totalLessons,
      })
    })
    .catch((error) => {
      console.error('Failed to fetch due items:', error);
      return Response.json((error as Error).message, { status: 500 });
    })

}