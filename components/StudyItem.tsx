'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import { Reading, Subject } from '@/lib/wanikani/types';

export default function StudyItem( {subject}: {subject: Subject}) {

  const groupReadingsByType = (readings? : Reading[]) : Record<string, Reading[]> => {
    return (readings || [])
      .reduce((acc: Record<string, Reading[]>, currentReading: Reading) => {
          const type = currentReading.type || 'reading';
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(currentReading);
          return acc;
        }, {});
  }

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {subject.object}
        </Typography>
        
        <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
          {subject.data.characters}
        </Typography>

        {Object.entries(
          groupReadingsByType(subject.data.readings)
        ).map(([type, readings], idx) => (
          <Typography sx={{color: 'text.secondary' }} key={idx}>
            {type && `${type}: `}
            {(readings as any[]).map((r, i) => (
              <span key={i}>
                {r.primary ? <strong>{r.reading}</strong> : r.reading}
                {i < (readings as any[]).length - 1 && ', '}
              </span>
            ))}
          </Typography>
        ))}

        <Typography sx={{ mt: 1.5 }}>
          {subject.data.meanings.map((currentMeaning: any, i: number) => (
            <span key={i}>
              {currentMeaning.primary ? <strong>{currentMeaning.meaning}</strong> : currentMeaning.meaning}
              {i < (subject.data.meanings as any[]).length - 1 && ', '}
            </span>
          ))}
        </Typography>
      </CardContent>

      <CardActions>
        <Link href={subject.data.document_url} target="_blank" rel="noopener noreferrer" underline="hover">See More</Link>
      </CardActions>
    </Card>
  );
}