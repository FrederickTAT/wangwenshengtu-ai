import { IdiomRound } from '@/types';
import { Button, View } from '@tarojs/components';
import classNames from 'classnames';
import { shuffle } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';

const defaultSelection = ['', '', '', ''];

interface OptionsRoundProps {
  round: IdiomRound;
  onSubmit?: (word: string) => void;
  characters?: number;
}

const SelectionsRound = ({
  round,
  characters = 0,
  onSubmit,
}: OptionsRoundProps) => {
  const [selections, setSelections] = useState<string[]>(defaultSelection);
  const [currentSelectIndex, setCurrentSelectIndex] = useState(0);

  const setSelectionsAt = (index: number, character: string) => {
    const _selections = [...selections];
    _selections[index] = character;
    setSelections(_selections);
  };

  const charactersArray = useMemo(
    () =>
      shuffle(
        [round.word, ...(round.options || [])]
          ?.flatMap((option) => option.split(''))
          .slice(0, characters + 4),
      ),
    [round, characters],
  );

  useEffect(() => {
    setSelections(defaultSelection);
    setCurrentSelectIndex(0);
  }, [round]);

  return (
    <View className={styles.selections}>
      <View className={styles.placeholder}>
        <View className={styles.selectionWords}>
          {selections.map((selection, index) => (
            <Button
              key={index}
              onClick={() => {
                setCurrentSelectIndex(index);
              }}
              className={classNames(styles.selectionWord, {
                [styles.selectionWordHighlight]: currentSelectIndex === index,
              })}
            >
              {selection}
            </Button>
          ))}
        </View>
        <Button onClick={() => onSubmit?.(selections.join(''))}>提交</Button>
        <Button onClick={() => setSelections(defaultSelection)}>清除</Button>
      </View>
      <View
        className={styles.characters}
        style={{
          gridTemplateColumns: `repeat(${charactersArray.length / 2}, 1fr)`,
        }}
      >
        {charactersArray.map((character, index) => (
          <Button
            key={index}
            onClick={() => {
              setSelectionsAt(currentSelectIndex, character);
              if (currentSelectIndex < 3) {
                setCurrentSelectIndex(currentSelectIndex + 1);
              }
            }}
            className={styles.character}
          >
            {character}
          </Button>
        ))}
      </View>
    </View>
  );
};

export default SelectionsRound;
