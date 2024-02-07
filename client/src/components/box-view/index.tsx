import { View, ViewProps } from '@tarojs/components';
import styles from './index.module.less';

const BoxView = (props: ViewProps) => {
  return (
    <View {...props} className={styles.box}>
      <View>{props.children}</View>
    </View>
  );
};

export default BoxView;
