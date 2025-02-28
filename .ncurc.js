/* eslint-disable unicorn/prefer-module */
module.exports = {
  /**
   * npm-check-updates {@link https://github.com/raineorshine/npm-check-updates#target custom target}.
   *
   * @param {string} dependencyName - The name of the dependency.
   * @param {!{major: !string=, minor: !string=, operator: !string=, patch: !string=, semver: !string=}[]=} parsedVersion - An array containing one {@link https://git.coolaj86.com/coolaj86/semver-utils.js#semverutils-parse-semverstring parsed Semver object} from semver-utils
   * @returns {('@[tag]'|'patch'|'minor'|'newest'|'latest'|'greatest')} - One of the valid target values
   */
  target: (dependencyName, [{ major, operator } = {}]) => {
    if (!operator || major === '0')
      return 'minor' // e.g. `"vue": "2"` or `"moment-timezone": "^0.5.40"

    return 'latest'
  },
}
