'use strict';

const db = require('../db');

function find (id) {
  return db.query('SELECT * FROM nouns WHERE id = $1', [id]);
}

function findAll () {
  return db.query('SELECT * FROM nouns');
}

function create (name, stock) {
  return db.query('INSERT INTO nouns (noun_text) VALUES ($1, $2) RETURNING *', [name]);
}

function update (options = {}) {
  return db.query('UPDATE products SET noun_text = $1 WHERE id = $3', [options.name, options.id]);
}

function remove (id) {
  return db.query('DELETE FROM products WHERE id = $1', [id]);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  remove
};
