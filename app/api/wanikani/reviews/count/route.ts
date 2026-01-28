import { fetchExternal } from '@/lib/api';

export async function GET() {
  return fetchExternal('wanikani', 'assignments?immediately_available_for_review')
    .then((json) => Response.json(json.total_count))
    .catch((error) => {
      console.error('Failed to fetch reviews:', error);
      return Response.json((error as Error).message, { status: 500 });
    })

}