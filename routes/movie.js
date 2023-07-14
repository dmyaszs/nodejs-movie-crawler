const express = require('express')
const router = express.Router()

const getListPage = require('../controller/getListPage')
const parseListPage = require('../controller/parseListPage')
const getItemPage = require('../controller/getItemPage')

router.post('/', async function(req, res, next) {
  await getListPage('https://www.dydytt.net/index2.htm')
  const itemUrlArr = await parseListPage()
  itemUrlArr.forEach((item, index) => {
    getItemPage(index, item)
  })
  res.json({
    data: [{name: '123'}]
  })
})

module.exports = router
