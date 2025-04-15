// Import the framework and instantiate it
import Fastify from 'fastify'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import Pusher from 'pusher';
import cors from '@fastify/cors'

//sleep function
function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const pusher = new Pusher({
  host: '127.0.0.1',
  appId: 'some-id',
  key: 'some-key',
  secret: 'some-secret',
  port: '6001',
  useTLS: false,
  cluster: 'us3'
})

const fastify = Fastify({
  logger: true
})

fastify.register(cors, {
})

fastify.post('/auth', async function handler (req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as any;
  const socketId = body.socket_id;
  const user: Pusher.UserChannelData = {
    id: "some_id",
    user_info: {
      name: "John Smith",
    }
  };
  const authResponse = pusher.authenticateUser(socketId, user);

  return authResponse
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  const client = (request.query as any).client;

  console.log('sending to', `notification-${client}`)
  await sleep(1000)
  pusher.trigger(`notification-${client}`, 'client-message', {
    sender: 'Super Admin',
    message: 'Processing request of MFIR' + client + '...'
  });
  await sleep(3000)
  pusher.trigger(`notification-${client}`, 'client-message', {
    sender: 'Super Admin',
    message: 'Request of MFIR' + client + ' processed'
  });
  return { published: true }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
  console.log('Server is running on port 3000')
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}