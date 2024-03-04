import { getIdiom, getIdiomImage } from '@/api';
import { Idiom } from '@/types';
import {
  Button,
  Image,
  Input,
  Radio,
  RadioGroup,
  Text,
  View,
} from '@tarojs/components';
import { useEffect, useState } from 'react';
import styles from './index.module.less';
import BoxView from '@/components/box-view';

enum SearcType {
  Random = 'random',
  Input = 'input',
}

const CreateImage = () => {
  const [searchType, setSearchType] = useState<SearcType>(SearcType.Random);
  const [searchText, setSearchText] = useState<string>();
  const [level, setLevel] = useState<string>('1');
  const [idiom, setIdiom] = useState<Idiom>();
  const [idiomLoading, setIdiomLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [imageLoading, setImageLoading] = useState(false);

  const fetchIdiom = async () => {
    if (idiomLoading) {
      return;
    }
    setImage(undefined);
    try {
      setIdiomLoading(true);
      let res: Idiom | undefined = undefined;
      if (searchType === SearcType.Input && searchText) {
        res = await getIdiom({ word: searchText });
      }
      if (searchType === SearcType.Random && level) {
        if (Number(level) <= 2) {
          res = await getIdiom({
            level: Number(level),
          });
        } else {
          res = await getIdiom({});
        }
      }
      if (!res) {
        setIdiom(undefined);
        return;
      }
      setIdiom(res);
      setSearchText(res.word);
      if (res.imageId) {
        setImage(res.imageId);
      }
    } finally {
      setIdiomLoading(false);
    }
  };

  const fetchImageUrl = async () => {
    if (!idiom || imageLoading) {
      return;
    }
    setImage(undefined);
    try {
      setImageLoading(true);
      const imageUrl = await getIdiomImage({
        word: idiom?.word,
        explanation: idiom?.explanation,
      });
      setImage(imageUrl);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <View className={styles.container}>
      <BoxView className={styles.searchIdiom}>
        <RadioGroup
          className={styles.radioGroup}
          onChange={(e) => setSearchType(e.detail.value)}
        >
          <Text>获取方式</Text>
          <Radio
            checked={searchType === SearcType.Random}
            value={SearcType.Random}
          >
            随机选择
          </Radio>
          <Radio
            checked={searchType === SearcType.Input}
            value={SearcType.Input}
          >
            手动输入
          </Radio>
        </RadioGroup>
        {searchType === SearcType.Random && (
          <RadioGroup
            className={styles.radioGroup}
            onChange={(e) => setLevel(e.detail.value)}
          >
            <Text>成语难度</Text>
            <Radio checked={level === '1'} value="1">
              level 1
            </Radio>
            <Radio checked={level === '2'} value="2">
              level 2
            </Radio>
            <Radio checked={level === '3'} value="3">
              level 3
            </Radio>
          </RadioGroup>
        )}
        {searchType === SearcType.Input && (
          <Input
            placeholder="输入一条成语"
            value={searchText}
            onInput={(e) => setSearchText(e.detail.value)}
          />
        )}
        <Button onClick={fetchIdiom}>
          {idiomLoading ? '获取成语中...' : '获取成语'}
        </Button>
      </BoxView>
      <BoxView>
        <View>成语：{idiom?.word}</View>
        <View>难度：{idiom?.level}</View>
        <View>拼音：{idiom?.pinyin}</View>
        <View>解释：{idiom?.explanation}</View>
        <View>出处：{idiom?.derivation}</View>
      </BoxView>
      {idiom && (
        <BoxView>
          <Button onClick={fetchImageUrl}>
            {imageLoading ? '生成图片中...' : '生成一张图片'}
          </Button>
          {image && <Image src={image} className={styles.image} />}
        </BoxView>
      )}
    </View>
  );
};

export default CreateImage;
