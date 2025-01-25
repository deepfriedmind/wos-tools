The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

1. Commits MUST be prefixed with a type, which consists of a noun, `feat`, `fix`, etc., followed
   by the OPTIONAL scope, OPTIONAL `!`, and REQUIRED terminal colon and space.
1. The type `feat` MUST be used when a commit adds a new feature to your application or library.
1. The type `fix` MUST be used when a commit represents a bug fix for your application.
1. A scope MAY be provided after a type. A scope MUST consist of a noun describing a
   section of the codebase surrounded by parenthesis, e.g., `fix(parser):`
1. An emoji (Devmoji) representing the type of change MUST immediately follow the colon and space after the type/scope prefix.
1. A space and a description MUST immediately follow the emoji.
   The description is a short summary of the code changes, e.g., _fix: array parsing issue when multiple spaces were contained in string_.
1. The subject line MUST NOT exceed 72 characters.
1. A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
1. A commit body is free-form and MAY consist of any number of newline separated paragraphs.
1. One or more footers MAY be provided one blank line after the body. Each footer MUST consist of
   a word token, followed by either a `:<space>` or `<space>#` separator, followed by a string value (this is inspired by the
   git trailer convention).
1. A footer's token MUST use `-` in place of whitespace characters, e.g., `Acked-by` (this helps differentiate
   the footer section from a multi-paragraph body). An exception is made for `BREAKING CHANGE`, which MAY also be used as a token.
1. A footer's value MAY contain spaces and newlines, and parsing MUST terminate when the next valid footer
   token/separator pair is observed.
1. Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the
   footer.
1. If included as a footer, a breaking change MUST consist of the uppercase text BREAKING CHANGE, followed by a colon, space, and description, e.g.,
   _BREAKING CHANGE: environment variables now take precedence over config files_.
1. If included in the type/scope prefix, breaking changes MUST be indicated by a
   `!` immediately before the `:`. If `!` is used, `BREAKING CHANGE:` MAY be omitted from the footer section,
   and the commit description SHALL be used to describe the breaking change.
1. Types other than `feat` and `fix` MAY be used in your commit messages, e.g., _docs: update ref docs._
1. The units of information that make up Conventional Commits MUST NOT be treated as case sensitive by implementors, with the exception of BREAKING CHANGE which MUST be uppercase.
1. BREAKING-CHANGE MUST be synonymous with BREAKING CHANGE, when used as a token in a footer.
1. Use backticks for code or file names.
1. Use these emojis for the different scopes: feat: ✨, fix: 🐛, docs: 📚, style: 🎨, refactor: ♻️, perf: ⚡, test: 🚨, chore: 🔧, chore-release: 🚀, chore-deps: 🔗, build: 📦, ci: 👷, security: 🔒, i18n: 🌐, breaking: 💥, config: ⚙️, add: ➕, remove: ➖.

### Default Devmoji Reference

| Emoji                       | Devmoji Code      | Description                                                                                                       |
| --------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| ✨ `:sparkles:`             | `:feat:`          | **feat:** a new feature                                                                                           |
| 🐛 `:bug:`                  | `:fix:`           | **fix:** a bug fix                                                                                                |
| 📚 `:books:`                | `:docs:`          | **docs:** documentation only changes                                                                              |
| 🎨 `:art:`                  | `:style:`         | **style:** changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| ♻️ `:recycle:`              | `:refactor:`      | **refactor:** a code change that neither fixes a bug nor adds a feature                                           |
| ⚡ `:zap:`                  | `:perf:`          | **perf:** a code change that improves performance                                                                 |
| 🚨 `:rotating_light:`       | `:test:`          | **test:** adding missing or correcting existing tests                                                             |
| 🔧 `:wrench:`               | `:chore:`         | **chore:** changes to the build process or auxiliary tools and libraries such as documentation generation         |
| 🚀 `:rocket:`               | `:chore-release:` | **chore(release):** code deployment or publishing to external repositories                                        |
| 🔗 `:link:`                 | `:chore-deps:`    | **chore(deps):** add or delete dependencies                                                                       |
| 📦 `:package:`              | `:build:`         | **build:** changes related to build processes                                                                     |
| 👷 `:construction_worker:`  | `:ci:`            | **ci:** updates to the continuous integration system                                                              |
| 🚀 `:rocket:`               | `:release:`       | code deployment or publishing to external repositories                                                            |
| 🔒 `:lock:`                 | `:security:`      | Fixing security issues                                                                                            |
| 🌐 `:globe_with_meridians:` | `:i18n:`          | Internationalization and localization                                                                             |
| 💥 `:boom:`                 | `:breaking:`      | Introducing breaking changes                                                                                      |
| ⚙️ `:gear:`                 | `:config:`        | Changing configuration files                                                                                      |
| ➕ `:heavy_plus_sign:`      | `:add:`           | add something                                                                                                     |
| ➖ `:heavy_minus_sign:`     | `:remove:`        | remove something                                                                                                  |
