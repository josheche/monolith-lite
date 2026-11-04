import { expect, test } from '@playwright/test'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

test('home loads, navigation works, and client interaction survives repeated clicks', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.url().includes('/_next/') && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`)
    }
  })
  await page.goto(`${basePath}/`)
  await expect(page).toHaveTitle('Monolith Lite')
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 250, 249)')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Start small.')
  await page.getByRole('link', { name: 'Try the demo' }).click()
  await expect(page).toHaveURL(/\/demo\/$/)
  const count = page.getByRole('status', { name: 'Count' })
  await expect(count).toHaveText('0')
  await expect(page.getByRole('button', { name: 'Subtract one' })).toBeDisabled()
  await page.getByRole('button', { name: 'Add one' }).click({ clickCount: 3 })
  await expect(count).toHaveText('3')
  await page.getByRole('button', { name: 'Subtract one' }).click()
  await expect(count).toHaveText('2')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(count).toHaveText('0')
  await page.getByRole('link', { name: 'Back to home' }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Interactive, even when static.')
  await page.goForward()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Start small.')
  expect(errors).toEqual([])
})

test('nested route loads directly, refreshes, and fits a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(`${basePath}/demo/`)
  await page.getByRole('button', { name: 'Add one' }).click()
  await expect(page.getByRole('status', { name: 'Count' })).toHaveText('1')
  await page.reload()
  await expect(page.getByRole('status', { name: 'Count' })).toHaveText('0')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
})

test('keyboard users can skip navigation and activate the demo', async ({ page }) => {
  await page.goto(`${basePath}/`)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
  await page.getByRole('link', { name: 'Try the demo' }).focus()
  await page.keyboard.press('Enter')
  await page.getByRole('button', { name: 'Add one' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status', { name: 'Count' })).toHaveText('1')
})

test('unknown routes return 404 instead of an SPA fallback', async ({ page }) => {
  const response = await page.goto(`${basePath}/this-page-does-not-exist/`)
  expect(response?.status()).toBe(404)
})
