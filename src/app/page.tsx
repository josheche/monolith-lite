import Link from 'next/link'

const features = [
  ['Small by default', 'Next.js, React, and React DOM. Add services when your project needs them.'],
  [
    'Two ways to ship',
    'Export a static site or run a full Next.js application from the same starting point.',
  ],
  ['Checks built in', 'Strict types, linting, formatting, unit tests, browser tests, and CI.'],
]

export default function Home() {
  return (
    <main id="main" className="shell">
      <header className="flex items-center justify-between gap-4 border-b border-line pb-6">
        <Link className="font-semibold tracking-tight" href="/">
          Monolith Lite
        </Link>
        <span className="badge">A smaller starting point</span>
      </header>
      <section className="py-20 sm:py-28">
        <p className="eyebrow">Less setup. More building.</p>
        <h1 className="mt-5 max-w-3xl text-5xl leading-tight font-semibold tracking-tight sm:text-7xl">
          Start small.
          <br />
          <span className="text-accent">Build something useful.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          The essentials from Monolith Industries, with room for your next idea. No database,
          authentication service, or tracking account required.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link href="/demo/" className="button">
            Try the demo <span aria-hidden="true">↗</span>
          </Link>
          <span className="font-mono text-sm text-muted">Edit src/app/page.tsx to begin</span>
        </div>
      </section>
      <section aria-label="What's included" className="grid gap-4 md:grid-cols-3">
        {features.map(([title, description]) => (
          <article className="card" key={title}>
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
          </article>
        ))}
      </section>
      <footer className="mt-14 border-t border-line py-6 text-sm text-muted">
        Next.js · TypeScript · Tailwind CSS · Your ideas
      </footer>
    </main>
  )
}
