'use strict';

const db = require('../db');

function find (id) {
  return db.query('SELECT * FROM insults.nouns WHERE id = $1', [id]);
}

function findAll () {
  return db.query('SELECT * FROM insults.nouns');
}

function create (noun_text) {
  return db.query('INSERT INTO insults.nouns (noun_text) VALUES ($1) RETURNING *', [noun_text]);
}

function update (options = {}) {
  return db.query('UPDATE insults.nouns SET noun_text = $1 WHERE id = $3', [options.noun_text, options.id]);
}

function remove (id) {
  return db.query('DELETE FROM insults.nouns WHERE id = $1', [id]);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  remove
};
