export interface SubjectProgress {
  beginner: number;
  adept: number;
  seasoned: number;
  expert: number;
  master: number;
  total_count: number;
}

export interface LevelProgress {
  [level: number]: SubjectProgress;
}

export interface TotalProgress {
  grammar: LevelProgress;
  vocab: LevelProgress;
}

