import { View, ViewProps } from '@tarojs/components';
import styles from './index.module.less';
import classNames from 'classnames';

const BoxView = (props: ViewProps) => {
  return (
    <View {...props} className={classNames(styles.boxView, props.className)}>
      {props.children}
    </View>
  );
};

export default BoxView;
