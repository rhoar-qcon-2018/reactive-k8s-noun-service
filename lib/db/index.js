'use strict';
const {Pool} = require('pg');

// TODO - make dynaimc with env vars
const serviceHost = process.env.MY_DATABASE_SERVICE_HOST || 'localhost';
const user = process.env.DB_USERNAME || 'user';
const password = process.env.DB_PASSWORD || 'pass';
const connectionString = `postgresql://${user}:${password}@${serviceHost}:5432/insultdb`;

const pool = new Pool({
  connectionString
});

const initScript = `
CREATE SCHEMA IF NOT EXISTS insults;
DROP TABLE IF EXISTS insults.nouns;
CREATE TABLE IF NOT EXISTS insults.nouns (
  id        SERIAL PRIMARY KEY,
  noun_text      VARCHAR(40) NOT NULL
);
INSERT INTO insults.nouns (noun_text) values ('apple-john');
INSERT INTO insults.nouns (noun_text) values ('baggage');
INSERT INTO insults.nouns (noun_text) values ('barnacle');
INSERT INTO insults.nouns (noun_text) values ('bladder');
INSERT INTO insults.nouns (noun_text) values ('boar-pig');
INSERT INTO insults.nouns (noun_text) values ('bugbear');
INSERT INTO insults.nouns (noun_text) values ('bum-bailey');
INSERT INTO insults.nouns (noun_text) values ('canker-blossom');
INSERT INTO insults.nouns (noun_text) values ('clack-dish');
INSERT INTO insults.nouns (noun_text) values ('clotpole');
INSERT INTO insults.nouns (noun_text) values ('coxcomb');
INSERT INTO insults.nouns (noun_text) values ('codpiece');
INSERT INTO insults.nouns (noun_text) values ('death-token');
INSERT INTO insults.nouns (noun_text) values ('dewberry');
INSERT INTO insults.nouns (noun_text) values ('flap-dragon');
INSERT INTO insults.nouns (noun_text) values ('flax-wench');
INSERT INTO insults.nouns (noun_text) values ('flirt-gill');
INSERT INTO insults.nouns (noun_text) values ('foot-licker');
INSERT INTO insults.nouns (noun_text) values ('fustilarian');
INSERT INTO insults.nouns (noun_text) values ('giglet');
INSERT INTO insults.nouns (noun_text) values ('gudgeon');
INSERT INTO insults.nouns (noun_text) values ('haggard');
INSERT INTO insults.nouns (noun_text) values ('harpy');
INSERT INTO insults.nouns (noun_text) values ('hedge-pig');
INSERT INTO insults.nouns (noun_text) values ('horn-beast');
INSERT INTO insults.nouns (noun_text) values ('hugger-mugger');
INSERT INTO insults.nouns (noun_text) values ('joithead');
INSERT INTO insults.nouns (noun_text) values ('lewdster');
INSERT INTO insults.nouns (noun_text) values ('lout');
INSERT INTO insults.nouns (noun_text) values ('maggot-pie');
INSERT INTO insults.nouns (noun_text) values ('malt-worm');
INSERT INTO insults.nouns (noun_text) values ('mammet');
INSERT INTO insults.nouns (noun_text) values ('measle');
INSERT INTO insults.nouns (noun_text) values ('minnow');
INSERT INTO insults.nouns (noun_text) values ('miscreant');
INSERT INTO insults.nouns (noun_text) values ('moldwarp');
INSERT INTO insults.nouns (noun_text) values ('mumble-news');
INSERT INTO insults.nouns (noun_text) values ('nut-hook');
INSERT INTO insults.nouns (noun_text) values ('pigeon-egg');
INSERT INTO insults.nouns (noun_text) values ('pignut');
INSERT INTO insults.nouns (noun_text) values ('puttock');
INSERT INTO insults.nouns (noun_text) values ('pumpion');
INSERT INTO insults.nouns (noun_text) values ('ratsbane');
INSERT INTO insults.nouns (noun_text) values ('scut');
INSERT INTO insults.nouns (noun_text) values ('skainsmate');
INSERT INTO insults.nouns (noun_text) values ('strumpet');
INSERT INTO insults.nouns (noun_text) values ('varlot');
INSERT INTO insults.nouns (noun_text) values ('vassal');
INSERT INTO insults.nouns (noun_text) values ('whey-face');
INSERT INTO insults.nouns (noun_text) values ('wagtail');
INSERT INTO insults.nouns (noun_text) values ('knave');
INSERT INTO insults.nouns (noun_text) values ('blind-worm');
INSERT INTO insults.nouns (noun_text) values ('popinjay');
INSERT INTO insults.nouns (noun_text) values ('scullian');
INSERT INTO insults.nouns (noun_text) values ('jolt-head');
INSERT INTO insults.nouns (noun_text) values ('malcontent');
INSERT INTO insults.nouns (noun_text) values ('devil-monk');
INSERT INTO insults.nouns (noun_text) values ('toad');
INSERT INTO insults.nouns (noun_text) values ('rascal');
INSERT INTO insults.nouns (noun_text) values ('Basket-Cockle');
INSERT INTO insults.nouns (noun_text) values ('rapscallion');`;

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  init: () => {
    return pool.query(initScript);
  }
};
