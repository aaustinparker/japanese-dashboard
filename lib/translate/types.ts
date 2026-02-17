type TranslateRequest = {
  q: string;
  source: 'en' | 'ja';
  target: 'en' | 'ja';
};

type TranslateResponse = {
  translatedText: string;
};