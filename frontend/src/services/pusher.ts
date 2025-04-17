import Pusher from 'pusher-js'

Pusher.logToConsole = true;
const pusher = new Pusher('eparts', {
  wsHost: 'eparts-routing-exec.dev.flyembraer.com',
  wsPath: '/socket',
  forceTLS: true,
  cluster: 'us3',
  disableStats: true,
  enabledTransports: ['ws'],
  userAuthentication: {
    endpoint: 'http://localhost:3000/auth',
    transport: 'ajax',
    paramsProvider: () => {
      const storedClient = localStorage.getItem('client');
      return {
        client: storedClient,
      };
    },
    headers: {}
  },
});

const globalForPusher = globalThis as unknown as { pusher: typeof pusher }

globalForPusher.pusher = pusher

export default pusher;