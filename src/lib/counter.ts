/** Keep the demo counter non-negative; replace this module with your domain logic. */
export function changeCount(current: number, delta: 1 | -1): number {
  return Math.max(0, current + delta)
}
