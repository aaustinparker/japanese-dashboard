'use client';

import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment, {inputAdornmentClasses} from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function Translate() {
  // types and interfaces
  type Language = 'en' | 'ja';
  const languageName: Record<Language, string> = {
    'en': 'English',
    'ja': 'Japanese'
  };
  interface Translation {
    from: Language;
    sourceText: string;
    to: Language;
    translatedText: string;
  }

  // reactive state
  const[translation, setTranslation] = useState<Translation>({
    from: 'en',
    sourceText: '',
    to: 'ja',
    translatedText: '',
  });
  const [debounceText, setDebounceText] = useState('');

  // constants
  const maxSourceText = 2000;
  const displayRows = 10;
  const debounceMillis = 1000;

  // only send API request after user has stopped typing for a bit
  useEffect(() => {
    const pid = setTimeout(() => {
      setDebounceText(translation.sourceText);
    }, debounceMillis);

    return () => clearTimeout(pid);
  }, [translation.sourceText]);

  useEffect(() => {
    translateText();
  }, [debounceText]);

  const swapLanguages = () => {
    setTranslation(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
      sourceText: prev.translatedText,
      translatedText: '',
    }));
  }

  const translateText = async () => {
    if (!translation.sourceText.trim()) {
      setTranslation(prev => ({ ...prev, translatedText: '' }));
      return;
    }
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: translation.sourceText,
        source: translation.from,
        target: translation.to,
      }),
    });

    if (res.ok) {
      const json = await res.json();
      setTranslation(prev => ({ ...prev, translatedText: json.translatedText }));
    } else {
      setTranslation(prev => ({ ...prev, translatedText: '' }));
    }
  }

  return (
    <div id="translation-container"  className="flex items-start">

      <div id="source-text-container" className="flex-1">
        <Typography variant="h5" sx={{fontWeight: 'bold'}} className="text-center">{languageName[translation.from]}</Typography>
        <TextField
          id="source-text"
          label="Your text"
          multiline
          rows={displayRows}
          value={translation.sourceText}
          onChange={(e) => setTranslation(prev => ({ ...prev, sourceText: e.target.value }))}
          variant="outlined"
          className="w-full"
          slotProps={{
            input: {
              endAdornment: 
                <InputAdornment position="end">
                  {translation.sourceText.length}/{maxSourceText}
                </InputAdornment>,
            }
          }}
          sx={{
            marginTop: '0.25rem',
            [`.${inputBaseClasses.root}`]: {
              alignItems: 'end',
              fontSize: '1.2rem',
            },
            [`.${inputAdornmentClasses.root}`]: {
              fontSize: '.75rem',
            },
            [`.${inputBaseClasses.focused} .${inputAdornmentClasses.root}`]: {
              color: 'primary.main',
            },
          }}
        />
      </div>

      <div id="swap-language-container" className="text-4xl flex-none flex justify-center items-center px-4">
        <SwapHorizIcon onClick={swapLanguages} className="cursor-pointer" fontSize="inherit" />
      </div>

      <div id="translation-container" className="flex-1">
        <Typography variant="h5" sx={{fontWeight: 'bold'}} className="text-center">{languageName[translation.to]}</Typography>
        <TextField
          id="translation-text"
          label="Translation"
          multiline
          disabled
          rows={displayRows}
          value={translation.translatedText}
          onChange={(e) => setTranslation(prev => ({ ...prev, translatedText: e.target.value }))}
          variant="filled"
          className="w-full"
          sx={{
            marginTop: '0.25rem',
            [`.${inputBaseClasses.root}`]: {
              fontSize: '1.2rem',
            },
          }}
        />
      </div>

    </div>
  );
}