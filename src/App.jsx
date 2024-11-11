import './App.css'
import { useAutoEffect, useSyncState } from "./lib/bettereact.js";

function App() {
  const [count, setCount] = useSyncState(1);
  const [posts, setPosts] = useSyncState(null);

  const handleIncrement = () => {
      setCount(count() + 1);
  };

  useAutoEffect(async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${count()}`);
      const data = await response.json();
      setPosts(data);
  });

  return (
    <>
      <h1>Counter</h1>
      <div className="card">
        <button onClick={handleIncrement}>
          count is {count()}
        </button>
        {posts() && <div>{posts().title}</div>}
      </div>
    </>
  )
}

export default App
