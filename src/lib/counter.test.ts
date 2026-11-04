import { describe, expect, it } from 'vitest'
import { changeCount } from '@/lib/counter'

describe('changeCount', () => {
  it('increments', () => {
    expect(changeCount(0, 1)).toBe(1)
    expect(changeCount(41, 1)).toBe(42)
  })
  it('decrements', () => {
    expect(changeCount(2, -1)).toBe(1)
  })
  it('never goes below zero', () => {
    expect(changeCount(0, -1)).toBe(0)
  })
})
