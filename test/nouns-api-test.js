'use strict';

const test = require('tape');
const proxyquire = require('proxyquire');

const mockDb = {
  query: () => {
    return Promise.resolve();
  }
};

const nouns = proxyquire('../lib/api/nouns', {
  '../db': mockDb
});

test('test api methods', t => {
  t.equal(typeof nouns.find, 'function', 'find method should be a function');
  t.equal(typeof nouns.findAll, 'function', 'findAll method should be a function');
  t.equal(typeof nouns.create, 'function', 'create method should be a function');
  t.equal(typeof nouns.update, 'function', 'update method should be a function');
  t.equal(typeof nouns.remove, 'function', 'remove method should be a function');
  t.equal(typeof nouns.getRandom, 'function', 'getRandom method should be a function');
  t.end();
});

test('test find all', t => {
  const result = nouns.findAll();
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});

test('test find', t => {
  const result = nouns.find('id');
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});

test('test create', t => {
  const result = nouns.create('noun_text', 'stock');
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});

test('test update', t => {
  const result = nouns.update({noun_text: 'noun_text', stock: 'stock', id: 1});
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});

test('test remove', t => {
  const result = nouns.remove('id');
  t.equal(result instanceof Promise, true, 'should return a promise');
  t.end();
});
