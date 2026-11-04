'use client'

import { useState } from 'react'
import { changeCount } from '@/lib/counter'

export function DemoCounter() {
  const [count, setCount] = useState(0)

  return (
    <section aria-label="Interactive demo" className="card space-y-6">
      <p className="eyebrow">Client-side interaction</p>
      <p className="text-6xl font-semibold tabular-nums" role="status" aria-label="Count">
        {count}
      </p>
      <div className="flex flex-wrap gap-3">
        <button className="button" onClick={() => setCount((value) => changeCount(value, 1))}>
          Add one
        </button>
        <button
          className="button button-secondary"
          disabled={count === 0}
          onClick={() => setCount((value) => changeCount(value, -1))}
        >
          Subtract one
        </button>
        <button className="button button-secondary" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </section>
  )
}
