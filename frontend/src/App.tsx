import { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const onClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  return (
    <>
      <div className="container py-4 px-3 mx-auto">
        <h1>Hello, Bootstrap and Vite!</h1>
        <button className="btn btn-primary" onClick={onClick}>
          Primary button: {count} <i className="bi bi-check"></i>
        </button>
      </div>
    </>
  );
}

export default App;
