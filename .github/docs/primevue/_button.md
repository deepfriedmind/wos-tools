---
url: https://primevue.org/button
scrapeDate: 2025-04-09T00:36:42.087Z
library: primevue

exactVersionMatch: false
---

## Button

Button is an extension to standard input element with icons and theming.

## Import [#](_button_.md#import)
```
import Button from 'primevue/button';
```
## Basic [#](_button_.md#basic)

Text to display on a button is defined with the _label_ property.
```
<Button label="Submit" />
```
## Icons [#](_button_.md#icons)

Icon of a button is specified with _icon_ property and position is configured using _iconPos_ attribute.
```
<Button icon="pi pi-home" aria-label="Save" />
<Button label="Profile" icon="pi pi-user" />
<Button label="Save" icon="pi pi-check" iconPos="right" />
<Button label="Search" icon="pi pi-search" iconPos="top" />
<Button label="Update" icon="pi pi-refresh" iconPos="bottom" />
```
## Loading [#](_button_.md#loading)

Busy state is controlled with the _loading_ property.
```
<Button type="button" label="Search" icon="pi pi-search" :loading="loading" @click="load" />
```
## Link [#](_button_.md#link)

The button element can be displayed as a link element visually when the _link_ property is present. If you need to customize the rendering, use the _as_ to change the element or _asChild_ for advanced templating.
```
<Button label="Link" variant="link" />
<Button as="a" label="External" href="https://vuejs.org/" target="_blank" rel="noopener" />
<Button asChild v-slot="slotProps">
    <RouterLink to="/" :class="slotProps.class">Router</RouterLink>
</Button>
```
## Severity [#](_button_.md#severity)

The _severity_ property defines the variant of a button.
```
<Button label="Primary" />
<Button label="Secondary" severity="secondary" />
<Button label="Success" severity="success" />
<Button label="Info" severity="info" />
<Button label="Warn" severity="warn" />
<Button label="Help" severity="help" />
<Button label="Danger" severity="danger" />
<Button label="Contrast" severity="contrast" />
```
## Disabled [#](_button_.md#disabled)

When _disabled_ is present, the element cannot be used.
```
<Button label="Submit" disabled />
```
## Raised [#](_button_.md#raised)

Raised buttons display a shadow to indicate elevation.
```
<Button label="Primary" raised />
<Button label="Secondary" severity="secondary" raised />
<Button label="Success" severity="success" raised />
<Button label="Info" severity="info" raised />
<Button label="Warn" severity="warn" raised />
<Button label="Help" severity="help" raised />
<Button label="Danger" severity="danger" raised />
<Button label="Contrast" severity="contrast" raised />
```
## Rounded [#](_button_.md#rounded)

Rounded buttons have a circular border radius.
```
<Button label="Primary" rounded />
<Button label="Secondary" severity="secondary" rounded />
<Button label="Success" severity="success" rounded />
<Button label="Info" severity="info" rounded />
<Button label="Warn" severity="warn" rounded />
<Button label="Help" severity="help" rounded />
<Button label="Danger" severity="danger" rounded />
<Button label="Contrast" severity="contrast" rounded />
```
## Text [#](_button_.md#text)

Text buttons are displayed as textual elements.
```
<Button label="Primary" variant="text" />
<Button label="Secondary" severity="secondary" variant="text" />
<Button label="Success" severity="success" variant="text" />
<Button label="Info" severity="info" variant="text" />
<Button label="Warn" severity="warn" variant="text" />
<Button label="Help" severity="help" variant="text" />
<Button label="Danger" severity="danger" variant="text" />
<Button label="Contrast" severity="contrast" variant="text" />
```
## Raised Text [#](_button_.md#raisedtext)

Text buttons can be displayed elevated with the _raised_ option.
```
<Button label="Primary" variant="text" raised />
<Button label="Secondary" severity="secondary" variant="text" raised />
<Button label="Success" severity="success" variant="text" raised />
<Button label="Info" severity="info" variant="text" raised />
<Button label="Warn" severity="warn" variant="text" raised />
<Button label="Help" severity="help" variant="text" raised />
<Button label="Danger" severity="danger" variant="text" raised />
<Button label="Contrast" severity="contrast" variant="text" raised />
```
## Outlined [#](_button_.md#outlined)

Outlined buttons display a border without a transparent background.
```
<Button label="Primary" variant="outlined" />
<Button label="Secondary" severity="secondary" variant="outlined" />
<Button label="Success" severity="success" variant="outlined" />
<Button label="Info" severity="info" variant="outlined" />
<Button label="Warn" severity="warn" variant="outlined" />
<Button label="Help" severity="help" variant="outlined" />
<Button label="Danger" severity="danger" variant="outlined" />
<Button label="Contrast" severity="contrast" variant="outlined" />
```
## Icon Only [#](_button_.md#icononly)

