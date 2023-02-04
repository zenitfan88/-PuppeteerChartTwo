const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText, selectDate, selectStandartPlace,
  selectUnavailabilityPlace, clickElement} = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
},20000);

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user selects the session date for {int} days",
 {timeout: 2 * 5000}, async function (int) {
  await this.page.goto(`http://qamid.tmweb.ru/client/index.php`);
  await selectDate(this.page, int); 
});

When("user selects the session and the free space of the standard category",
 {timeout: 8 * 5000}, async function () {
  await clickElement(this.page, "[data-seance-id='142']");
  await selectStandartPlace(this.page);
  await clickElement(this.page, "[class='acceptin-button']");
  await clickElement(this.page, "[class='acceptin-button']");
});

When("user selects the session and the occupied space",
 {timeout: 8 * 5000}, async function () {
  await clickElement(this.page, "[data-seance-id='142']");
  await selectUnavailabilityPlace(this.page);
});

Then("user sees the booking code {string}", async function (string) {
  const qrCode = "[class = 'ticket__info-qr']";
  const actual = await this.page.$eval(qrCode, link => link.getAttribute('src'));

  expect(actual).contains(string);
});

Then("user sees the start time of the session {string}", async function (string) {
  const time = "[class = 'ticket__details ticket__start']";
  const actual = await this.page.$eval(time, link => link.textContent);

  expect(actual).contains(string);
});

Then("user cannot click the book button", async function () {
  const btn = "[class = 'acceptin-button']";
  const actual = await this.page.$eval(btn, link => link.getAttribute('disabled'));

  expect(actual).contains('true');
});