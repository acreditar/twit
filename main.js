const puppeteer = require("puppeteer")
const data = require('./names.json');

async function main() {
    const browser = await puppeteer.launch({
        headless: false
    });


    const page = await browser.newPage();
    for (username in data) {
        await page.goto(`https://twitter.com/${data[username]}`)

        await Promise.race([
            page.waitForXPath(`//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[1]/span`),
            page.waitForXPath(`//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div[2]/div[1]/span`)
        ]);

        const element = await Promise.race([
            page.$x(`//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[1]/span`),
            page.$x(`//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div[2]/div[1]/span`)
        ]);

        const value = await page.evaluate(el => el.innerText, element[0]);

        console.log(value);


    }

    // console.log(`https://twitter.com/along`)
    // await page.goto(`https://twitter.com/dsajouid`)




    //console.log(username)



    // await Promise.race([
    //     page.waitForXPath(`//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[1]/span`),
    //     page.waitForXPath(`//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div[2]/div[1]/span`)
    // ]);

    // const element = await Promise.race([
    //     page.$x(`//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[1]/span`),
    //     page.$x(`//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div[2]/div[1]/span`)
    // ]);

    // const value = await page.evaluate(el => el.innerText, element[0]);

    // console.log(value);
}
main();