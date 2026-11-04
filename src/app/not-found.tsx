import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main" className="shell py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
      <p className="my-6 text-muted">The page may have moved, or the address may be incorrect.</p>
      <Link className="button" href="/">
        Back to home
      </Link>
    </main>
  )
}
