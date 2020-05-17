const puppeteer = require('puppeteer');
var login = process.argv.val[2];
var password = process.argv.val[3];

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
	});
	var reservationMade = false;

  
	const page = await browser.newPage();
	await page.goto('https://frisco.pl');
	await page.click("#wrapper > div:nth-child(10) > div > div > a.close");
	await page.click("#header > div > div.header_bar.seach-state > div > div.header_user-menu.login > div > a:nth-child(1)");
	await page.waitFor(1000);
	await page.type('#container > div > div.popup > div > div.login-form > div > form > div > div.form-input.form-input_email.form-input_error > div > input[type=email]', login);
	await page.type('#container > div > div.popup > div > div.login-form > div > form > div > div.form-input.form-input_password.form-input_error > div > input#loginPassword', password);
	await page.click('#container > div > div.popup > div > div.login-form > div > form > section > input');
  	await page.waitForNavigation({ waitUntil: ["networkidle0", "domcontentloaded"] });

	do {
		const date = await page.$eval('.date',el => el.textContent);
		console.log(date);
		var proccessedDate = date.split(" ");
		var day = proccessedDate[0];
		var month = proccessedDate[1];
		var hour = proccessedDate[2].substr(0,2);
		var minutes = proccessedDate[2].substr(3,2);
		console.log(day);
		console.log(month);
		console.log(hour);
		console.log(minutes);
	  
		if(month = "maj" && day <= 20 && hour >= 9) {
			console.log("Data w zakresie, robię rezerwację.");
			await page.click('#header > div > div.header_bar.seach-state > div > div.header_delivery-inner.with-chevron'); 
			await page.waitFor(2000);
			
			if (hour < 12) {		
				await page.click('#wrapper > span > div > div > div > div.composed-address-reservation-selector > div.reservation-selector_section.delivery-reservation-box > div.address-delivery-selector > div > div > div.delivery-window_hours > div.delivery-window_hours_table-wrapper > div > div > div.calendar_column-day.available');
			} else if (hour >= 12 && hour < 18) {
				await page.click('#wrapper > span > div > div > div > div.composed-address-reservation-selector > div.reservation-selector_section.delivery-reservation-box > div.address-delivery-selector > div > div > div.delivery-window_hours > div.delivery-window_hours_table-wrapper > div > div:nth-child(2) > div.calendar_column-day.available');
			} else if (hour >= 18) {
				await page.click('#wrapper > span > div > div > div > div.composed-address-reservation-selector > div.reservation-selector_section.delivery-reservation-box > div.address-delivery-selector > div > div > div.delivery-window_hours > div.delivery-window_hours_table-wrapper > div > div:nth-child(3) > div.calendar_column-day.available');
			}	
			await page.waitFor(10000);
			const linkHandlers = await page.$x("//div[contains(text(), 'Zapisz rezerwację')]");
			console.log(linkHandlers[0]);
			await linkHandlers[0].click();
			reservationMade = true;
		} else {
			console.log("Data poza zakresem, nie robię rezerwacji.")
			await page.waitFor(60000);
			await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
		};
	  
	} while (reservationMade == false);
  
	await browser.close();
})();