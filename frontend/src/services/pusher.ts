import Pusher from 'pusher-js'

Pusher.logToConsole = true;
const pusher = new Pusher('some-key', {
  wsHost: '127.0.0.1',
  wsPort: 6001,
  forceTLS: false,
  cluster: 'us3',
  disableStats: true,
  enabledTransports: ['ws'],
});

const globalForPusher = globalThis as unknown as { pusher: typeof pusher }

globalForPusher.pusher = pusher

export default pusher;