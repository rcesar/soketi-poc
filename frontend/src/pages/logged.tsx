import { useEffect, useState } from 'react';
import pusher from '../services/pusher';
import { useParams } from 'react-router-dom';
interface Message {
  sender: string;
  message: string;
}


export default function Logged () {
  const params = useParams();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    pusher.connection.bind('connected', () => {
      console.log('connected')
    })

    pusher.connection.bind('disconnected', () => {
      console.log('disconnected')
    })

    // const channel = pusher.subscribe('notification-' + params.client)

    const handleMessage = (data: Message) => {
      console.log('handling message', data);
      setMessages(prevMessages => [...prevMessages, data]); // Update messages state correctly
    }

    pusher.user.bind('client-message', handleMessage);

    return () => {
      pusher.user.unbind('client-message', handleMessage);
    }
  }, []);

  async function callBackend () {
    setMessages(prevMessages => [...prevMessages, { sender: 'User of company (frontend)', message: 'Calling backend...' }])
    await fetch('http://localhost:3000/message?client=' + params.client)
  }

  return (
    <div className="flex flex-col justify-center h-screen gap-2 p-4">
      <div>
        <h1 className="text-2xl font-bold text-center">Welcome to company {params.client}</h1>
      </div>
      <div className="flex flex-col gap-2 bg-neutral-100 p-4 rounded-md flex-1 max-h-3/4">
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}</strong>: {message.message}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={callBackend}>Receive backend message</button>
      </div>
    </div >
  )
}