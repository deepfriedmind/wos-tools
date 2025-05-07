# Conventional Commits Guide for LLMs

IMPORTANT:

- Do NOT use the `fix` type for anything other than bug fixes
- Changes to config files should use the `chore` type
- Do NOT use the `style` type, use `refactor` instead
- Always use the `docs` type for Markdown files
- Body is optional. Only include it if it adds value
  - Do NOT use the body to reiterate the subject/description
  - Do NOT use the body to list files changed or affected by the commit
  - Do NOT use the body to list updates to dependencies
- Do NOT add mundane/generic "reasons" for changes, such as:
  - "for stability and performance"
  - "for improved functionality and security"
  - "for consistency"

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Core Rules

1. First line must follow the format: `<type>[(scope)](!): <description>`
2. Type must be one of the commit types listed below
3. Scope is optional and should describe a section of the codebase: `feat(user-auth):`
4. Adding `!` before the colon indicates a breaking change: `feat(api)!:`
5. Description should be concise and in imperative mood ("add" not "added")
6. Body provides additional context and should be separated by a blank line
7. Footers should be separated by a blank line and follow the format `token: value` or `token #value`
8. Breaking changes can be marked with a footer: `BREAKING CHANGE: description of the change`
9. The first line MUST NOT exceed 72 characters
10. Use backticks for code or file names

## Commit Types

| Type          | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `feat`        | A new feature                                                 |
| `fix`         | A bug fix                                                     |
| `docs`        | Documentation changes                                         |
| `refactor`    | A code change that neither fixes a bug nor adds a feature     |
| `perf`        | A code change that improves performance                       |
| `test`        | Adding missing tests or correcting existing tests             |
| `build`       | Changes that affect the build system or external dependencies |
| `ci`          | Changes to CI configuration files and scripts                 |
| `chore`       | Other changes that don't modify src or test files             |
| `chore(deps)` | Upgrading or downgrading dependencies                         |
| `revert`      | Reverts a previous commit                                     |

## Examples

```
feat(user-auth): add password strength indicator
```

```
fix(api): prevent race condition in request handler
```

```
docs: update README with new API endpoints
```

```
feat(api)!: change how authentication tokens are processed

This changes the token format and invalidates all existing tokens.
```

```
feat(authentication): implement OAuth2 authentication

BREAKING CHANGE: all auth endpoints now require OAuth2 tokens
```

```
fix(parser): resolve issue with nested object parsing

The parser was incorrectly handling nested objects when the depth
exceeded 3 levels. This patch fixes the recursive logic to properly
handle any depth of nesting.

Closes #42
```

## Full specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in [RFC 2119](./docs/rfc2119.md).

1. Commits MUST be prefixed with a type, which consists of a noun, `feat`, `fix`, etc., followed
   by the OPTIONAL scope, OPTIONAL `!`, and REQUIRED terminal colon and space.
1. The type `feat` MUST be used when a commit adds a new feature to your application or library.
1. The type `fix` MUST be used when a commit represents a bug fix for your application.
1. A scope MAY be provided after a type. A scope MUST consist of a noun describing a
   section of the codebase surrounded by parenthesis, e.g., `fix(parser):`
1. A description MUST immediately follow the colon and space after the type/scope prefix.
   The description is a short summary of the code changes, e.g., _fix: array parsing issue when multiple spaces were contained in string_.
1. A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes. The body MUST begin one blank line after the description.
1. A commit body is free-form and MAY consist of any number of newline separated paragraphs.
1. One or more footers MAY be provided one blank line after the body. Each footer MUST consist of
   a word token, followed by either a `:<space>` or `<space>#` separator, followed by a string value (this is inspired by the git trailer convention).
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
