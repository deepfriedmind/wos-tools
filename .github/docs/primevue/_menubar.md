---
url: https://primevue.org/menubar
scrapeDate: 2025-04-09T00:36:50.844Z
library: primevue

exactVersionMatch: false
---

## Menubar

Menubar also known as Navbar, is a horizontal menu component.

## Import [#](_menubar_.md#import)
```
import Menubar from 'primevue/menubar';
```
## Basic [#](_menubar_.md#basic)

Menubar requires a collection of menuitems as its _model_.
```
<Menubar :model="items" />
```
## Advanced [#](_menubar_.md#advanced)

Menubar is a simple horizontal navigation component, for advanced use cases consider [Marketing](https://primeblocks.org/marketing/navbar) and [Application](https://primeblocks.org/application/navbar) NavBars in PrimeBlocks or [templates](_templates.md) with horizontal menus in application templates.

## Template [#](_menubar_.md#template)

Menubar offers item customization with the _item_ template that receives the menuitem instance from the model as a parameter. Additional slots named _start_ and _end_ are provided to embed content before or after the menu.
```
<Menubar :model="items">
    <template #start>
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
            <path d="..." fill="var(--p-primary-color)" />
            <path d="..." fill="var(--p-text-color)" />
        </svg>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex items-center" v-bind="props.action">
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
    </template>
    <template #end>
        <div class="flex items-center gap-2">
            <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
        </div>
    </template>
</Menubar>
```
## Command [#](_menubar_.md#command)

The _command_ property defines the callback to run when an item is activated by click or a key event.
```
<Menubar :model="items" />
<Toast />
```
## Router [#](_menubar_.md#router)

Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.
```
<Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
    </template>
</Menubar>
```
## Accessibility [#](_menubar_.md#accessibility)

### Screen Reader

Menubar component uses the _menubar_ role and the value to describe the menu can either be provided with _aria-labelledby_ or _aria-label_ props. Each list item has a _menuitem_ role with _aria-label_ referring to the label of the item and _aria-disabled_ defined if the item is disabled. A submenu within a MenuBar uses the _menu_ role with an _aria-labelledby_ defined as the id of the submenu root menuitem label. In addition, menuitems that open a submenu have _aria-haspopup_, _aria-expanded_ and _aria-controls_ to define the relation between the item and the submenu.

In mobile viewports, a menu icon appears with a _button_ role along with _aria-haspopup_, _aria-expanded_ and _aria-controls_ to manage the relation between the overlay menubar and the button. The value to describe the button can be defined _aria-label_ or _aria-labelledby_ specified using _buttonProps_, by default _navigation_ key of the _aria_ property from the [locale](_configuration_.md#locale) API as the _aria-label_.

### Keyboard Support

Key

Function

_tab_

Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence.

_shift_ + _tab_

Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence.

_enter_

If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays.

_space_

If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays.

_escape_

If focus is inside a popup submenu, closes the submenu and moves focus to the root item of the closed submenu.

_down arrow_

If focus is on a root element, open a submenu and moves focus to the first element in the submenu otherwise moves focus to the next menuitem within the submenu.

_up arrow_

If focus is on a root element, opens a submenu and moves focus to the last element in the submenu otherwise moves focus to the previous menuitem within the submenu.

_right arrow_

If focus is on a root element, moves focus to the next menuitem otherwise opens a submenu if there is one available and moves focus to the first item.

_left arrow_

If focus is on a root element, moves focus to the previous menuitem otherwise closes a submenu and moves focus to the root item of the closed submenu.

_home_

Moves focus to the first menuitem within the submenu.

_end_

Moves focus to the last menuitem within the submenu.

_any printable character_

Moves focus to the menuitem whose label starts with the characters being typed.