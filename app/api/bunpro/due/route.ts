import { fetchExternal } from '@/lib/api';

export async function GET() {
  return fetchExternal('bunpro', 'user/due')
    .then((json) => Response.json(
      {
        grammar: json.total_due_grammar,
        vocabulary: json.total_due_vocab,
      }
    ))
    .catch((error) => {
      console.error('Failed to fetch due items:', error);
      return Response.json((error as Error).message, { status: 500 });
    })

}