Buttons can have icons without labels.
```
<Button icon="pi pi-check" aria-label="Filter" />
<Button icon="pi pi-bookmark" severity="secondary" aria-label="Bookmark" />
<Button icon="pi pi-search" severity="success" aria-label="Search" />
<Button icon="pi pi-user" severity="info" aria-label="User" />
<Button icon="pi pi-bell" severity="warn" aria-label="Notification" />
<Button icon="pi pi-heart" severity="help" aria-label="Favorite" />
<Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
<Button icon="pi pi-star" severity="contrast" aria-label="Star" />
<Button icon="pi pi-check" rounded aria-label="Filter" />
<Button icon="pi pi-bookmark" severity="secondary" rounded aria-label="Bookmark" />
<Button icon="pi pi-search" severity="success" rounded aria-label="Search" />
<Button icon="pi pi-user" severity="info" rounded aria-label="User" />
<Button icon="pi pi-bell" severity="warn" rounded aria-label="Notification" />
<Button icon="pi pi-heart" severity="help" rounded aria-label="Favorite" />
<Button icon="pi pi-times" severity="danger" rounded aria-label="Cancel" />
<Button icon="pi pi-star" severity="contrast" rounded aria-label="Star" />
<Button icon="pi pi-check" rounded variant="outlined" aria-label="Filter" />
<Button icon="pi pi-bookmark" severity="secondary" rounded variant="outlined" aria-label="Bookmark" />
<Button icon="pi pi-search" severity="success" rounded variant="outlined" aria-label="Search" />
<Button icon="pi pi-user" severity="info" rounded variant="outlined" aria-label="User" />
<Button icon="pi pi-bell" severity="warn" rounded variant="outlined" aria-label="Notification" />
<Button icon="pi pi-heart" severity="help" rounded variant="outlined" aria-label="Favorite" />
<Button icon="pi pi-times" severity="danger" rounded variant="outlined" aria-label="Cancel" />
<Button icon="pi pi-star" severity="contrast" rounded variant="outlined" aria-label="Star" />
<Button icon="pi pi-check" variant="text" raised rounded aria-label="Filter" />
<Button icon="pi pi-bookmark" severity="secondary" variant="text" raised rounded aria-label="Bookmark" />
<Button icon="pi pi-search" severity="success" variant="text" raised rounded aria-label="Search" />
<Button icon="pi pi-user" severity="info" variant="text" raised rounded aria-label="User" />
<Button icon="pi pi-bell" severity="warn" variant="text" raised rounded aria-label="Notification" />
<Button icon="pi pi-heart" severity="help" variant="text" raised rounded aria-label="Favorite" />
<Button icon="pi pi-times" severity="danger" variant="text" raised rounded aria-label="Cancel" />
<Button icon="pi pi-star" severity="contrast" variant="text" raised rounded aria-label="Star" />
<Button icon="pi pi-check" variant="text" rounded aria-label="Filter" />
<Button icon="pi pi-bookmark" severity="secondary" variant="text" rounded aria-label="Bookmark" />
<Button icon="pi pi-search" severity="success" variant="text" rounded aria-label="Search" />
<Button icon="pi pi-user" severity="info" variant="text" rounded aria-label="User" />
<Button icon="pi pi-bell" severity="warn" variant="text" rounded aria-label="Notification" />
<Button icon="pi pi-heart" severity="help" variant="text" rounded aria-label="Favorite" />
<Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel" />
<Button icon="pi pi-star" severity="contrast" variant="text" rounded aria-label="Star" />
```
## Badge [#](_button_.md#badge)

Buttons have built-in badge support with _badge_ and _badgeSeverity_ properties.
```
<Button type="button" label="Emails" badge="2" />
<Button type="button" label="Messages" icon="pi pi-users" badge="2" badgeSeverity="contrast" variant="outlined"  />
```
## Button Group [#](_button_.md#buttongroup)

Multiple buttons are grouped when wrapped inside an element with _ButtonGroup_ component.
```
<ButtonGroup>
    <Button label="Save" icon="pi pi-check" />
    <Button label="Delete" icon="pi pi-trash" />
    <Button label="Cancel" icon="pi pi-times" />
</ButtonGroup>
```
## Sizes [#](_button_.md#sizes)

Button provides _small_ and _large_ sizes as alternatives to the base.
```
<Button label="Small" icon="pi pi-check" size="small" />
<Button label="Normal" icon="pi pi-check" />
<Button label="Large" icon="pi pi-check" size="large" />
```
## Template [#](_button_.md#template)

Custom content inside a button is defined as children.
```
<Button variant="outlined" class="!border-2">
    <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="..." fill="var(--p-primary-color)" />
        <path d="..." fill="var(--p-text-color)" />
    </svg>
</Button>
```
## Headless [#](_button_.md#headless)

Headless mode is enabled by adding the _asChild_ property and defining your own UI element with the available bindings.
```
<Button v-slot="slotProps" asChild>
    <button
        v-bind="slotProps.a11yAttrs"
        class="rounded-lg bg-gradient-to-br from-primary-400 to-primary-700 active:from-primary-700 active:to-primary-900 text-white border-none px-6 py-3 font-bold hover:ring-2 cursor-pointer ring-offset-2 ring-offset-surface-0 dark:ring-offset-surface-900 ring-primary transition-all"
    >
        SIGN UP
    </button>
</Button>
```
## Accessibility [#](_button_.md#accessibility)

### Screen Reader

Button component renders a native button element that implicitly includes any passed prop. Text to describe the button is defined with the _aria-label_ prop, if not present _label_ prop is used as the value. If the button is icon only or custom templating is used, it is recommended to use _aria-label_ so that screen readers would be able to read the element properly.
```
<Button icon="pi pi-check" aria-label="Submit" />
<Button icon="pi pi-check" label="Submit" />
<Button class="youtube p-0" aria-label="Youtube">
    <i class="pi pi-youtube px-2"></i>
    <span class="px-4">Youtube</span>
</Button>
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the button.

_enter_

Activates the button.

_space_

Activates the button.