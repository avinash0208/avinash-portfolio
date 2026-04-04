"use client";

import { useMemo, useReducer } from "react";

type CounterState = {
  value: number;
  history: number[];
};

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

const initialState: CounterState = {
  value: 0,
  history: [0],
};

function reducer(state: CounterState, action: CounterAction): CounterState {
  if (action.type === "reset") {
    return initialState;
  }

  const nextValue = action.type === "increment" ? state.value + 1 : state.value - 1;

  return {
    value: nextValue,
    history: [...state.history, nextValue].slice(-8),
  };
}

export function CounterDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const avg = useMemo(() => {
    const sum = state.history.reduce((acc, value) => acc + value, 0);
    return (sum / state.history.length).toFixed(1);
  }, [state.history]);

  return (
    <section className="section-card p-5">
      <h3 className="text-lg font-semibold">State Machine Counter</h3>
      <p className="mt-2 text-sm text-muted">
        CSR demo with reducer-driven transitions and derived state analytics.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "decrement" })}
          className="rounded border border-border px-3 py-2 text-sm"
        >
          -1
        </button>
        <span className="text-xl font-bold">{state.value}</span>
        <button
          type="button"
          onClick={() => dispatch({ type: "increment" })}
          className="rounded border border-border px-3 py-2 text-sm"
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset" })}
          className="rounded border border-border px-3 py-2 text-sm"
        >
          Reset
        </button>
      </div>
      <p className="mt-4 text-xs text-muted">Rolling average: {avg}</p>
    </section>
  );
}
