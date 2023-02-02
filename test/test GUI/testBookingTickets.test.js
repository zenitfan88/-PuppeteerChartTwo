const {selectDate, selectStandartPlace, selectUnavailabilityPlace ,clickElement} = require("./lib/commands.js");
let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
}, 10000);

afterEach(() => {
  page.close();
});

describe("Booking tickets test", () => {

  test("successful ticket booking and check QR-code", async () => {
    await selectDate(page, 4);
    await clickElement(page, "[data-seance-id='94']");
    await page.waitForTimeout(2000);
    await selectStandartPlace(page);
    await clickElement(page, "[class='acceptin-button']");
    await page.waitForTimeout(1000);
    await clickElement(page, "[class='acceptin-button']");
    await page.waitForTimeout(1000);
    const qrCode = "[class = 'ticket__info-qr']";
    const actual = await page.$eval(qrCode, link => link.getAttribute('src'));

    expect(actual).toEqual('i/QR_code.png');
  }, 20000);

  test("check select time", async () => {
    await selectDate(page, 4);
    await clickElement(page, "[data-seance-id='140']");
    await page.waitForTimeout(2000);
    await selectStandartPlace(page);
    await clickElement(page, "[class='acceptin-button']");
    await page.waitForTimeout(1000);
    const time = "[class = 'ticket__details ticket__start']";
    const actual = await page.$eval(time, link => link.textContent);

    expect(actual).toEqual('12:00');
  }, 20000);

  test("checking the unavailability of a place", async () => {
    await selectDate(page, 4);
    await clickElement(page, "[data-seance-id='94']");
    await page.waitForTimeout(2000);
    await selectUnavailabilityPlace(page);
    const time = "[class = 'acceptin-button']";
    const actual = await page.$eval(time, link => link.getAttribute('disabled'));

    expect(actual).toEqual('true');
  }, 20000);

});