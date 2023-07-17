const pageHandleList = require('../util/pageHandleList')
const pageHandleItem = require('../util/pageHandleItem')
const { listUrl } = require('../util/crawlerConfig')

const getList = async (req, res, next) => {
  const itemObjArr = await pageHandleList(listUrl)
  const data = await pageHandleItem(itemObjArr)
  res.json(data)
}

module.exports = {
  getList
}
