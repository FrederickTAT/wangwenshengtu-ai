import { ModeText } from '@/common/const';
import { pagePaths } from '@/routes';
import { Mode } from '@/types';
import { Button, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { FC, useState } from 'react';
import styles from './index.module.less';

const modeCycle = Object.keys(ModeText) as Mode[];

const Index: FC = () => {
  const [mode, setMode] = useState<Mode>(Mode.Easy);

  const setNextOrLastMode = (order: 'next' | 'last') => {
    const modeIndex = modeCycle.findIndex((item) => item === mode);
    const offset = order === 'next' ? 1 : 3;
    setMode(modeCycle[(modeIndex + offset) % 4]);
  };

  return (
    <View className={styles.index}>
      <View className={styles.header}>
        <View>
          <Text>玩家信息</Text>
        </View>
      </View>
      <View className={styles.title}>望文生图</View>
      <View className={styles.mode}>
        <Button onClick={() => setNextOrLastMode('last')}>{'<'}</Button>
        <Text className={styles.modeText}>{ModeText[mode]}</Text>
        <Button onClick={() => setNextOrLastMode('next')}>{'>'}</Button>
      </View>
      <View>
        <Button
          className={styles.start}
          onClick={() =>
            Taro.redirectTo({ url: `${pagePaths.ROUND}?mode=${mode}` })
          }
        >
          开始游戏
        </Button>
        <Button
          className={styles.start}
          onClick={() => Taro.redirectTo({ url: pagePaths.CREATE_IMAGE })}
        >
          创建图片
        </Button>
      </View>
    </View>
  );
};

export default Index;
