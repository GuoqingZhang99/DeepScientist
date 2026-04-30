import { expect, test, type Page } from '@playwright/test'

const baseUrl = process.env.E2E_BASE_URL || 'http://127.0.0.1:20999'

const configState: Record<string, Record<string, unknown>> = {
  config: {
    default_runner: 'codex',
    bootstrap: {},
    connectors: { system_enabled: {} },
  },
  runners: {
    codex: { enabled: true, binary: 'codex', model: 'inherit', env: {} },
    claude: { enabled: false, binary: 'claude', model: 'inherit', env: {} },
    kimi: { enabled: false, binary: 'kimi', model: 'inherit', env: {} },
    opencode: { enabled: false, binary: 'opencode', model: 'inherit', env: {} },
  },
  connectors: {},
  plugins: {},
  mcp_servers: {},
}

function configDocument(name: string) {
  const structured = configState[name] || {}
  return {
    document_id: name,
    title: `${name}.yaml`,
    path: `/tmp/${name}.yaml`,
    kind: 'code',
    scope: 'config',
    writable: true,
    encoding: 'utf-8',
    source_scope: 'config',
    content: JSON.stringify(structured, null, 2),
    revision: `test-${name}-revision`,
    updated_at: new Date().toISOString(),
    meta: {
      tags: [name],
      source_kind: 'config_file',
      renderer_hint: 'code',
      help_markdown: name === 'config' ? 'Runtime defaults used by the local daemon.' : '',
      system_testable: ['config', 'runners', 'connectors'].includes(name),
      structured_config: structured,
    },
  }
}

function configFileList() {
  return ['config', 'runners', 'connectors', 'baselines', 'plugins', 'mcp_servers'].map((name) => ({
    name,
    path: `/tmp/${name}.yaml`,
    required: ['config', 'runners', 'connectors'].includes(name),
    exists: true,
  }))
}

async function installCommonStubs(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'ds:onboarding:v1',
      JSON.stringify({ firstRunHandled: true, completed: true, neverRemind: true, language: 'en' })
    )
    window.localStorage.setItem('ds:ui-language', 'en')
    ;(window as typeof window & { __DEEPSCIENTIST_RUNTIME__?: unknown }).__DEEPSCIENTIST_RUNTIME__ = {
      auth: { enabled: false, tokenQueryParam: 'token', storageKey: 'ds_local_auth_token' },
    }
  })

  await page.route('**/api/auth/token', async (route) => route.fulfill({ json: { token: null } }))
  await page.route('**/api/quests', async (route) => route.fulfill({ json: [] }))
  await page.route('**/api/baselines', async (route) => route.fulfill({ json: [] }))
  await page.route('**/api/connectors', async (route) => route.fulfill({ json: [] }))
  await page.route('**/api/connectors/availability', async (route) => {
    await route.fulfill({
      json: {
        has_enabled_external_connector: false,
        has_bound_external_connector: false,
        should_recommend_binding: false,
        preferred_connector_name: null,
        preferred_conversation_id: null,
        available_connectors: [],
      },
    })
  })
  await page.route('**/api/system/update', async (route) => {
    await route.fulfill({
      json: {
        ok: true,
        current_version: '1.5.17',
        latest_version: '1.5.17',
        update_available: false,
        prompt_recommended: false,
        busy: false,
        manual_update_command: 'npm install -g @researai/deepscientist@latest',
      },
    })
  })
  await page.route('**/api/config/files', async (route) => {
    await route.fulfill({
      json: configFileList(),
    })
  })
  await page.route('**/api/config/*', async (route) => {
    const name = route.request().url().split('/').pop() || 'config'
    if (name === 'files') {
      await route.fulfill({ json: configFileList() })
      return
    }
    if (route.request().method() === 'PUT') {
      const body = JSON.parse(route.request().postData() || '{}')
      if (body.structured && typeof body.structured === 'object') {
        configState[name] = body.structured
      }
      await route.fulfill({ json: { ok: true, revision: `test-${name}-revision-next` } })
      return
    }
    await route.fulfill({ json: configDocument(name) })
  })
}

