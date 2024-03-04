// 云函数入口文件
const cloud = require('wx-server-sdk')
const easy = require('./easy.json')
const hard = require('./hard.json')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();
const collection = db.collection('idioms')
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  

  return {}
}