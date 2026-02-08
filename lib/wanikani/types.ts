export interface Subject {
  id: number;
  object: "kanji" | "vocabulary" | "radical";
  url: string;
  data_updated_at: string;
  data: SubjectData;
}

export interface SubjectData {
  // Required across all three
  created_at: string;
  level: number;
  slug: string;
  hidden_at: string | null;
  document_url: string;

  meanings: Meaning[];
  auxiliary_meanings?: AuxiliaryMeaning[];
  lesson_position: number;
  spaced_repetition_system_id: number;

  // Optional
  readings?: Reading[];
  characters?: string;
  component_subject_ids?: number[];
  amalgamation_subject_ids?: number[];
  visually_similar_subject_ids?: number[];
  meaning_mnemonic?: string;
  meaning_hint?: string;
  reading_mnemonic?: string;
  reading_hint?: string;

  // Vocabulary‑only
  parts_of_speech?: string[];
  context_sentences?: ContextSentence[];
  pronunciation_audios?: PronunciationAudio[];

  // Radical‑only
  character_images?: CharacterImage[];
}

export interface Meaning {
  meaning: string;
  primary: boolean;
  accepted_answer: boolean;
}

export interface AuxiliaryMeaning {
  meaning: string;
  type: "whitelist" | "blacklist";
}

export interface Reading {
  reading: string;
  primary: boolean;
  accepted_answer: boolean;
  type?: "onyomi" | "kunyomi" | "nanori";
}

export interface ContextSentence {
  en: string;
  ja: string;
}

export interface PronunciationAudio {
  url: string;
  metadata: AudioMetadata;
  content_type: string;
}

export interface AudioMetadata {
  gender: string;
  source_id: number;
  pronunciation: string;
  voice_actor_id: number;
  voice_actor_name: string;
  voice_description: string;
}

export interface CharacterImage {
  url?: string;
  metadata?: Record<string, unknown>;
  content_type?: string;
}

export interface User {
    profileUrl: string;
    username: string;
    level: number;
}