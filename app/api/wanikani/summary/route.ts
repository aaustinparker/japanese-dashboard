
import { getDueItems, getPastMisses, getRecentMisses, getUserInfo } from '@/lib/wanikani/endpoints';

export async function GET() {
  return Promise.all([
    getDueItems(),
    getRecentMisses(),
    getPastMisses(),
    getUserInfo()
  ])
  .then(results => Response.json(Object.assign({}, ...results)))
  .catch(error => {
    return Response.json((error as Error).message, { status: 500 });
  })

}