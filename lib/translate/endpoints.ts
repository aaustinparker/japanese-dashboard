import { fetchExternal } from '../api';

export async function getTranslation(request: Request) : Promise<TranslateResponse> {
  let payload: TranslateRequest;
  try {
    payload = (await request.json()) as TranslateRequest;
  } catch (error: any) {
    console.log('Invalid translate request payload:', error);
    throw error;
  }

  try {
    const json = await fetchExternal('translate', 'translate', payload);
    const response = json as TranslateResponse;
    return { translatedText: response.translatedText };
  } catch (error: any) {
    console.error('Failed to fetch translation:', error);
    throw error;
  }
}