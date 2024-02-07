import { Idiom, IdiomRound } from '@/types';
import Taro from '@tarojs/taro';
import { isObject } from 'lodash-es';

const makeCloudFunctionCall =
  <Req, Res>(name: string) =>
  async (
    params?: Req,
    options?: Taro.cloud.CallFunctionParam,
  ): Promise<Res> => {
    const { result } = await Taro.cloud.callFunction({
      ...options,
      name,
      data: params as Taro.cloud.IApiParam,
    });
    if (isObject(result) && 'code' in result) {
      if (result.code === 0) {
        return result.data;
      }
    }
    return Promise.reject(result);
  };

interface GetIdiomReq {
  word?: string;
}

export const getIdiom = makeCloudFunctionCall<GetIdiomReq, Idiom>('get-idiom');

interface GetIdiomImageReq {
  word?: string;
  explanation?: string;
}

export const getIdiomImage = makeCloudFunctionCall<GetIdiomImageReq, string>(
  'get-idiom-image',
);

interface GetRoundRes {
  list: IdiomRound[];
}

export const getRound = makeCloudFunctionCall<never, GetRoundRes>('get-round');
