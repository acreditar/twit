const { Cluster } = require("puppeteer-cluster");


const accounts = require('./names.json');

const accountExists = async (page, account) => {
  //await page.goto(`https://twitter.com/${account}`);


  try {
    let contas = await Promise.all([
      page.waitForXPath(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[1]/span`,
        { timeout: 500 }
      ),
      page.waitForXPath(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div[2]/div[1]/span`,
        { timeout: 500 }
      ),
      page.waitForXPath(
        `//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div[2]/div/div/div[2]/div[1]/span`,
        { timeout: 500 }
      ),
    ]);
    console.log(contas)
    return false;
  } catch (error) {
    functionToHandleError(e);
  }
};

async function GetContent(page, data) {
  for (username in data) {
    const acc = await page.goto(`https://twitter.com/${data[username]}`)
    console.log(acc)

  }


}

const main = async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 4,
    args: ['--proxy-server=http://177.70.79.74:3128']

  });
  console.log(cluster)
  await cluster.task(async ({ page, data: account }) => {
    //console.log("account", account);
    const accountHandleIsInUse = await accountExists(page, account);
    // console.log(
    //   accountHandleIsInUse
    //     ? ``
    //     : `A conta : > ${account} < nao esta em uso`
    // );
    if (!accountHandleIsInUse) {
      GetContent(page, account)
    }
  });

  accounts.forEach((account) => cluster.queue(account));

  await cluster.idle();
  await cluster.close();
};

main();








