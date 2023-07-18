const pageHandleList = require('../util/pageHandleList')
const pageHandleItem = require('../util/pageHandleItem')
const { listUrl } = require('../util/crawlerConfig')

const getList = async (req, res, next) => {
  let itemObjArr, data
  try {
    itemObjArr = await pageHandleList(listUrl)
    itemObjArr = await pageHandleItem(itemObjArr)
    data = { status:200, msg: 'success', data: itemObjArr }
  } catch (err) { data = {status:500,msg: err} }

  res.json(data)
}

module.exports = {
  getList
}
