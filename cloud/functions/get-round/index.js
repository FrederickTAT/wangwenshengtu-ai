// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();
const collection = db.collection('idioms');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  /** @type Idiom[] */
  const idioms = (await collection
    .aggregate()
    .match({ imageId: _.exists(true).and(_.neq('')) })
    .sample({ size: 5 })
    .end()).list

  const rounds = await Promise.all(idioms.map(async idiom => {
    /** @type Idiom[] */
    const optionIdioms = (await collection
      .aggregate()
      .match({ word: _.neq(idiom.word) })
      .sample({ size: 3 })
      .end()).list

    return {
      ...idiom,
      options: optionIdioms.map(({ word }) => word),
    }

  }))

  return {
    code: 0,
    data: { list: rounds }
  }
}