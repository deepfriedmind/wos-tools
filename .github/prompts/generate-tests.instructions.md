1. Generate tests for this file.
2. Re-read a file for changes after saving it (ESLint might have automatically fixed some issues).
3. Check if VSCode reports any problems in the file.
4. Fix all problems, repeat until there are 0 problems.
5. Run the tests.
6. If tests fail, fix the issues.
7. Repeat steps 2-6 until all tests pass and VSCode doesn't report any problems in edited files.

Requirements:

- Read [`/.github/prompts/generate-tests.prompt.md`](../copilot-test-generation-instructions.md) for instructions on test generation.
- Check `/tests` for existing tests as a reference.
- Use context7
