const express = require('express')
const router = express.Router()

const getListPage = require('../controller/getListPage')
const getItemPages = require('../controller/getItemPage')

router.post('/', async function(req, res, next) {
  const listArr = await getListPage('https://www.dydytt.net/index2.htm')
  // data:
  // [
  //   {
  //     "name": "极寒之城",
  //     "downloadUrl": "magnet:?xt=urn:btih:d0dac6d4c4"
  //     "country": "中国大陆",
  //     "category": "剧情/动作/悬疑",
  //     "ratingDouban": "6.8",
  //     "ratingIMDb": "",
  //   }
  // ]
  const data = await getItemPages(listArr)

  res.json(data)
})

module.exports = router
