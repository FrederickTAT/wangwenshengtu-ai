import Taro from '@tarojs/taro';
import { PropsWithChildren, useEffect } from 'react';

import './app.less';

function App({ children }: PropsWithChildren) {
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
    }
  }, []);

  return children;
}

export default App;
