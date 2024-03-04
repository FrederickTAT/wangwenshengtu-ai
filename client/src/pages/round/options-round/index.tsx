import { IdiomRound } from '@/types';
import { Button, View } from '@tarojs/components';
import styles from './index.module.less';
import { shuffle } from 'lodash-es';
import { useMemo } from 'react';

interface OptionsRoundProps {
  round: IdiomRound;
  onSubmit?: (word: string) => void;
}

const OptionsRound = ({ round, onSubmit }: OptionsRoundProps) => {
  const mergedOptions = useMemo(()=>shuffle([round.word,...(round.options || [])]) ,[round])
  return (
    <View className={styles.options}>
      {mergedOptions?.map((option, index) => (
        <Button
          key={index}
          onClick={() => {
            onSubmit?.(option);
          }}
          className={styles.option}
        >
          {option}
        </Button>
      ))}
    </View>
  );
};

export default OptionsRound;
