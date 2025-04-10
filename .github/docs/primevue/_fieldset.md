---
url: https://primevue.org/fieldset
scrapeDate: 2025-04-09T00:36:52.075Z
library: primevue

exactVersionMatch: false
---

## Fieldset

Fieldset is a grouping component with a content toggle feature.

## Import [#](_fieldset_.md#import)
```
import Fieldset from 'primevue/fieldset';
```
## Basic [#](_fieldset_.md#basic)

A simple Fieldset is created with a _legend_ property along with the content as children.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<Fieldset legend="Header">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Fieldset>
```
## Toggleable [#](_fieldset_.md#toggleable)

Content of the fieldset can be expanded and collapsed when _toggleable_ option is enabled.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<Fieldset legend="Header" :toggleable="true">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Fieldset>
```
## Template [#](_fieldset_.md#template)

Legend section can be customized with custom content using templating.

![](https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png)

Amy Elsner

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<Fieldset>
    <template #legend>
        <div class="flex items-center pl-2">
            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold p-2">Amy Elsner</span>
        </div>
    </template>
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Fieldset>
```
## Accessibility [#](_fieldset_.md#accessibility)

### Screen Reader

Fieldset component uses the semantic _fieldset_ element. When toggleable option is enabled, a button element is included inside the _legend_ element, this button has _aria-controls_ to define the id of the content section along with _aria-expanded_ for the visibility state. The value to read the button defaults to the value of the _legend_ property and can be customized by defining an _aria-label_ or _aria-labelledby_ via the _toggleButtonProps_ property.

The content uses _region_, defines an id that matches the _aria-controls_ of the content toggle button and _aria-labelledby_ referring to the id of the header.

###### Content Toggle Button Keyboard Support

Key

Function

_tab_

Moves focus to the next the focusable element in the page tab sequence.

_shift_ + _tab_

Moves focus to the previous the focusable element in the page tab sequence.

_enter_

Toggles the visibility of the content.

_space_

Toggles the visibility of the content.