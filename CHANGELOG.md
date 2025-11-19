# Change Log

## [1.1.2](https://github.com/CORSmirror/CORSmirror/compare/v1.1.0...v1.1.1) (2025-11-19)

### Miscellaneous Chores

- release 1.1.2 ([7318d14](https://github.com/corsmirror/CORSmirror/commit/7318d14aee0e48726bc72a832acbf307eec7ed29))

## [1.1.1](https://github.com/CORSmirror/CORSmirror/compare/v1.1.0...v1.1.1) (2024-03-16)

### Miscellaneous Chores

- release 1.1.1 ([a2d67b4](https://github.com/corsmirror/CORSmirror/commit/a2d67b41d63a61eaad58b4d77d4e37d75da630ef))

## [1.1.0](https://github.com/CORSmirror/CORSmirror/compare/v1.0.0...v1.1.0) (2022-09-11)

### Features

- **views:** add GitHub Corners and update highlight in layout.html ([392fffb](https://github.com/CORSmirror/CORSmirror/commit/392fffbcd35a56de32e594f978282e5df3a46c24))

## [1.0.0](https://github.com/CORSmirror/CORSmirror/compare/v0.0.5...v1.0.0) (2022-09-06)

### ⚠ BREAKING CHANGES

- set minimum Node.js version to 18

### Features

- rename /heartbeat to /healthcheck and modularize routes & tests ([dbf7dc1](https://github.com/CORSmirror/CORSmirror/commit/dbf7dc1c7f8a8a9e24227da8387ba8ec0d4acc95))

### Build System

- add .nvmrc and set node to 18 and npm to 8.6 in package.json ([cf7e8d7](https://github.com/CORSmirror/CORSmirror/commit/cf7e8d7325e3d60f7d1332abc0596ba3dd4fd56e))

## [0.0.5](https://github.com/CORSmirror/CORSmirror/compare/v0.0.4...v0.0.5) - 2017-03-14

### Added

- Use [dotenv](https://www.npmjs.com/package/dotenv) to load Google Analytics ID as an environment variable (#10)
- Create `/heartbeat` route that responds with 200 OK (#11)

### Changed

- Update layout template to render Google Analytics if ID is present (#10)

## [0.0.4](https://github.com/CORSmirror/CORSmirror/compare/v0.0.3...v0.0.4) - 2017-03-08

### Added

- Create `CHANGELOG.md` (#7)
- Create `.npmrc` and set `save-exact` to true (#8)

### Changed

- Upgrade package dependencies (#8)
- Make package private (#9)

## [0.0.3](https://github.com/CORSmirror/CORSmirror/compare/v0.0.2...v0.0.3) - 2016-09-21

### Added

- Allow header fields to be set or overridden by query params (#5)
  - However, keep non-overridable HTTP headers in a blacklist (currently it's just `url`)
- Validate content-type with [content-type](https://www.npmjs.com/package/content-type) (#5)
  - Respond with 500 error if content-type is invalid

### Changed

- Improve `README.md` and add header override example (#5, #6)
- In `package.json`, use exact versions of dependencies and improve keywords (#6)
- During development, have nodemon watch `README.md` (#6)

## [0.0.2](https://github.com/CORSmirror/CORSmirror/compare/v0.0.1...v0.0.2) - 2016-09-05

### Added

- Render HTML version of `README.md` on homepage (#2)
- Add meta tags and Google Analytics (#3)

### Changed

- Update package dependencies (#1)
- Replace [jade](https://github.com/jadejs/jade) with [hbs](https://github.com/pillarjs/hbs)
- Update templates (#2, #3)

## [0.0.1](https://github.com/CORSmirror/CORSmirror/tree/v0.0.1) - 2016-09-05

### Added

- Create RESTful API service that modifies the response headers to enable [CORS](https://github.com/expressjs/cors)
- Add tests
