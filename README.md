# frisco_reserver
(Very dirty ATM) puppeteer script for making reservations on https://frisco.pl

The purpose of this project is to create simple script, that would make reservations at frisco.pl - one of leading online groceries in Poland. Due to COVID-19 situation, it was very difficult to find an available delivery slot. However, because a lot of people made a reservation during a panic months ago, they have no intention to order anything anymore, so their reservations are being terminated on the ongoing basis. This script meant to hunt for those slots, allowing user (me) to order groceries like before the pandemic.

At the moment script:
- takes two arguments - username and password, that are subsequently used to log into user account on frisco.pl website, eg. node frisco_reserver.js mail@server.com password;
- checks, if first available delivery slot is meeting passed requirements (ATM hardcoded, will be passed as arguments);
- if there is no available delivery slot: script will try again after a minute;
- if there is available slot: it will attempt to make reservation (ATM - will fail due to still unfinished code);
- have some rudimentary logging to command line.
