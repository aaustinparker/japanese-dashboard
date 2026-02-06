'use client';

import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function WaniTab() {
  const [waniReviewCount, setWaniReviewCount] = useState<number>(50);
  const [waniLessonCount, setWaniLessonCount] = useState<number>(10);

  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch('/api/wanikani/summary')
      const json = await response.json();
      setWaniReviewCount(json.reviews.length);
      setWaniLessonCount(json.lessons.length);
    }
    fetchSummary();
  }, []);
    
  return (
    <>
        <div id="wani-container">
          <div id="wanikani-container">
            <div id="wanikani-review-box" className="wanikani-box">
              <span>WaniKani Reviews: {waniReviewCount}</span>
            </div>
            <div id="wanikani-lesson-box" className="wanikani-box">
              <span>WaniKani Lessons: {waniLessonCount}</span>
            </div>
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