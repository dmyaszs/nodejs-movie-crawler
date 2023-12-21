/**
 * @description 爬虫配置
 */

const host = 'https://www.dydytt.net'
const listUrl = host + '/index.htm'
const requestHeader = {
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9',
  'cache-control': 'no-cache',
  'pragma': 'no-cache',
  'connection': 'keep-alive',
  'referer': listUrl,
  'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36'
}

// 列表页解析规则
const listParseRule = $ => {
  const itemElement = $('.co_content8').eq(0).find('a')
  let itemUrls = []
  for (let i = 0; i < itemElement.length; i++) {
    if ($(itemElement).eq(i).text().indexOf('字') > -1 
      && $(itemElement).eq(i).text().indexOf('年') > -1) {
      itemUrls.push({
        name: $(itemElement).eq(i).text().match(/《(\S*)》/)[1],
        url: host + $(itemElement).eq(i).attr('href')
      })
    }
  }
  return itemUrls
}

// 详情页解析规则
const itemParseRule = $ => {
  const content = $('#Zoom').text()
  const ratingDouban = content.match(/豆瓣评分([\s|\d|\.]*)\/10/)
  const itemInfo = {
    ratingDouban: ratingDouban && ratingDouban.length > 1 ? ratingDouban[1].trimLeft() : '',
    country: content.match(/◎产　　地([\s|\S]*)◎类/)[1].trimLeft().replaceAll(' ', ''),
    category: content.match(/◎类　　别([\s|\S]*)◎语/)[1].trimLeft().replaceAll(' ', ''),
    downloadUrl: $('#Zoom a').eq(0).attr('href')
  }
  return itemInfo
}

module.exports = {
  host,
  listUrl,
  requestHeader,
  listParseRule,
  itemParseRule
}