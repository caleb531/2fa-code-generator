# 2fa-code-generator

_Copyright 2024, Caleb Evans_  
_Released under the MIT license_

A simple application which serves as a secure space for you to generate a 2FA
code from a secret.

<!-- Live App: https://projects.calebevans.me/2fa-code-generator/ -->

## Setup

### Installing

This project uses [pnpm][pnpm] (instead of npm) for package installation and
management.

[pnpm]: https://pnpm.io/

```bash
npm install -g pnpm
pnpm install
```

### Serving the site

```bash
pnpm dev
```

The site will then be viewable in your browser at http://localhost:5173.

## Running tests

You can run tests like so:

```sh
pnpm test
```

If you want to calculate code coverage, run:

```sh
pnpm coverage
```
