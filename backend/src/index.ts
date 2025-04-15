// Import the framework and instantiate it
import Fastify from 'fastify'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import Pusher from 'pusher';
import cors from '@fastify/cors'
import formbody from '@fastify/formbody'

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
  useTLS: true,
  cluster: 'us3'
})

const fastify = Fastify({
  logger: true
})

fastify.register(cors, {
})

fastify.register(formbody)

fastify.post('/auth', async function handler (req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as any;
  console.log('body ====>', body)
  const socketId = body.socket_id;
  const user: Pusher.UserChannelData = {
    id: body.client,
    user_info: {
      name: "John Smith"
    }
  };

  console.log('user ====>', user)
  const authResponse = pusher.authenticateUser(socketId, user);

  console.log('authResponse ====>', authResponse)
  return authResponse
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  const client = (request.query as any).client;

  console.log('sending to', `client: ${client}`)
  await sleep(1000)
  pusher.sendToUser(client, 'client-message', {
    sender: 'Super Admin',
    message: 'Processing request of MFIR' + client + '...'
  });
  await sleep(3000)
  pusher.sendToUser(client, 'client-message', {
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