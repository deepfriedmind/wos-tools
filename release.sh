#!/usr/bin/env bash
# Bash script to prepare a release using git-cliff.
# More info: https://github.com/welpo/release
# Inspired by https://github.com/orhun/git-cliff/blob/main/release.sh
set -euo pipefail

# Check for required dependencies
if ! command -v git-cliff &> /dev/null; then
    echo "Error: git-cliff is not installed or not in PATH." >&2
    exit 1
fi

VERSION_FORMAT="^v?[0-9]+\.[0-9]+\.[0-9]+.*"

exit_with_message() {
    echo "$1" >&2
    exit 1
}

execute_hook() {
    hook_name="$1"
    hooks_dir="$GIT_ROOT/.release-hooks"
    hook_path="$hooks_dir/$hook_name"
    if [ -f "$hook_path" ] && [ ! -x "$hook_path" ]; then
        exit_with_message "Hook $hook_name exists but is not executable. Run: chmod +x $hook_path"
    elif [ -x "$hook_path" ]; then
        echo "Executing $hook_name hook…"
        if ! "$hook_path" "$VERSION_TAG"; then
            exit_with_message "$hook_name hook failed."
        fi
    fi
}

GIT_ROOT=$(git rev-parse --show-toplevel)
if [ ! -d "$GIT_ROOT" ]; then
    exit_with_message "Unable to determine git root directory"
fi

# Run only from default branch.
default_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "$default_branch" ]; then
    exit_with_message "Not on $default_branch branch. Switch to $default_branch before running this script."
fi

# Check for a clean working directory.
if [ -n "$(git status --porcelain)" ]; then
    exit_with_message "Your working directory is dirty. Commit or stash your changes before running this script."
fi

# Ensure the local repository is up-to-date.
echo "Updating local repository…"
git fetch origin

LOCAL_COMMIT=$(git rev-parse @)
REMOTE_COMMIT=$(git rev-parse "@{u}")
BASE_COMMIT=$(git merge-base @ "@{u}")

if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
    echo "Local repository is up to date with remote."
elif [ "$LOCAL_COMMIT" = "$BASE_COMMIT" ]; then
    exit_with_message "Your local branch is behind the remote. Pull the latest changes before running this script."
elif [ "$REMOTE_COMMIT" = "$BASE_COMMIT" ]; then
    echo "Your local branch is ahead of the remote. Checking if local changes can be pushed…"
    if git push --dry-run &> /dev/null; then
        echo "Local changes can be pushed without conflicts. Proceeding with the release."
    else
        exit_with_message "Unable to push local changes. Resolve any conflicts before running this script."
    fi
else
    exit_with_message "Local and remote branches have diverged. Please resolve before running this script."
fi

# Check if a version tag is provided.
if [ "$#" -eq 1 ]; then
    VERSION_TAG=$1
else
    suggested_version=$(git cliff --bumped-version)
    echo -n "No version tag provided. git-cliff suggests $suggested_version. Proceed? [Y/n] "
    read -r user_input

    # Check if input is empty or a variation of "yes".
    if [[ -z "$user_input" || "$user_input" =~ ^[Yy](es)?$ ]]; then
        echo "Proceeding with version $suggested_version."
        VERSION_TAG=$suggested_version
    else
        exit_with_message "Release preparation cancelled."
    fi
fi

# Verify that the version tag matches the expected format.
if ! [[ $VERSION_TAG =~ $VERSION_FORMAT ]]; then
    exit_with_message "Version tag $VERSION_TAG does not match the expected format ${VERSION_FORMAT}."
fi

echo "Preparing release ${VERSION_TAG}…"
echo

# Execute pre-release hooks.
execute_hook "pre-release"

# Update CHANGELOG.
git cliff --tag "$VERSION_TAG" -o CHANGELOG.md

# Add all changes and commit.
git add -A
git commit -m "chore(release): 🚀 $VERSION_TAG"

# Generate the description for the git tag.
changelog=$(git cliff --tag "$VERSION_TAG" --unreleased --strip all)

# Clean up; tag descriptions don't support markdown.
# Remove PR links.
changelog=$(echo "$changelog" | sed -E 's/\[\#([0-9]+)\]\(https:\/\/github\.com\/deepfriedmind\/[^\/]+\/(issues|pull)\/([0-9]+)\)/#\1/g')
# Remove commit links.
changelog=$(echo "$changelog" | sed -E 's/\[([0-9a-f]+)\]\(https:\/\/github\.com\/deepfriedmind\/[^\/]+\/commit\/([0-9a-f]+)\)/\1/g')
# Remove scopes.
changelog=$(echo "$changelog" | sed -E 's/\*\(([^)]+)\)\* //g')
# Remove markdown headers.
changelog=$(echo "$changelog" | sed -E 's/^#+ //g')
# Remove version comparison lines.
changelog=$(echo "$changelog" | sed '/https:\/\/github\.com\/.*\/compare\/.*/d')

# Create a signed and annotated tag.
git tag -s -a "$VERSION_TAG" -m "Release $VERSION_TAG" -m "$changelog"

echo "Most recent commit:"
git log -1
echo
echo "Information for tag $VERSION_TAG:"
git show "$VERSION_TAG"
echo

# Execute post-release hook.
execute_hook "post-release"

echo "Release $VERSION_TAG is ready. Don't forget to push the changes and the tag:"

remote_url=$(git remote get-url origin)
# Check if the URL is in SSH format (git@).
if [[ "$remote_url" == git@github.com:* ]]; then
    https_url="https://github.com/${remote_url#git@github.com:}"
    https_url="${https_url%.git}"
else
    https_url="${remote_url%.git}"
fi

echo "git push && git push --tags && open ${https_url}/tags"
