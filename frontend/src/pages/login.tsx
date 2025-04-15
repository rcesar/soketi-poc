import { useState } from "react";
import { useNavigate } from "react-router-dom";
import pusher from '../services/pusher';
export default function Login () {
  const [client, setClient] = useState<string>('');
  const navigate = useNavigate();


  const login = () => {
    localStorage.setItem('client', client);

    pusher.signin()

    pusher.bind('pusher:signin_success', () => {
      console.log('signin success')
      navigate(`/${client}`)
    })
    pusher.bind('pusher:error', () => {
      console.error('signin error')
      alert('Error signing in. Please check your MFIR and try again.')
    })
    pusher.bind_global((...args) => {
      console.log('global event ======>', args)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <label htmlFor="client">Enter your MFIR</label>
      <input className="border-2 border-gray-300 rounded-md p-2" type="text" value={client} onChange={(e) => setClient(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={login}>Login</button>
    </div>
  )
}