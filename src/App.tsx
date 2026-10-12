import { useState } from 'react';
import { decrement, increment, MAX, MIN } from './counter';

/** The starter counter. Replace this with your app. */
export function App() {
  const [count, setCount] = useState(MIN);

  return (
    <>
      <h1>Counter</h1>
      <p aria-live="polite">
        Count: <output>{count}</output>
      </p>
      <div className="actions">
        <button type="button" disabled={count <= MIN} onClick={() => setCount(decrement)}>
          Decrease
        </button>
        <button type="button" disabled={count >= MAX} onClick={() => setCount(increment)}>
          Increase
        </button>
      </div>
    </>
  );
}
