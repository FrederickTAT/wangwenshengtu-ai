import { Button, ButtonProps } from '@tarojs/components';
import styles from './index.module.less';

const BoxButton = (props: ButtonProps) => {
  return (
    <Button {...props} className={styles.boxButton}>
      {props.children}
    </Button>
  );
};

export default BoxButton;
