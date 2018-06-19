'use strict';

const express = require('express');
/* eslint new-cap: "warn" */
const router = express.Router();

const validations = require('../validations');
const nouns = require('../api/nouns');

router.get('/nouns/:id', (request, response) => {
  const {id} = request.params;
  nouns.find(id).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Item ${id} not found`);
    }
    return response.send(result.rows[0]);
  }).catch(() => {
    response.sendStatus(400);
  });
});

router.get('/nouns', (request, response) => {
  nouns.findAll().then(results => {
    response.send(results.rows);
  }).catch(() => {
    response.sendStatus(400);
  });
});

router.post('/nouns', validations.validateCreateUpdateRequest, (request, response) => {
  const {noun_text} = request.body;
  return nouns.create(noun_text).then(result => {
    response.status(201);
    return response.send(result.rows[0]);
  }).catch(err => {
    response.status(400);
    response.send(err);
  });
});

router.put('/nouns/:id', validations.validateCreateUpdateRequest, (request, response) => {
  const {noun_text} = request.body;
  const {id} = request.params;
  nouns.update({noun_text, id}).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Unknown item ${id}`);
    }
    return response.sendStatus(204);
  }).catch(err => {
    response.status(400);
    response.send(err);
  });
});

router.delete('/nouns/:id', (request, response) => {
  const {id} = request.params;
  nouns.remove(id).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Unknown item ${id}`);
    }
    return response.sendStatus(204);
  }).catch(err => {
    response.status(400);
    response.send(err);
  });
});

module.exports = router;
