import { getIdiom, getIdiomImage } from '@/api';
import { Idiom } from '@/types';
import { Button, Image, Input, View } from '@tarojs/components';
import { useState } from 'react';
import styles from './index.module.less';

const CreateImage = () => {
  const [searchText, setSearchText] = useState<string>();
  const [idiom, setIdiom] = useState<Idiom>();
  const [idiomLoading, setIdiomLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [imageLoading, setImageLoading] = useState(false);

  const fetchIdiom = async (word?: string) => {
    if (idiomLoading) {
      return;
    }
    setImage(undefined);
    try {
      setIdiomLoading(true);
      const res = await getIdiom({ word });
      setIdiom(res);
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
    <View>
      <Input
        value={searchText}
        onInput={(e) => setSearchText(e.detail.value)}
      />
      <Button onClick={() => fetchIdiom(searchText)}>
        {idiomLoading ? '获取成语中...' : '获取一条成语'}
      </Button>
      <View>
        <View>成语：{idiom?.word}</View>
        <View>拼音：{idiom?.pinyin}</View>
        <View>解释：{idiom?.explanation}</View>
        <View>出处：{idiom?.derivation}</View>
      </View>
      {idiom && (
        <Button onClick={fetchImageUrl}>
          {imageLoading ? '生成图片中...' : '生成一张图片'}
        </Button>
      )}
      {image && <Image src={image} className={styles.image} />}
    </View>
  );
};

export default CreateImage;
