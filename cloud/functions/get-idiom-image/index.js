// 云函数入口文件
const cloud = require('wx-server-sdk')
const { default: axios } = require('axios');
const Jimp = require('jimp');

const gptImageUrl = 'https://one-api.bltcy.top/v1/images/generations';
const key = "sk-bwUdOVBEq3XybMD365AaF35bDa4b473e89Df3e2a1f854a32"

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();

const getImageB64 = async (prompt) => {
  const res = await axios.post(gptImageUrl, {
    prompt,
    model: "dall-e-3",
    n: 1,
    size: "1024x1024",
    response_format: 'b64_json'
  }, {
    headers: {
      Authorization: `Bearer ${key}`,
      "content-type": "application/json",
    }
  })
  if (res.status !== 200) {
    throw { code: res.status, msg: res.data.error }
  }
  console.log(res)
  const imgB64 = res?.data?.data?.[0]?.b64_json;
  if (!imgB64) {
    throw { code: 500, msg: 'no image data' }
  }
  console.log(imgB64)
  return imgB64;
}

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { word } = event;
    const wordQuery = db.collection('idioms').where({ word })

    const res = await wordQuery.get();
    if (!res || typeof res === 'string') {
      throw 'invalid word'
    }

    const wordData = res.data[0];

    console.log(wordData)

    if (wordData.imageId) {
      await cloud.deleteFile({
        fileList: [wordData.imageId]
      })
    }

    const prompt = `${event.word}, 描述: ${event.explanation}`;

    const imgB64 = await getImageB64(prompt);

    const buffer = Buffer.from(imgB64, 'base64');

    const jimpImage = await Jimp.read(buffer)

    const compressedBuffer = await jimpImage.quality(60).getBufferAsync(Jimp.MIME_JPEG)

    const { fileID: fileId } = await cloud.uploadFile({
      cloudPath: `${wordData._id}-${Date.now()}.jpg`,
      fileContent: compressedBuffer
    })

    await wordQuery.update({
      data: {
        imageId: fileId
      }
    })

    return {
      code: 0,
      data: fileId
    }
  } catch (e) {
    return e
  }

}