async function openSettings(page: Page, viewport: { width: number; height: number }) {
  await installCommonStubs(page)
  await page.setViewportSize(viewport)
  await page.goto(`${baseUrl}/settings`, { waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { level: 1, name: 'Runtime' })).toBeVisible({ timeout: 30_000 })
}

async function settingsLayoutMetrics(page: Page) {
  return page.evaluate(() => {
    const aside = document.querySelector('aside')?.getBoundingClientRect()
    const section = document.querySelector('main section')?.getBoundingClientRect()
    const heading = document.querySelector('main section h1')?.getBoundingClientRect()
    const rail = document.querySelector('[data-testid="settings-copilot-rail"]') as HTMLElement | null
    const railParent = rail?.parentElement
    return {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      aside: aside
        ? { top: aside.top, right: aside.right, bottom: aside.bottom, height: aside.height }
        : null,
      section: section
        ? { top: section.top, left: section.left, height: section.height, bottom: section.bottom }
        : null,
      headingVisible: Boolean(
        heading &&
          heading.width > 0 &&
          heading.height > 0 &&
          heading.top >= 0 &&
          heading.bottom <= window.innerHeight
      ),
      railParentPosition: railParent ? getComputedStyle(railParent).position : null,
    }
  })
}

test.describe('responsive app shell', () => {
  test('keeps landing in desktop scene mode for narrow desktop portrait windows', async ({ page }) => {
    await installCommonStubs(page)
    await page.setViewportSize({ width: 900, height: 1200 })
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })

    await expect(page.getByText('EXPLORING UNKNOWN SCIENTIFIC FRONTIERS')).toBeVisible({ timeout: 30_000 })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })

  test('keeps settings content usable on phone-sized screens', async ({ page }) => {
    await openSettings(page, { width: 390, height: 844 })

    const metrics = await settingsLayoutMetrics(page)
    expect(metrics.headingVisible).toBe(true)
    expect(metrics.horizontalOverflow).toBeLessThanOrEqual(1)
    expect(metrics.aside?.height || 0).toBeLessThanOrEqual(300)
    expect(metrics.section?.height || 0).toBeGreaterThan(430)
    expect(metrics.section?.top || 0).toBeLessThan(metrics.viewportHeight - 360)
  })

  test('uses desktop two-column settings layout for narrow desktop widths', async ({ page }) => {
    await openSettings(page, { width: 900, height: 1000 })

    const metrics = await settingsLayoutMetrics(page)
    expect(metrics.headingVisible).toBe(true)
    expect(metrics.horizontalOverflow).toBeLessThanOrEqual(1)
    expect(metrics.section?.height || 0).toBeGreaterThan(800)
    expect(metrics.aside?.right || 0).toBeLessThanOrEqual((metrics.section?.left || 0) + 2)
    expect(Math.abs((metrics.aside?.top || 0) - (metrics.section?.top || 0))).toBeLessThanOrEqual(2)
  })

  test('opens settings copilot as an overlay before xl so content is not pushed away', async ({ page }) => {
    await openSettings(page, { width: 900, height: 1000 })
    const before = await settingsLayoutMetrics(page)

    await page.getByTestId('settings-copilot-launcher').click()
    await expect(page.getByTestId('settings-copilot-rail')).toBeVisible({ timeout: 12_000 })

    const after = await settingsLayoutMetrics(page)
    expect(after.railParentPosition).toBe('fixed')
    expect(after.headingVisible).toBe(true)
    expect(after.section?.height || 0).toBeGreaterThan(520)
    expect(Math.abs((after.section?.height || 0) - (before.section?.height || 0))).toBeLessThanOrEqual(2)
  })
})
