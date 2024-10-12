# 2fa-code-generator

_Copyright 2024, Caleb Evans_  
_Released under the MIT license_

[![tests](https://github.com/caleb531/2fa-code-generator/actions/workflows/tests.yml/badge.svg)](https://github.com/caleb531/2fa-code-generator/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/caleb531/2fa-code-generator/badge.svg?branch=main)](https://coveralls.io/github/caleb531/2fa-code-generator?branch=main)

A simple application which serves as a secure space for you to generate a 2FA
code from a secret.

Live App: https://projects.calebevans.me/2fa-code-generator/

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
