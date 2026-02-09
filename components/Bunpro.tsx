'use client';

import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Bunpro() {
  const [grammarDue, setGrammarDue] = useState<number>(0);
  const [vocabDue, setVocabDue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch('/api/bunpro/summary')
      const json = await response.json();
      setGrammarDue(json.grammarDue);
      setVocabDue(json.vocabDue);
    }
    fetchSummary();
  }, []);

  const buttonTheme = createTheme({
    palette: {
        primary: {
          main: '#FFF'
        }
      }
  });
    
  return (
    <div id="bunpro-container">
      <div id="bunpro-item-boxes" className="w-full mb-4 flex justify-center gap-1">
        <div id="bunpro-grammar-box" className="w-2/5 bg-bunpro-light inline-block text-bunpro-dark p-3 mr-1 rounded-xl">
          <Typography gutterBottom sx={{marginBottom:0}}>Today's</Typography>
          <Typography variant="h6" component="span">Grammar </Typography>
          <Typography component="span" className='bg-black text-white inline-block rounded-full px-2'>
            {grammarDue}
          </Typography>
          <Typography className='block' sx={{marginTop:'0.5em'}} gutterBottom>
            Practice with sentences.
          </Typography>
          <ThemeProvider theme={buttonTheme}>
            <Button 
              variant="contained"
              size="large"
              color="primary"
              href="https://www.bunpro.jp/reviews?only_review=grammar" target="_blank" rel="noopener noreferrer"
              endIcon={<ArrowForwardIosIcon />}>
              Go to Grammar
            </Button>
          </ThemeProvider>
        </div>
        
        <div id="bunpro-vocab-box" className="w-2/5 bg-bunpro-red inline-block text-bunpro-dark p-3 rounded-xl">
          <Typography gutterBottom sx={{marginBottom:0}}>Today's</Typography>
          <Typography variant="h6" component="span">Vocabulary </Typography>
          <Typography component="span" className='bg-black text-white inline-block rounded-full px-2'>
            {vocabDue}
          </Typography>
          <Typography className='block' sx={{marginTop:'0.5em'}} gutterBottom>
            Learning new words.
          </Typography>
          <ThemeProvider theme={buttonTheme}>
            <Button 
              variant="contained"
              size="large"
              color="primary"
              href="https://www.bunpro.jp/reviews?only_review=vocabulary" target="_blank" rel="noopener noreferrer"
              endIcon={<ArrowForwardIosIcon />}>
              Go to Vocab
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>

  );
}