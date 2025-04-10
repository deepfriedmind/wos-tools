---
url: https://primevue.org/tieredmenu
scrapeDate: 2025-04-09T00:36:56.568Z
library: primevue

exactVersionMatch: false
---

## TieredMenu

TieredMenu displays submenus in nested overlays.

## Import [#](_tieredmenu_.md#import)
```
import TieredMenu from 'primevue/tieredmenu';
```
## Basic [#](_tieredmenu_.md#basic)

TieredMenu requires a collection of menuitems as its _model_.
```
<TieredMenu :model="items" />
```
## Popup [#](_tieredmenu_.md#popup)

Overlay mode is enabled by adding _popup_ property and calling _toggle_ function of the menu ref with an event of the target.
```
<Button type="button" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" />
<TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
```
## Template [#](_tieredmenu_.md#template)

TieredMenu offers item customization with the _item_ template that receives the menuitem instance from the model as a parameter.
```
<TieredMenu :model="items">
    <template #item="{ item, props, hasSubmenu }">
        <a v-ripple class="flex items-center" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
        </a>
    </template>
</TieredMenu>
```
## Command [#](_tieredmenu_.md#command)

The _command_ property defines the callback to run when an item is activated by click or a key event.
```
<TieredMenu :model="items" />
<Toast />
```
## Router [#](_tieredmenu_.md#router)

Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.
```
<TieredMenu :model="items">
    <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-angle-right ml-auto" />
        </a>
    </template>
</TieredMenu>
```
## Accessibility [#](_tieredmenu_.md#accessibility)

### Screen Reader

TieredMenu component uses the _menubar_ role with _aria-orientation_ set to "vertical" and the value to describe the menu can either be provided with _aria-labelledby_ or _aria-label_ props. Each list item has a _menuitem_ role with _aria-label_ referring to the label of the item and _aria-disabled_ defined if the item is disabled. A submenu within a TieredMenu uses the _menu_ role with an _aria-labelledby_ defined as the id of the submenu root menuitem label. In addition, menuitems that open a submenu have _aria-haspopup_ and _aria-expanded_ to define the relation between the item and the submenu.

In popup mode, the component implicitly manages the _aria-expanded_, _aria-haspopup_ and _aria-controls_ attributes of the target element to define the relation between the target and the popup.

### Keyboard Support

Key

Function

_tab_

Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence.

_shift_ + _tab_

Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence.

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

If option is closed, opens the option otherwise moves focus to the first child option.

_left arrow_

If option is open, closes the option otherwise moves focus to the parent option.

_home_

Moves focus to the first menuitem within the submenu.

_end_

Moves focus to the last menuitem within the submenu.

_any printable character_

Moves focus to the menuitem whose label starts with the characters being typed.