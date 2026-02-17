import { getTranslation } from "@/lib/translate/endpoints";

export async function POST(request: Request) {
    return getTranslation(request)
      .then(response => Response.json(response))
      .catch(error => {
        return Response.json((error as Error).message, { status: 500 });
    })
}