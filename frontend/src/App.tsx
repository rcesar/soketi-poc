import { useEffect, useState } from 'react';
import './App.css'
import pusher from './services/pusher';
interface Message {
  sender: string;
  message: string;
}

function App () {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>('John Doe');
  const [messageToSend, setMessageToSend] = useState<string>('');
  useEffect(() => {
    pusher.connection.bind('connected', () => {
      console.log('connected')
    })

    pusher.connection.bind('disconnected', () => {
      console.log('disconnected')
    })

    const channel = pusher.subscribe('notification-571247')

    const handleMessage = (data: Message) => {
      console.log(data);
      setMessages(prevMessages => [...prevMessages, data]); // Update messages state correctly
    }

    channel.bind('client-message', handleMessage);

    return () => {
      channel.unbind('client-message', handleMessage);
    }
  }, []);

  async function sendFromFrontEnd () {
    const channel = pusher.channel('chat');
    const messageData: Message = {
      sender: username,
      message: messageToSend
    }
    channel.trigger('client-message', messageData)
    setMessages(prevMessages => [...prevMessages, messageData]); // Update messages state correctly
  }

  return (
    <div className="flex flex-col justify-center h-screen gap-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} className="border-2 border-gray-300 rounded-md p-2" onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2 bg-neutral-100 p-4 rounded-md flex-1 max-h-3/4">
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}</strong>: {message.message}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <input type="text" className="border-2 w-full border-gray-300 rounded-md p-2" value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={sendFromFrontEnd}>Send</button>
      </div>
    </div>
  )
}

export default App
