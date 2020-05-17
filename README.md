# frisco_reserver
(Very dirty ATM) puppeteer script for making reservations on https://frisco.pl

The purpose of this project is to create simple script, that would make reservations at frisco.pl - one of leading online groceries in Poland.

At the moment script:
- takes two arguments - username and password, that are subsequently used to log into user account on frisco.pl website, eg. node frisco_reserver.js mail@server.com password;
- checks, if first available delivery slot is meeting passed requirements (ATM hardcoded, will be passed as arguments);
- if there is no available delivery slot: script will try again after a minute;
- if there is available slot: it will attempt to make reservation (ATM - will fail due to still unfinished code).
