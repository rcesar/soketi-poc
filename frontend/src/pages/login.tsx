import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login () {
  const [client, setClient] = useState<string>('');
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-2xl font-bold">Login</h1>
      <label htmlFor="client">Enter your MFIR</label>
      <input className="border-2 border-gray-300 rounded-md p-2" type="text" value={client} onChange={(e) => setClient(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => navigate(`/${client}`)}>Login</button>
    </div>
  )
}