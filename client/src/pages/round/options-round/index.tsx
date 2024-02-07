import { IdiomRound } from '@/types';
import { Button, View } from '@tarojs/components';
import styles from './index.module.less';

interface OptionsRoundProps {
  round: IdiomRound;
  onSubmit?: (word: string) => void;
}

const OptionsRound = ({ round, onSubmit }: OptionsRoundProps) => {
  return (
    <View className={styles.options}>
      {round.options?.map((option, index) => (
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
