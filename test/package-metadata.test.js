import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
);
const packageLock = JSON.parse(
  await readFile(new URL('../package-lock.json', import.meta.url), 'utf8'),
);

test('Git installs receive a safe, reproducible @pierre/diffs dependency', () => {
  const specifier = packageJson.dependencies['@pierre/diffs'];
  const rootLock = packageLock.packages[''];
  const dependencyLock = packageLock.packages['node_modules/@pierre/diffs'];

  // A consumer of this repository as a Git dependency resolves package.json
  // dependencies itself; this repository's root lockfile does not pin them.
  assert.match(specifier, /^\d+\.\d+\.\d+$/, 'dependency must use an exact version');
  assert.equal(rootLock.dependencies['@pierre/diffs'], specifier);
  assert.equal(dependencyLock.version, specifier);

  for (const [name, dependencySpecifier] of Object.entries(dependencyLock.dependencies)) {
    assert.doesNotMatch(
      dependencySpecifier,
      /^(?:workspace|catalog):/,
      `${name} must not use a registry-invalid monorepo protocol`,
    );
  }
});

test('package remains private', () => {
  assert.equal(packageJson.private, true);
});
