'use strict';

function validateCreateUpdateRequest (request, response, next) {
  if (Object.keys(request.body).length === 0) {
    response.status(415);
    return response.send('Invalid payload!');
  }
  // No need to check for no body, express will make body an empty object
  const {noun_text, id} = request.body;

  if (!noun_text) {
    response.status(422);
    return response.send('The text is required!');
  }

  if (id && id !== request.params.id) {
    response.status(422);
    return response.send('Id was invalidly set on request.');
  }

  next();
}

module.exports = {
  validateCreateUpdateRequest
};
