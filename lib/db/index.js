'use strict';
const {Pool} = require('pg');

// TODO - make dynaimc with env vars
const serviceHost = process.env.MY_DATABASE_SERVICE_HOST || 'localhost';
const user = process.env.DB_USERNAME || 'user';
const password = process.env.DB_PASSWORD || 'pass';
const connectionString = `postgresql://${user}:${password}@${serviceHost}:5432/db`;

const pool = new Pool({
  connectionString
});

const initScript = `
DROP TABLE nouns;
CREATE TABLE IF NOT EXISTS nouns (
  id        SERIAL PRIMARY KEY,
  noun_text      VARCHAR(40) NOT NULL
);
DELETE FROM nouns;
INSERT INTO nouns (noun_text) values ('Apple');
INSERT INTO nouns (noun_text) values ('Orange');
INSERT INTO nouns (noun_text) values ('Pear');
INSERT INTO nouns (noun_text) values ('apple-john');
INSERT INTO nouns (noun_text) values ('baggage');
INSERT INTO nouns (noun_text) values ('barnacle');
INSERT INTO nouns (noun_text) values ('bladder');
INSERT INTO nouns (noun_text) values ('boar-pig');
INSERT INTO nouns (noun_text) values ('bugbear');
INSERT INTO nouns (noun_text) values ('bum-bailey');
INSERT INTO nouns (noun_text) values ('canker-blossom');
INSERT INTO nouns (noun_text) values ('clack-dish');
INSERT INTO nouns (noun_text) values ('clotpole');
INSERT INTO nouns (noun_text) values ('coxcomb');
INSERT INTO nouns (noun_text) values ('codpiece');
INSERT INTO nouns (noun_text) values ('death-token');
INSERT INTO nouns (noun_text) values ('dewberry');
INSERT INTO nouns (noun_text) values ('flap-dragon');
INSERT INTO nouns (noun_text) values ('flax-wench');
INSERT INTO nouns (noun_text) values ('flirt-gill');
INSERT INTO nouns (noun_text) values ('foot-licker');
INSERT INTO nouns (noun_text) values ('fustilarian');
INSERT INTO nouns (noun_text) values ('giglet');
INSERT INTO nouns (noun_text) values ('gudgeon');
INSERT INTO nouns (noun_text) values ('haggard');
INSERT INTO nouns (noun_text) values ('harpy');
INSERT INTO nouns (noun_text) values ('hedge-pig');
INSERT INTO nouns (noun_text) values ('horn-beast');
INSERT INTO nouns (noun_text) values ('hugger-mugger');
INSERT INTO nouns (noun_text) values ('joithead');
INSERT INTO nouns (noun_text) values ('lewdster');
INSERT INTO nouns (noun_text) values ('lout');
INSERT INTO nouns (noun_text) values ('maggot-pie');
INSERT INTO nouns (noun_text) values ('malt-worm');
INSERT INTO nouns (noun_text) values ('mammet');
INSERT INTO nouns (noun_text) values ('measle');
INSERT INTO nouns (noun_text) values ('minnow');
INSERT INTO nouns (noun_text) values ('miscreant');
INSERT INTO nouns (noun_text) values ('moldwarp');
INSERT INTO nouns (noun_text) values ('mumble-news');
INSERT INTO nouns (noun_text) values ('nut-hook');
INSERT INTO nouns (noun_text) values ('pigeon-egg');
INSERT INTO nouns (noun_text) values ('pignut');
INSERT INTO nouns (noun_text) values ('puttock');
INSERT INTO nouns (noun_text) values ('pumpion');
INSERT INTO nouns (noun_text) values ('ratsbane');
INSERT INTO nouns (noun_text) values ('scut');
INSERT INTO nouns (noun_text) values ('skainsmate');
INSERT INTO nouns (noun_text) values ('strumpet');
INSERT INTO nouns (noun_text) values ('varlot');
INSERT INTO nouns (noun_text) values ('vassal');
INSERT INTO nouns (noun_text) values ('whey-face');
INSERT INTO nouns (noun_text) values ('wagtail');
INSERT INTO nouns (noun_text) values ('knave');
INSERT INTO nouns (noun_text) values ('blind-worm');
INSERT INTO nouns (noun_text) values ('popinjay');
INSERT INTO nouns (noun_text) values ('scullian');
INSERT INTO nouns (noun_text) values ('jolt-head');
INSERT INTO nouns (noun_text) values ('malcontent');
INSERT INTO nouns (noun_text) values ('devil-monk');
INSERT INTO nouns (noun_text) values ('toad');
INSERT INTO nouns (noun_text) values ('rascal');
INSERT INTO nouns (noun_text) values ('Basket-Cockle');
INSERT INTO nouns (noun_text) values ('rapscallion');`;

