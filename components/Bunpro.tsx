'use client';

import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BarChart } from "@mui/x-charts/BarChart";
import { TotalProgress } from "@/lib/bunpro/types";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Gauge, gaugeClasses} from "@mui/x-charts/Gauge";

export default function Bunpro() {
  const [grammarDue, setGrammarDue] = useState<number>(0);
  const [vocabDue, setVocabDue] = useState<number>(0);
  const [totalProgress, setTotalProgress] = useState<TotalProgress|undefined>(undefined);
  const [level, setLevel] = useState<number>(0);

  type ViewType = 'grammarChart' | 'vocabChart';
  const [activeView, setActiveView] = useState<ViewType>('grammarChart');

  const handleViewChange = (event: SelectChangeEvent) => {
    setActiveView(event.target.value as ViewType);
  };

  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch('/api/bunpro/summary')
      const json = await response.json();
      setGrammarDue(json.grammarDue);
      setVocabDue(json.vocabDue);
      setTotalProgress(json.totalProgress);
      setLevel(Math.min(100, json.level)); // max level sometimes returned as 101
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
            Study new words.
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

      <div className="w-full flex justify-between mt-10 mb-4">
        <div id="bunpro-view-select-container" className="flex items-center">
          <Box>
            <Typography component="span" gutterBottom>
              Currently viewing:&nbsp;&nbsp;
            </Typography>
          </Box>
          <Box className="inline-block min-w-[150px]">
            <FormControl fullWidth>
              <Select
                id="bunpro-view-select"
                value={activeView}
                onChange={handleViewChange}
              >
                <MenuItem value={'grammarChart'}>Grammar Chart</MenuItem>
                <MenuItem value={'vocabChart'}>Vocab Chart</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div id="bunpro-level-container" className="flex items-center">
          <Box>
            <Typography component="span" gutterBottom>
              Current Level:
            </Typography>
          </Box>
          <Box id="bunpro-level-gauge">
            <Gauge 
              width={70}
              height={70}
              innerRadius="80%"
              outerRadius="100%"
              valueMin={0}
              valueMax={100}
              value={level}
              sx={{
                [`& .${gaugeClasses.valueArc}`]: {
                  fill: 'var(--color-bunpro-red)',
                },
              }}
            />
          </Box>
        </div>
      </div>
      
      <div id="bunpro-chart-container">
        {!totalProgress ? (
            <Skeleton variant="rectangular" width="100%" height={400} />
          ) : (
        <>
          {activeView === 'grammarChart' && (
            <div id="bunpro-grammar-chart">
              <Typography className="text-center" variant="h6" component="h2" gutterBottom>
                Grammar Progress By Level
              </Typography>
              <BarChart
                xAxis={[{ data: ['Level 5', 'Level 4', 'Level 3', 'Level 2', 'Level 1'] }]}
                yAxis={[{ label: "Items Studied" }]}
                dataset={Object.values(totalProgress.grammar).reverse()}
                series={[
                  { dataKey: "beginner", label: "Beginner" },
                  { dataKey: "adept", label: "Adept" },
                  { dataKey: "seasoned", label: "Seasoned" },
                  { dataKey: "expert", label: "Expert" },
                  { dataKey: "master", label: "Master" }
                ]}
                height={300}
              />
            </div>
          )}

          {activeView === 'vocabChart' && (
            <div id="bunpro-vocab-chart" className="mt-10">
              <Typography className="text-center" variant="h6" component="h2" gutterBottom>
                Vocab Progress By Level
              </Typography>
              <BarChart
                xAxis={[{ data: ['Level 5', 'Level 4', 'Level 3', 'Level 2', 'Level 1'] }]}
                yAxis={[{ label: "Items Studied" }]}
                dataset={Object.values(totalProgress.vocab).reverse()}
                series={[
                  { dataKey: "beginner", label: "Beginner" },
                  { dataKey: "adept", label: "Adept" },
                  { dataKey: "seasoned", label: "Seasoned" },
                  { dataKey: "expert", label: "Expert" },
                  { dataKey: "master", label: "Master" }
                ]}
                height={300}
              />
            </div>
          )}
        </>
        )}

      </div>

    </div>
  );
}