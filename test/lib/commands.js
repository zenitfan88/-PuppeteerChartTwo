module.exports = {
    clickElement: async function (page, selector) {
      try {
        await page.waitForSelector(selector);
        await page.click(selector);
      } catch (error) {
        throw new Error(`Selector is not clickable: ${selector}`);
      }
    },

    selectDate: async function (page, day) {
      try {
        if (day <7) {
          const dataSelector = "body > nav > a.page-nav__day.page-nav__day_today.page-nav__day_chosen";
          const data = await page.$eval(dataSelector, link => link.getAttribute('data-time-stamp'));
          const newData = Number(data) + 86400 * day;
          const firstLink = await page.$(`[data-time-stamp='${newData}']`);
          await firstLink.click();
        };
      } catch (error) {
        throw new Error(`The order for the selected +${day} day is not possible `);
      }
    },
      
    selectStandartPlace: async function (page) {
      try {
        const allPlaces = await page.$$("[class='buying-scheme__row']");
        const min = 1;
        let maxRow;
        let maxSpot;
        if (allPlaces.length < 4) {
          maxRow = 3;
          maxSpot = 2;
        } else {
          maxRow = 10;
          maxSpot = 10;
        };

        const selectedPlace = await page.$("[class = 'buying-scheme__chair buying-scheme__chair_standart buying-scheme__chair_selected']");        
        do {
          const row = Math.floor(Math.random() * (maxRow - min + 1)) + min;
          const spot = Math.floor(Math.random() * (maxSpot - min + 1)) + min;
          const placeLink = await page.$(`div:nth-child(${row}) > span:nth-child(${spot})`);
          await placeLink.click();
          await page.waitForTimeout(500);
        } while (selectedPlace === 0);
          await page.waitForSelector(".acceptin-button:not([disabled='true'])");
      } catch (error) {
        throw new Error(`There are no available seats on the selected date`);
      }
    },

    selectUnavailabilityPlace: async function (page) {
      try {
        const selectedUnavailabilityPlace = await page.$("[class = 'buying-scheme__chair buying-scheme__chair_standart buying-scheme__chair_taken']");
        await selectedUnavailabilityPlace.click();
      } catch (error) {
        throw new Error(`There are no occupied seats`);
      }
    },

    getText: async function (page, selector) {
      try {
        await page.waitForSelector(selector);
        return await page.$eval(selector, (link) => link.textContent);
      } catch (error) {
        throw new Error(`Text is not available for selector: ${selector}`);
      }
    },

    putText: async function (page, selector, text) {
      try {
        const inputField = await page.$(selector);
        await inputField.focus();
        await inputField.type(text);
        await page.keyboard.press("Enter");
      } catch (error) {
        throw new Error(`Not possible to type text for selector: ${selector}`);
      }
    },
};
