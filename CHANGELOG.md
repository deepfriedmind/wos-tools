# Changelog

All notable changes to this project will be documented in this file.

## [1.3.2] - 2025-04-29

### ✨ Features

- *(chief-charm-upgrade-calculator)* Add chief charm upgrade calculator (#4)
- *(config)* Add `@nuxtjs/robots` and `@nuxtjs/sitemap` modules
- *(vscode)* Add ESLint plugin command snippets

### 📚 Documentation

- Update llm docs
- Add es-toolkit docs

### 🔧 Miscellaneous Tasks

- *(vscode)* Remove unnecessary file exclusions from settings
- *(release)* Remove GitHub user links from CHANGELOG generation

## [1.3.1] - 2025-04-21

### ✨ Features

- *(server-timeline)* Add Pets Generation 7 and 8 unlock details

### ♻️ Refactor

- Minor tweaks
- *(utils)* `isEmpty` -> `isEmptyObject`

### 📚 Documentation

- Add documentation for Day.js features and usage examples
- Add test generation instructions to prompt file
- Update `es-toolkit` prompt to remove unused functions and add utility check

### 🔧 Miscellaneous Tasks

- *(eslint)* Add `ts/no-restricted-imports` rule for TypeScript and Vue files
- *(vscode)* Update recommended extensions list
- *(docs)* Update guidelines for TypeScript type usage and linting checks
- *(roomodes)* Add Boomerang Mode with detailed role instructions
- Add git-cliff config and release script
- Update release script for improved dependency checks
- *(release)* 1.3.1

## [1.3.0] - 2025-04-21

### ✨ Features

- *(chief-gear-upgrade-calculator)* Add Chief Gear Upgrade Calculator (#3)

### 🎨 Styling

- *(MainMenu)* Adjust drawer width for improved layout
- *(training-bonus-activation-calculator)* Adjust label and tooltip for training duration

## [1.2.0] - 2025-04-17

### ✨ Features

- *(gtag)* Add gtag integration (#2)

## [1.1.0] - 2025-04-16

### ✨ Features

- Add training bonus activation calculator and refactor components (#1)

## [1.0.0] - 2025-04-10

### ✨ Features

- *(app)* Add ResetCountdown component and enhance layout
- *(tests)* Add Vitest configuration and initial tests for `tw` utility
- *(config)* Add default font weights to Nuxt configuration
- *(layout)* Implement new layout structure with Header component
- *(calculator)* Add Gathering Amount Calculator component
- *(reset-countdown)* Add progress bar with dynamic color based on time remaining
- *(SettingsMenu)* Add settings menu for timezone and UTC toggle
- *(gathering-amount-calculator)* Integrate runtime config for storage prefix and timezone settings
- *(gathering-amount-calculator)* Add query parameter handling for resource nodes
- *(SettingsMenu)* Enhance timezone and time format settings UI
- *(gathering-amount-calculator)* Refactor resource node boost percentages and reorganize code structure
- *(CopyButton)* Add a copy button component for URL sharing
- *(SettingsMenu)* Replace ToggleSwitch with ToggleSwitchArrow component
- *(GatheringAmountCalculator)* Add tooltip to ToggleSwitch for time display
- *(GatheringAmountCalculator)* Add gathering bonus dialog and images
- *(Footer)* Add footer component with build time display
- *(Favicon)* Add favicon and web app manifest for improved branding
- *(Header)* Make header sticky
- *(GatheringAmountCalculator)* Add start time calculations for resources
- *(BearRallyCalculator)* Add bear rally calculator component
- *(CopyButton)* Add TypeScript interface for props
- *(Footer)* Update footer with last updated info and affiliation
- *(Header)* Add hover effect to logo in header component
- *(GatheringAmountCalculator)* Add CopyButton for current settings link
- *(BearRallyCalculator)* Add deployment capacity boosts
- *(BearRallyCalculator)* Integrate useChangeCase for troop type display
- *(BearRallyCalculator, GatheringAmountCalculator)* Add conditional CopyButton display with animation
- *(ResetCountdown)* Replace Transition with div for countdown display
- *(BearRallyCalculator)* Enhance rally composition display with icons
- *(ToolTip)* Add tooltip component for enhanced user guidance
- *(PolarBear)* Add interactive PolarBear component with eye movement
- *(main-menu)* Add page links
- *(seo)* Add dynamic SEO meta tags for pages
- *(main-menu)* Dynamically generate page links for the menu
- *(tooltip)* Add dynamic position support for tooltip component
- *(MainContentCard)* Add MainContentCard component for reusable content display
- *(index)* Add dynamic page links to the home page
- *(PolarBear)* Reset eyes and blink on click
- *(ncurc)* Add npm-check-updates configuration file
- *(layout)* Update background images and header layout styles for responsiveness
- *(footer)* Enhance footer layout for improved responsiveness
- *(CopyButton)* Use `useClipboard`
- *(tests)* Add tooltip directive to global plugins setup
- *(index.vue)* Enhance layout and add "More Coming Soon" message
- Responsive tweaks + use floating-vue
- Add mobile scroll into view functionality for inputs
- *(gathering-amount-calculator)* Add gradient animation for card header
- *(ResetCountdown)* Add arena warning toast notification before reset
- *(mise.toml)* Add mise config
- Add nuxt-og-image
- *(server-timeline)* Add server timeline page with milestones data
- *(server-timeline)* Add server timeline image and update layout
- *(pages)* Enhance page metadata with icons
- *(date)* Add useDateQueryParameter for managing server start date
- *(server-timeline)* Add milestone icons based on type
- *(server-timeline)* Add dynamic labels for server timeline illustration
- *(server-timeline)* Add help dialog for calculating server age

### 🐛 Bug Fixes

- *(header)* Update icon size and class for Header component
- *(gathering-amount-calculator)* Handle NaN case in max amount check and improve layout
- *(gathering-amount-calculator)* Handle edge cases for available time and number formatting
- *(reset-countdown)* Improve countdown logic and add debug mode
- *(Header, ResetCountdown)* Simplify layout and improve countdown display
- *(eslint.config.js)* Disable vue/no-multiple-template-root rule
- *(Header)* Adjust header shadow visibility based on scroll state
- *(CopyButton)* Rename interface from Properties to Props for consistency
- *(BearRallyCalculator)* Adjust label widths for better layout
- *(BearRallyCalculator)* Improve link hover effects for better UX
- *(github)* Update Copilot instructions for improved clarity
- *(cspell)* Add "zoomin" to spell check dictionary
- *(bear-hunt-rally-calculator)* Update capitalization function for troop type
- *(PolarBear)* Clear existing timeouts before starting animations
- *(bear-hunt-rally-calculator)* Clear toast groups before displaying new facts
- *(gathering-amount-calculator)* Adjust image height for better layout
- *(useResetCountdown)* Update debug countdown to use specified time
- Update package references from @primevue/themes to @primeuix/themes
- *(gathering-amount-calculator)* Improve accessibility and clarity in UI elements
- *(gathering-amount-calculator)* Fix hydration mismatch
- *(bear-hunt-rally-calculator)* Update CopyButton implementation for better accessibility
- 500 error in prod
- *(hydration)* Fix hydration issues
- *(server-timeline)* Correct milestone date calculation
- *(ResetCountdown)* Add aria-label to progress bar for accessibility

### ♻️ Refactor

- *(gathering-amount-calculator)* Simplify fastest node calculation
- *(gathering-amount-calculator)* Streamline conditional checks for boost and skill level
- *(bear-hunt-rally-calculator)* Replace watch with watchDebounced for settings
- *(gathering-amount-calculator)* Update local storage key for resource nodes
- *(bear-hunt-rally-calculator)* Update title and adjust blink parameters
- *(bear-hunt-rally-calculator)* Update title for clarity
- *(polar-bear)* Adjust double blink parameters for animation
- *(github-instructions)* Update auto-import guidelines for es-toolkit
- *(settings-menu)* Replace Popover with Drawer component
- *(main-menu)* Replace SettingsMenu with MainMenu component
- *(main-menu)* Update Logo component to use RouterLink
- *(main-menu)* Close drawer on route change
- *(logo)* Simplify Logo component props and usage
- *(nuxt.config)* Remove modal overlay configuration
- *(types)* Simplify BOOST_TYPES descriptions
- *(Logo, MainContentCard, ResetCountdown)* Improve class management and styling
- *(bear-hunt-rally-calculator)* Clamp rally count and update URL
- *(bear-hunt-rally-calculator)* Simplify random fact selection logic
- *(bear-hunt-rally-calculator)* Streamline SNOW_APE_LEVELS initialization
- *(ResetCountdown)* Make client-only
- *(gathering-amount-calculator)* Improve markup structure and accessibility
- *(PolarBear)* Replace random interval calculation with useRandom
- *(PolarBear)* Enhance eye movement responsiveness and accuracy
- *(PolarBear)* Make constants from magic numbers
- *(PolarBear)* Replace fixed number rounding with useRound for better readability
- *(PolarBear)* Replace magnitude calculation with useClamp for improved clarity
- *(PolarBear)* Refactor interactive polar bear
- *(components)* Replace `ref` with `shallowRef`
- *(index.vue)* Update class for RouterLink to improve styling
- *(tailwind.config.ts)* Update gradient animation duration and timing function
- *(app.vue, nuxt.config.ts, primevue.config.ts)* Simplify Toast component usage and restructure PrimeVue configuration
- *(copilot-instructions)* Update guidelines for code suggestions and testing
- *(CopyButton)* Simplify success class handling in button
- *(README)* Update project description and simplify installation instructions
- *(BearHuntLink)* Replace anchor tag with NuxtLink for better routing
- *(MainMenu)* Enhance RouterLink styling for better visibility
- *(Header)* Make main menu client-only + lazy-load
- *(LocalSettings)* Update tz settings on mount
- Make main background a `<picture>` element with art direction
- Wrap Logo component in RouterLink for improved navigation
- *(server-timeline)* Structure/performance
- *(server-timeline)* Reorganize milestone reference handling
- *(timeline-toc)* Improve milestone active state handling
- *(server-timeline)* Adjust milestone passed date calculation

### 📚 Documentation

- Update Copilot instructions for Nuxt 3 best practices
- Update Copilot instructions for test generation and state management
- Update Copilot instructions for file editing and testing
- Update documentation for useScrollHeader options
- Update test generation instructions to include import syntax
- Update/add llm docs
- *(llm)* Update llm docs
- *(llm)* Add primevue docs and prompt

### 🚨 Testing

- *(gathering-amount-calculator)* Add unit tests for Gathering Amount Calculator component
- *(MainMenu)* Refactor test setup with global plugins and stubs
- *(gathering-amount-calculator)* Update input selection test for number fields
- *(CopyButton)* Add unit tests for CopyButton component
- *(gathering-amount-calculator)* Update tests to use BOOST_TYPES constants
- Add unit tests for rem utility function

### 🔧 Miscellaneous Tasks

- Add `.tool-versions` and update `package.json` dependencies
- Add configuration files for VSCode and spell checking
- Update ESLint configuration and dependencies
- Add `type-check` script to `package.json`
- Add Tailwind CSS configuration and integrate PrimeVue theme
- Add `@nuxt/fonts` dependency and update `app.vue` layout
- Add `Logo` component and update `app.vue` layout
- Update ESLint configuration to enable stylistic rules
- Update ESLint and Tailwind CSS configurations
- Update title template and adjust logo component styles
- *(config)* Update `nuxt.config.ts` and `tailwind.config.ts` types
- *(config)* Update `nuxt.config.ts` to enhance icon configuration
- *(config)* Update commit message guidelines for clarity
- *(config)* Update Node.js and pnpm versions in configuration
- *(config)* Update TypeScript and ESLint dependencies
- *(config)* Reorganize ESLint rules and improve file structure
- Minor tweaks
- Rename bear hunt rally calculator page
- Add es-toolkit
- *(images)* Compress hero images
- *(images)* Replace rss + fc icons
- *(package)* Update dev command to include host option
- *(config)* Update Tailwind CSS configuration and Nuxt version
- *(vscode)* Update recommended extensions for improved development
- *(vscode)* Update VSCode extensions and settings configuration
- *(lint)* Add lint rules and fix issues

<!-- generated by git-cliff -->
