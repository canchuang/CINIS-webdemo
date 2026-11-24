import { execFileSync } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
const sha = execFileSync('git', ['rev-parse', 'HEAD'], {
  encoding: 'utf8',
}).trim()
const dirty =
  execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim()
    .length > 0
const base = process.env.BASE_PATH || '/'
execFileSync('pnpm', ['exec', 'tsc', '-b'], { stdio: 'inherit' })
execFileSync('pnpm', ['exec', 'vite', 'build', '--base', base], {
  stdio: 'inherit',
})
mkdirSync('dist', { recursive: true })
writeFileSync(
  'dist/version.json',
  JSON.stringify(
    {
      sourceSha: sha,
      dirty,
      base,
      builtAt: new Date().toISOString(),
      schema: 3,
    },
    null,
    2,
  ) + '\n',
)