// -- Create the products table if not present
/*
const initScript = `CREATE TABLE IF NOT EXISTS nouns (
  id        SERIAL PRIMARY KEY,
  noun_noun_text      VARCHAR(40) NOT NULL
);

DELETE FROM nouns;

INSERT INTO nouns (noun_text) values ('Apple');
INSERT INTO nouns (text) values ('Orange');
INSERT INTO nouns (text) values ('Pear');
INSERT INTO nouns (text) values ('apple-john');
INSERT INTO nouns (text) values ('baggage');
INSERT INTO nouns (text) values ('barnacle');
INSERT INTO nouns (text) values ('bladder');
INSERT INTO nouns (text) values ('boar-pig');
INSERT INTO nouns (text) values ('bugbear');
INSERT INTO nouns (text) values ('bum-bailey');
INSERT INTO nouns (text) values ('canker-blossom');
INSERT INTO nouns (text) values ('clack-dish');
INSERT INTO nouns (text) values ('clotpole');
INSERT INTO nouns (text) values ('coxcomb');
INSERT INTO nouns (text) values ('codpiece');
INSERT INTO nouns (text) values ('death-token');
INSERT INTO nouns (text) values ('dewberry');
INSERT INTO nouns (text) values ('flap-dragon');
INSERT INTO nouns (text) values ('flax-wench');
INSERT INTO nouns (text) values ('flirt-gill');
INSERT INTO nouns (text) values ('foot-licker');
INSERT INTO nouns (text) values ('fustilarian');
INSERT INTO nouns (text) values ('giglet');
INSERT INTO nouns (text) values ('gudgeon');
INSERT INTO nouns (text) values ('haggard');
INSERT INTO nouns (text) values ('harpy');
INSERT INTO nouns (text) values ('hedge-pig');
INSERT INTO nouns (text) values ('horn-beast');
INSERT INTO nouns (text) values ('hugger-mugger');
INSERT INTO nouns (text) values ('joithead');
INSERT INTO nouns (text) values ('lewdster');
INSERT INTO nouns (text) values ('lout');
INSERT INTO nouns (text) values ('maggot-pie');
INSERT INTO nouns (text) values ('malt-worm');
INSERT INTO nouns (text) values ('mammet');
INSERT INTO nouns (text) values ('measle');
INSERT INTO nouns (text) values ('minnow');
INSERT INTO nouns (text) values ('miscreant');
INSERT INTO nouns (text) values ('moldwarp');
INSERT INTO nouns (text) values ('mumble-news');
INSERT INTO nouns (text) values ('nut-hook');
INSERT INTO nouns (text) values ('pigeon-egg');
INSERT INTO nouns (text) values ('pignut');
INSERT INTO nouns (text) values ('puttock');
INSERT INTO nouns (text) values ('pumpion');
INSERT INTO nouns (text) values ('ratsbane');
INSERT INTO nouns (text) values ('scut');
INSERT INTO nouns (text) values ('skainsmate');
INSERT INTO nouns (text) values ('strumpet');
INSERT INTO nouns (text) values ('varlot');
INSERT INTO nouns (text) values ('vassal');
INSERT INTO nouns (text) values ('whey-face');
INSERT INTO nouns (text) values ('wagtail');
INSERT INTO nouns (text) values ('knave');
INSERT INTO nouns (text) values ('blind-worm');
INSERT INTO nouns (text) values ('popinjay');
INSERT INTO nouns (text) values ('scullian');
INSERT INTO nouns (text) values ('jolt-head');
INSERT INTO nouns (text) values ('malcontent');
INSERT INTO nouns (text) values ('devil-monk');
INSERT INTO nouns (text) values ('toad');
INSERT INTO nouns (text) values ('rascal');
INSERT INTO nouns (text) values ('Basket-Cockle');
INSERT INTO nouns (text) values ('rapscallion');`;
*/

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  init: () => {
    return pool.query(initScript);
  }
};
