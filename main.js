const puppeteer = require('puppeteer')
const { Cluster } = require('puppeteer-cluster')

const path = require('path')
const usernames = require('./usernames')

const SELECTOR = '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > div.css-1dbjc4n.r-14lw9ot.r-mxfbl1.r-1efd50x.r-5kkj8d.r-d9fdf6.r-6wcr4z > div.css-901oao.r-18jsvk2.r-1qd0xha.r-1b6yd1w.r-b88u0q.r-ad9z0x.r-15d164r.r-bcqeeo.r-q4m81j.r-qvutc0 > span'

async function catchAvaliableUsername(page, username) {
  await page.goto(`https://twitter.com/${username}`)

  try {
    return await page.$eval(SELECTOR, element => element.innerHTML)
  }
  catch (e) {
    console.log(e)
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: path.join(__dirname, 'chomium_data/')
  });
  
  const page = await browser.newPage();

  const _ = await catchAvaliableUsername(page, usernames[0])
  console.log(_)

  await browser.close();
}

main();