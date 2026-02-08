'use client';

import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import StudyItem from "./StudyItem";
import { Subject } from "@/lib/wanikani/types";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function WaniKani() {
  const [reviews, setReviews] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Subject[]>([]);

  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch('/api/wanikani/summary')
      const json = await response.json();
      setReviews(json.reviews);
      setLessons(json.lessons);
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
      <div id="wanikani-item-boxes" className="w-full mb-4">
        <div id="wanikani-lesson-box" className="w-4/10 bg-wanikani-pink inline-block text-white p-3 mr-1 rounded-xl">
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
        
        <div id="wanikani-review-box" className="w-4/10 bg-wanikani-blue inline-block text-white p-3 rounded-xl">
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

      <div id="wani-card-container">
        <Grid container spacing={2}>
          {reviews.map((review) => (
            <Grid size={4} key={review.id}>
              <StudyItem subject={review} />
            </Grid>
          ))}
        </Grid>
      </div>

    </div>
    );
}