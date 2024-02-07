declare interface Idiom {
  derivation: string;
  example: string;
  explanation: string;
  pinyin: string;
  word: string;
  abbreviation: string;
  imageId: string;
}

declare interface IdiomRound extends Idiom {
  options?: string[];
}
