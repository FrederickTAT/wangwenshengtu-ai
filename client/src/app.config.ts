import { pagePaths } from './routes';

export default {
  pages: Object.values(pagePaths).map((path) => path.replace(/^\//, '')),
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  cloud: true,
};
