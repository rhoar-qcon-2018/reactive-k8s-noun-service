'use strict';

const test = require('tape');
const supertest = require('supertest');
const proxyquire = require('proxyquire');

const mockDb = {
  init: () => {
    return Promise.resolve();
  }
};

// #1
test('test GET all nouns', t => {
  const mockApi = {
    findAll: () => Promise.resolve({rows: [{id: 1}]})
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .get('/api/nouns')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      t.equal(Array.isArray(response.body), true, 'should return an array');
      t.equal(response.body.length, 1, 'should have a body length of 1');
      t.end();
    });
});

test('test GET all nouns - error', t => {
  const mockApi = {
    findAll: () => Promise.reject(new Error('error'))
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .get('/api/nouns')
    .expect(400)
    .then(() => {
      t.end();
    });
});

test('test GET noun', t => {
  const mockApi = {
    find: id => {
      t.equal(id, '1', 'id should be 1 from the request params');
      return Promise.resolve({rows: [{id}]});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .get('/api/nouns/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      t.equal(Array.isArray(response.body), false, 'should not return an array');
      t.equal(response.body.id, '1', 'should have an id of 1');
      t.end();
    });
});

test('test GET noun - return 404', t => {
  const mockApi = {
    find: () => Promise.resolve({rowCount: 0})
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .get('/api/nouns/1')
    .expect(404)
    .then(response => {
      t.equal(response.text, 'Item 1 not found', 'should have a message about not found id');
      t.end();
    });
});

test('test GET noun - error', t => {
  const mockApi = {
    find: () => Promise.reject(new Error('error'))
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .get('/api/nouns/1')
    .expect(400)
    .then(() => {
      t.end();
    });
});

test('test POST noun', t => {
  const nounData = {
    noun_text: 'Banana'
  };

  const mockApi = {
    create: (noun_text) => {
      t.equal(noun_text, nounData.noun_text, `respone.body.noun_text should be ${nounData.noun_text}`);
      return Promise.resolve({rows: []});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .post('/api/nouns')
    .send(nounData)
    .expect(201)
    .then(() => {
      t.end();
    });
});

test('test POST noun - error - no noun_text', t => {
  const nounData = {
      text: 10
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/nouns')
    .send(nounData)
    .expect(422)
    .then(response => {
      t.equal(response.text, 'The noun\'s text is required!', 'has a need noun_text message');
      t.end();
    });
});

test('test POST noun - error - id error', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/nouns')
    .send({noun_text: 'Banana', stock: 10, id: 22})
    .expect(422)
    .then(response => {
      t.equal(response.text, 'Id was invalidly set on request.', 'has an id error message');
      t.end();
    });
});

test('test POST noun - error', t => {
  const nounData = {
    noun_text: 'Banana',
    stock: 10
  };

  const mockApi = {
    create: () => {
      return Promise.reject(new Error('error'));
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .post('/api/nouns')
    .send(nounData)
    .expect(400)
    .then(() => {
      t.end();
    });
});

test('test POST noun - error - no payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/nouns')
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be set');
      t.end();
    });
});

test('test POST noun - error - invalid payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .post('/api/nouns')
    .set('Content-Type', 'application/json')
    .send('Some text')
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test POST fruit - error - xml payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });
  const xmlnounData = '<?xml version="1.0" encoding="UTF-8"?><fruit><noun_text>Banana</noun_text><stock>10</stock></fruit>';
  supertest(app)
    .post('/api/nouns')
    .set('Content-Type', 'application/xml')
    .send(xmlnounData)
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test POST fruit - error - JSON Content-Type and XML body', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });
  const xmlnounData = '<?xml version="1.0" encoding="UTF-8"?><fruit><noun_text>adam</noun_text><stock>10</stock></fruit>';
  supertest(app)
    .post('/api/nouns')
    .set('Content-Type', 'application/json')
    .send(xmlnounData)
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test PUT noun', t => {
  const nounData = {
    noun_text: 'Banana',
    id: '20'
  };

  const mockApi = {
    update: options => {
      t.equal(options.noun_text, nounData.noun_text, `respone.body.noun_text should be ${nounData.noun_text}`);
      t.equal(options.id, nounData.id, `respone.body.id should be ${nounData.stock}`);
      return Promise.resolve({rowCount: 1});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .put('/api/nouns/20')
    .send(nounData)
    .expect(204)
    .then(() => {
      t.end();
    });
});

test('test PUT noun - error - no noun_text', t => {
  const nounData = {
    stock: 10
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/nouns/20')
    .expect(422)
    .send(nounData)
    .then(response => {
      t.equal(response.text, 'The text is required!', 'has a need noun_text message');
      t.end();
    });
});

test('test PUT noun - error - id error', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/nouns/20')
    .send({noun_text: 'Banana', id: '22'})
    .expect(422)
    .then(response => {
      t.equal(response.text, 'Id was invalidly set on request.', 'id error message');
      t.end();
    });
});

test('test PUT fruit - not found', t => {
  const nounData = {
    noun_text: 'Banana',
    id: '20'
  };

  const mockApi = {
    update: () => {
      return Promise.resolve({rowCount: 0});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .put('/api/nouns/20')
    .send(nounData)
    .expect(404)
    .then(response => {
      t.equal(response.text, 'Unknown item 20', 'has unknown update error');
      t.end();
    });
});

test('test PUT fruit - error', t => {
  const nounData = {
    noun_text: 'Banana',
    stock: 10,
    id: '22'
  };

  const mockApi = {
    update: () => {
      return Promise.reject(new Error('error'));
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/nouns': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .put('/api/fruits/22')
    .send(nounData)
    .expect(400)
    .then(() => {
      t.end();
    });
});

test('test PUT fruit - error - no payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/20')
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be set');
      t.end();
    });
});

test('test PUT fruit - error - invalid payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/20')
    .set('Content-Type', 'application/json')
    .send('Some text')
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test PUT fruit - error - xml payload', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });
  const xmlnounData = '<?xml version="1.0" encoding="UTF-8"?><fruit><noun_text>Banana</noun_text><stock>10</stock></fruit>';
  supertest(app)
    .put('/api/fruits/10')
    .set('Content-Type', 'application/xml')
    .send(xmlnounData)
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test PUT fruit - error - JSON Content-Type and XML body', t => {
  const app = proxyquire('../app', {
    './lib/db': mockDb
  });
  const xmlnounData = '<?xml version="1.0" encoding="UTF-8"?><fruit><noun_text>adam</noun_text><stock>10</stock></fruit>';
  supertest(app)
    .put('/api/fruits/10')
    .set('Content-Type', 'application/json')
    .send(xmlnounData)
    .expect(415)
    .then(response => {
      t.equal(response.text, 'Invalid payload!', 'Payload must be in JSON format');
      t.end();
    });
});

test('test PUT fruit - error - no numeric stock', t => {
  const nounData = {
    noun_text: 'Banana',
    stock: 'two'
  };

  const app = proxyquire('../app', {
    './lib/db': mockDb
  });

  supertest(app)
    .put('/api/fruits/10')
    .send(nounData)
    .expect(422)
    .then(response => {
      t.equal(response.text, 'The stock must be greater or equal to 0!', 'has a need stock message');
      t.end();
    });
});

test('test DELETE fruit', t => {
  const mockApi = {
    remove: id => {
      t.equal(id, '1', 'id should be 1 from the request params');
      return Promise.resolve({rowCount: 1});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .delete('/api/fruits/1')
    .expect(204)
    .then(() => {
      t.end();
    });
});

test('test DELETE fruit - error - not found', t => {
  const mockApi = {
    remove: () => {
      return Promise.resolve({rowCount: 0});
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .delete('/api/fruits/1')
    .expect(404)
    .then(response => {
      t.equal(response.text, 'Unknown item 1', 'has unkown error text');
      t.end();
    });
});

test('test DELETE fruit - error', t => {
  const mockApi = {
    remove: () => {
      return Promise.reject(new Error('error'));
    }
  };

  // Mock the nested require
  const routesStub = proxyquire('../lib/routes/nouns', {
    '../api/fruits': mockApi
  });

  const app = proxyquire('../app', {
    './lib/db': mockDb,
    './lib/routes/nouns': routesStub
  });

  supertest(app)
    .delete('/api/fruits/1')
    .expect(400)
    .then(() => {
      t.end();
    });
});
