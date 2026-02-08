'use client';

import { Suspense, useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import StudyItem from "./StudyItem";
import { Subject } from "@/lib/wanikani/types";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Skeleton } from "@mui/material";

export default function WaniKani() {
  const [reviews, setReviews] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Subject[]>([]);
  const [recentMisses, setRecentMisses] = useState<Subject[]>([]);
  const [pastMisses, setPastMisses] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  type ViewType = 'lessons' | 'reviews' | 'recentMisses' | 'pastMisses';
  const [activeView, setActiveView] = useState<ViewType>('lessons');

  const handleChange = (event: SelectChangeEvent) => {
    setActiveView(event.target.value as ViewType);
  };

  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch('/api/wanikani/summary')
      const json = await response.json();
      setReviews(json.reviews);
      setLessons(json.lessons);
      setRecentMisses(json.recentMisses);
      setPastMisses(json.pastMisses);
      setLoading(false);
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
    <div id="wanikani-container" className="w-full">
      <div id="wanikani-item-boxes" className="w-full mb-4 flex justify-center gap-1">
        <div id="wanikani-lesson-box" className="w-2/5 bg-wanikani-pink inline-block text-white p-3 mr-1 rounded-xl">
          <Typography gutterBottom sx={{marginBottom:0}}>Today's</Typography>
          <Typography variant="h6" component="span">Lessons </Typography>
          <Typography component="span" className='bg-white text-wanikani-pink inline-block rounded-full px-2'>
            {lessons.length}
          </Typography>
          <Typography className='block' sx={{marginTop:'0.5em'}} gutterBottom>
            Learn something new.
          </Typography>
          <ThemeProvider theme={buttonTheme}>
            <Button 
              variant="contained"
              size="large"
              color="primary"
              href="https://www.wanikani.com/subject-lessons/start" target="_blank" rel="noopener noreferrer"
              endIcon={<ArrowForwardIosIcon />}>
              Go to Lessons
            </Button>
          </ThemeProvider>
        </div>
        
        <div id="wanikani-review-box" className="w-2/5 bg-wanikani-blue inline-block text-white p-3 rounded-xl">
          <Typography gutterBottom sx={{marginBottom:0}}>Today's</Typography>
          <Typography variant="h6" component="span">Reviews </Typography>
          <Typography component="span" className='bg-white text-wanikani-blue inline-block rounded-full px-2'>
            {reviews.length}
          </Typography>
          <Typography className='block' sx={{marginTop:'0.5em'}} gutterBottom>
            Practice your knowledge.
          </Typography>
          <ThemeProvider theme={buttonTheme}>
            <Button 
              variant="contained"
              size="large"
              color="primary"
              href="https://www.wanikani.com/subjects/review" target="_blank" rel="noopener noreferrer"
              endIcon={<ArrowForwardIosIcon />}>
              Go to Reviews
            </Button>
          </ThemeProvider>
        </div>
      </div>

      <div id="wanikani-view-select-container" className="flex items-center mb-4 mt-10">
        <Box>
          <Typography component="span" gutterBottom>
            Currently viewing:&nbsp;&nbsp;
          </Typography>
        </Box>
        <Box className="inline-block min-w-[150px]">
          <FormControl fullWidth>
            <Select
              id="wanikani-view-select"
              value={activeView}
              onChange={handleChange}
            >
              <MenuItem value={'lessons'}>Lessons</MenuItem>
              <MenuItem value={'reviews'}>Reviews</MenuItem>
              <MenuItem value={'recentMisses'}>Recently Missed</MenuItem>
              <MenuItem value={'pastMisses'}>Critical Items</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div id="wanikani-subject-container" className="my-4">
        {loading ? (
            <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <Grid container spacing={2}>
            {activeView === 'lessons' && lessons.map((lesson) => (
              <Grid size={4} key={lesson.id}>
                <StudyItem subject={lesson} />
              </Grid>
            ))}

            {activeView === 'reviews' && reviews.map((review) => (
              <Grid size={4} key={review.id}>
                <StudyItem subject={review} />
              </Grid>
            ))}

            {activeView === 'recentMisses' && recentMisses.map((miss) => (
              <Grid size={4} key={miss.id}>
                <StudyItem subject={miss} />
              </Grid>
            ))}

            {activeView === 'pastMisses' && pastMisses.map((miss) => (
              <Grid size={4} key={miss.id}>
                <StudyItem subject={miss} />
              </Grid>
            ))}

          </Grid>
        )}
      </div>

    </div>
    );
}