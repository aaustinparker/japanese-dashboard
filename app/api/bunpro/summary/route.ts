
import { getDueItems, getUserLevel, getTotalProgress } from '@/lib/bunpro/endpoints';

export async function GET() {
  return Promise.all([
    getDueItems(),
    getUserLevel(),
    getTotalProgress(),
  ])
  .then(results => Response.json(Object.assign({}, ...results)))
  .catch(error => {
    return Response.json((error as Error).message, { status: 500 });
  })

}