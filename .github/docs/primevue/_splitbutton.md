---
url: https://primevue.org/splitbutton
scrapeDate: 2025-04-09T00:36:39.914Z
library: primevue

exactVersionMatch: false
---

## SplitButton

SplitButton groups a set of commands in an overlay with a default command.

## Import [#](_splitbutton_.md#import)
```
import SplitButton from 'primevue/splitbutton';
```
## Basic [#](_splitbutton_.md#basic)

SplitButton has a default command button and a collection of additional options defined by the _model_ property.
```
<SplitButton label="Save" @click="save" :model="items" />
```
## Icons [#](_splitbutton_.md#icons)

The buttons and menuitems have support to display icons.
```
<SplitButton label="Save" icon="pi pi-check" dropdownIcon="pi pi-cog" @click="save" :model="items" />
```
## Nested [#](_splitbutton_.md#nested)

Multi-level menus are supported with a nested menu hierarchy.
```
<SplitButton label="Save" @click="save" :model="items" />
```
## Severity [#](_splitbutton_.md#severity)

The _severity_ property defines the variant of a button.
```
<SplitButton label="Save" :model="items" @click="save"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" severity="secondary"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" severity="success"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" severity="info"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" severity="warn"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" severity="help"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" severity="danger"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" severity="contrast"></SplitButton>
```
## Disabled [#](_splitbutton_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<SplitButton label="Save" @click="save" :model="items" disabled />
```
## Raised [#](_splitbutton_.md#raised)

Raised buttons display a shadow to indicate elevation.
```
<SplitButton label="Save" :model="items" @click="save" raised></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised severity="secondary"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised severity="success"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised severity="info"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised severity="warn"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised severity="help"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised severity="danger"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised severity="contrast"></SplitButton>
```
## Rounded [#](_splitbutton_.md#rounded)

Rounded buttons have a circular border radius.
```
<SplitButton label="Save" :model="items" @click="save" rounded></SplitButton>
<SplitButton label="Save" :model="items" @click="save" rounded severity="secondary"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" rounded severity="success"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" rounded severity="info"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" rounded severity="warn"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" rounded severity="help"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" rounded severity="danger"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" rounded severity="contrast"></SplitButton>
```
## Text [#](_splitbutton_.md#text)

Text buttons are displayed as textual elements.
```
<SplitButton label="Save" :model="items" @click="save" text></SplitButton>
<SplitButton label="Save" :model="items" @click="save" text severity="secondary"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" text severity="success"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" text severity="info"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" text severity="warn"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" text severity="help"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" text severity="danger"></SplitButton>
```
## Raised Text [#](_splitbutton_.md#raisedtext)

Text buttons can be displayed as raised as well for elevation.
```
<SplitButton label="Save" :model="items" @click="save" raised text></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised text severity="secondary"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised text severity="success"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised text severity="info"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised text severity="warn"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised text severity="help"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" raised text severity="danger"></SplitButton>
```
## Outlined [#](_splitbutton_.md#outlined)

Outlined buttons display a border without a background initially.
```
<SplitButton label="Save" :model="items" @click="save" outlined></SplitButton>
<SplitButton label="Save" :model="items" @click="save" outlined severity="secondary"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" outlined severity="success"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" outlined severity="info"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" outlined severity="warn"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" outlined severity="help"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" outlined severity="danger"></SplitButton>
<SplitButton label="Save" :model="items" @click="save" outlined severity="contrast"></SplitButton>
```
## Sizes [#](_splitbutton_.md#sizes)

SplitButton provides _small_ and _large_ sizes as alternatives to the standard.
```
<SplitButton label="Save" :model="items" icon="pi pi-plus" size="small"></SplitButton>
<SplitButton label="Save" :model="items" icon="pi pi-plus"></SplitButton>
<SplitButton label="Save" :model="items" icon="pi pi-plus" size="large"></SplitButton>
```
## Template [#](_splitbutton_.md#template)

Custom content inside a button is defined as children.
```
<SplitButton :model="items" @click="save" severity="contrast">
    <span class="flex items-center font-bold">
        <img alt="logo" src="https://primefaces.org/cdn/primevue/images/logo.svg" style="height: 1rem; margin-right: 0.5rem" />
        <span>PrimeVue</span>
    </span>
</SplitButton>
```
## Accessibility [#](_splitbutton_.md#accessibility)

### Screen Reader

SplitButton component renders two native button elements, main button uses the label property to define _aria-label_ by default which can be customized with _buttonProps_. Dropdown button requires an explicit definition to describe it using _menuButtonProps_ option and also includes _aria-haspopup_, _aria-expanded_ for states along with _aria-controls_ to define the relation between the popup and the button.

The popup overlay uses _menu_ role on the list and each action item has a _menuitem_ role with an _aria-label_ as the menuitem label. The id of the menu refers to the _aria-controls_ of the dropdown button.
```
<SplitButton :buttonProps="{'aria-label': 'Default Action'}" :menuButtonProps="{'aria-label': 'More Options'}" />
```
### Main Button Keyboard Support

Key

Function

_enter_

Activates the button.

_space_

Activates the button.

### Menu Button Keyboard Support

Key

Function

_enter__space__down arrow__up arrow_

Opens the menu and moves focus to the first item.

### Menu Keyboard Support

Key

Function

_enter_

If menuitem has a submenu, opens the submenu otherwise activates the menuitem and closes all open overlays.

_space_

If menuitem has a submenu, opens the submenu otherwise activates the menuitem and closes all open overlays.

_escape_

If focus is inside a popup submenu, closes the submenu and moves focus to the root item of the closed submenu.

_down arrow_

Moves focus to the next menuitem within the submenu.

_up arrow_

Moves focus to the previous menuitem within the submenu.

_alt_ + _up arrow_

Closes the popup, then moves focus to the target element.

_right arrow_

In nested mode if option is closed, opens the option otherwise moves focus to the first child option.

_left arrow_

In nested mode if option is open, closes the option otherwise moves focus to the parent option.

_home_

Moves focus to the first menuitem within the submenu.

_end_

Moves focus to the last menuitem within the submenu.

_any printable character_

Moves focus to the menuitem whose label starts with the characters being typed.