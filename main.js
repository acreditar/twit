const puppeteer = require('puppeteer');
const usernames = require('./usernames');
const path = require('path')

function profile_doesnt_exists(url) {
    return true
}

function catchAvaliableUsername(page, username) {
  page.goto(`https://twitter.com/${username}`)
  return;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: path.join(__dirname, 'chomium_data/')
  });
  const page = await browser.newPage();

  await browser.close();
  usernames.map(username => catchAvaliableUsername(page, username))
}

main();