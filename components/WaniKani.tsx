'use client';

import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

export default function WaniKani() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch('/api/wanikani/summary')
      const json = await response.json();
      setReviews(json.reviews);
      setLessons(json.lessons);
    }
    fetchSummary();
  }, []);

  const card = (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          benevolent
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See More</Button>
      </CardActions>
    </Card>
);
    
  return (
    <>
        <div id="wani-container">
          <div id="wanikani-container"  style={{ display: 'flex', justifyContent: 'center' }}>
            <div id="wanikani-review-box" className="wanikani-box">
              <span>WaniKani Reviews: {reviews.length}</span>
            </div>
            <div id="wanikani-lesson-box" className="wanikani-box">
              <span>WaniKani Lessons: {lessons.length}</span>
            </div>
          </div>
          <div id="wani-card-container">
            <Grid container spacing={2}>
              {reviews.map((review) => (
                <Grid size={4} key={review.id}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {review.object}
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                        {review.data.characters}
                      </Typography>
                        {Object.entries(
                          (review.data.readings || []).reduce((acc: Record<string, any[]>, currentReading: any) => {
                            const type = currentReading.type || 'reading';
                            if (!acc[type]) {
                              acc[type] = [];
                            }
                            acc[type].push(currentReading);
                            return acc;
                          }, {})
                        ).map(([type, readings], idx) => (
                          <Typography sx={{color: 'text.secondary' }} key={idx}>
                            {type && <>{type}: </>}
                            {(readings as any[]).map((r, i) => (
                              <span key={i}>
                                {r.primary ? <strong>{r.reading}</strong> : r.reading}
                                {i < (readings as any[]).length - 1 && ', '}
                              </span>
                            ))}
                          </Typography>
                        ))}
                      <Typography sx={{ mt: 1.5 }}>
                        
                        {review.data.meanings.map((currentMeaning: any, i: number) => (
                          <span key={i}>
                            {currentMeaning.primary ? <strong>{currentMeaning.meaning}</strong> : currentMeaning.meaning}
                            {i < (review.data.meanings as any[]).length - 1 && ', '}
                          </span>
                        ))}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link href={review.data.document_url} target="_blank" rel="noopener noreferrer" underline="hover">See More</Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>

        <style jsx>{`
          .wanikani-box {
            width: 33.33%;
            height: 100px;
            color: white;
            display: inline-block;
          }
          #wanikani-review-box {
            background: #FF00AA;
          }
          #wanikani-lesson-box {
            background: #00AAFF;
          }
        `}</style>
    </>

    );
}