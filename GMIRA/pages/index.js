import { useState } from 'react';
export default function Home() {
  const [handle,setHandle]=useState(''),[count,setCount]=useState(null);
  const check=async()=> {
    const r=await fetch(`/api/gmira?handle=${handle}`);
    const d=await r.json();
    setCount(d.count);
  };
  return (
    <main style={{ padding: '2rem', fontFamily:'Arial' }}>
      <h1>gmira Tracker</h1>
      <input placeholder="Twitter handle" value={handle} onChange={e=>setHandle(e.target.value)} />
      <button onClick={check}>Check</button>
      {count!==null && (
        <p>@{handle} said "gmira" {count} times in the past 30 days.</p>
      )}
    </main>
  );
}
