import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));


fastify.post('/uppercase', (request,reply) => {
  const string = request.body;
  let result = '';
  if (string.toLowerCase().indexOf('fuck') === -1){
    result = string.toUpperCase();
  } else if (string.toLowerCase().indexOf('fuck') !== -1){
    result = reply.status(403).send('unresolved');
  }
  return reply.send(result);
} );


fastify.post('/lowercase', (request,reply) => {
  const string = request.body;
  let result = '';
  if (string.toLowerCase().indexOf('fuck') === -1){
    result = string.toLowerCase();
  } else if (string.toLowerCase().indexOf('fuck') !== -1){
    result = reply.status(403).send('unresolved');
  }
  return reply.send(result);
} );

fastify.get('/user/:id', (request,reply) => {
  const id = request.params.id;
  let result = '';
  if (users[id]){
    result = users[id];
  } else if (!users[id]){
    result = reply.status(400).send('User not exist')
  }
  return reply.send(result);
} );


fastify.get('/user', (request,reply) => {
  
} );

export default fastify;
