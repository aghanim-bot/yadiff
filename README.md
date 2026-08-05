# yadiff, yet another diff viewer

<img src="assets/screenshot.png" alt="screenshot" width="800" />

> Huge shoutout to [pierrecomputer](https://github.com/pierrecomputer/pierre). Inspired by [diffshub](https://diffshub.com/), this tool is only possible thanks to the incredibly beautiful and high-performance diff and tree packages. All credit goes to the team!

A browser diff viewer for local git/jj diffs and GitHub PRs. It uses [pierrecomputer](https://github.com/pierrecomputer/pierre)'s open-source packages:

- [`@pierre/diffs`](https://github.com/pierrecomputer/pierre/tree/main/packages/diffs) for parsing/rendering diffs
- [`@pierre/trees`](https://github.com/pierrecomputer/pierre/tree/main/packages/trees) for the file tree

## Usage

Run the latest version of this fork directly from GitHub with `pnpx`:

```bash
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff
```

The explicit `github:aghanim-bot/yadiff` package spec fetches this repository; it does not resolve or install the npm-published `@baggiiiie/yadiff` package. The command-level build permission lets pnpx run this repository's `prepare` script, which compiles the browser assets during the temporary git dependency installation.

The command starts a local server in the background, opens the browser, acquires a diff from the selected source, and serves the patch to the browser. With no target, it defaults to `--working` (`jj @` in a jj workspace, otherwise `git diff`). The shell command exits after launch. When there are no browser sessions for one minute, the local server exits automatically.

Use `--foreground` to keep the server attached to the current terminal.

### Examples

Git:

```bash
# No target: unstaged tracked-file changes
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff

# A ref, two-dot range, or merge-base (three-dot) range
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff HEAD
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff main..feature
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff main...HEAD

# Explicit diff modes
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff --working
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff --staged
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff --dirty

# Run against a repository at another path
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff main...HEAD --repo ../some-repo
```

jj:

```bash
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff @ --repo ../some-jj-repo
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff 'mine() & mutable()' --vcs jj
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff --working --jj --repo ../some-jj-repo
```

GitHub:

```bash
pnpx --config.dangerously-allow-all-builds=true github:aghanim-bot/yadiff https://github.com/oven-sh/bun/pull/30412
```

Passing bun test:

https://github.com/user-attachments/assets/aeef9e88-5626-4799-9333-c4b9088282c8

## potential future improvement

- add a button to sync review to github, with `gh` cli?
- copy filename
- support for private repo and enterprise, with `gh` cli
- stdin support

## License

[MIT](./LICENSE).
