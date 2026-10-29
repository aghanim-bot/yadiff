import { spawnSync } from 'node:child_process';

const result = spawnSync(
  'git',
  ['status', '--porcelain', '--untracked-files=all', '--', 'dist'],
  { encoding: 'utf8' },
);

if (result.error) throw result.error;
if (result.status !== 0) {
  process.stderr.write(result.stderr);
  process.exit(result.status ?? 1);
}

if (result.stdout) {
  process.stderr.write('dist/ is stale. Run "npm run build" and commit the result:\n');
  process.stderr.write(result.stdout);
  process.exit(1);
}
