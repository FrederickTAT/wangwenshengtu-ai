// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();
const _ = db.command;

const getRandomIdiom = async (level) => {
  const res = await db.collection('idioms')
    .aggregate()
    .match({ level: level ? _.eq(level) : _.exists(false) })
    .sample({ size: 1 })
    .end()
  if (!res || typeof res === 'string') {
    throw 'invalid data'
  }
  if (!res.list.length) {
    throw 'no record found';
  }
  const { _id, ...rest } = res.list[0];
  return {
    code: 0,
    data: rest
  }
}

const getCertainIdiom = async (word) => {
  const res = await db.collection('idioms').where({ word }).get();
  if (!res || typeof res === 'string') {
    throw 'invalid data'
  }
  if (!res.data.length) {
    throw 'no record found';
  }
  const { _id, ...rest } = res.data[0];
  return {
    code: 0,
    data: rest
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  const { word, level } = event;
  try {
    if (word) {
      return await getCertainIdiom(word)
    }
    return await getRandomIdiom(level)
  } catch (e) {
    return { code: 500, msg: e }
  }
}