export interface Idiom {
  derivation: string;
  example: string;
  explanation: string;
  pinyin: string;
  word: string;
  level: number;
  abbreviation: string;
  imageId: string;
}

export interface IdiomRound extends Idiom {
  options?: string[];
}
