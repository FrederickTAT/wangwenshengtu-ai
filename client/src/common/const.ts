import { Mode } from '@/types';

export const ModeText: Record<Mode, string> = {
  [Mode.Easy]: '简单',
  [Mode.Normal]: '中等',
  [Mode.Hard]: '困难',
  [Mode.HardCore]: '硬核',
};

export const ModeCharactersMap: Record<Mode, number> = {
  [Mode.Easy]: 0,
  [Mode.Normal]: 2,
  [Mode.Hard]: 4,
  [Mode.HardCore]: 6,
};
