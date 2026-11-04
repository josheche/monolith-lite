import type { Metadata } from 'next'
import Link from 'next/link'
import { DemoCounter } from '@/components/demo-counter'

export const metadata: Metadata = { title: 'Demo' }

export default function DemoPage() {
  return (
    <main id="main" className="shell max-w-3xl py-12">
      <Link href="/" className="text-sm text-muted underline underline-offset-4">
        Back to home
      </Link>
      <p className="eyebrow mt-16">One small example</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Interactive, even when static.</h1>
      <p className="my-6 leading-relaxed text-muted">
        Client components work in both modes. This state stays in your browser and resets on reload.
        Replace this demo with your own feature.
      </p>
      <DemoCounter />
    </main>
  )
}
