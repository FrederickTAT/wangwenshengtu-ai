import { getRound } from '@/api';
import { ModeCharactersMap, ModeText } from '@/common/const';
import { pagePaths } from '@/routes';
import { IdiomRound, Mode } from '@/types';
import { Button, Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import styles from './index.module.less';
import OptionsRound from './options-round';
import SelectionsRound from './selections-round';

const RoundPage = () => {
  const { mode } = Taro.getCurrentInstance().router?.params || {};
  const [rounds, setRounds] = useState<IdiomRound[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentRound = rounds[currentIndex] as IdiomRound | undefined;
  const currentAnswer = answers[currentIndex];
  const currentCorrect = currentRound?.word === currentAnswer;
  const isLastRound = currentIndex + 1 === rounds.length;
  const isOptionRound = mode === Mode.Easy;

  useEffect(() => {
    const fetchIdioms = async () => {
      if (!mode) {
        return;
      }
      const { list } = await getRound();
      setRounds(list);
    };
    fetchIdioms();
  }, [mode]);

  return (
    <View className={styles.round}>
      <View className={styles.roundHeader}>
        <Text>{ModeText[mode as Mode]}模式</Text>
        {currentRound && (
          <Text>
            {currentIndex + 1} / {rounds.length}
          </Text>
        )}
      </View>
      {currentRound && (
        <View className={styles.roundContent}>
          <Image src={currentRound.imageId} />
          {isOptionRound ? (
            <OptionsRound
              round={currentRound}
              onSubmit={(option) => {
                setAnswers([...answers, option]);
              }}
            />
          ) : (
            <SelectionsRound
              round={currentRound}
              characters={ModeCharactersMap[mode as Mode]}
              onSubmit={(option) => {
                setAnswers([...answers, option]);
              }}
            />
          )}
        </View>
      )}
      {currentRound && currentAnswer && (
        <View className={styles.roundActions}>
          {currentCorrect === false && <Text>错误</Text>}
          {currentCorrect === true && (
            <Button
              onClick={() => {
                if (isLastRound) {
                  Taro.redirectTo({ url: `${pagePaths.SETTLEMENT}` });
                } else {
                  setCurrentIndex(currentIndex + 1);
                }
              }}
            >
              正确，下一题
            </Button>
          )}
        </View>
      )}
    </View>
  );
};

export default RoundPage;
