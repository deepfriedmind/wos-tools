---
url: https://primevue.org/panelmenu
scrapeDate: 2025-04-09T00:36:49.899Z
library: primevue

exactVersionMatch: false
---

## PanelMenu

PanelMenu is a hybrid of accordion-tree components.

## Import [#](_panelmenu_.md#import)
```
import PanelMenu from 'primevue/panelmenu';
```
## Basic [#](_panelmenu_.md#basic)

PanelMenu requires a collection of menuitems as its _model_.
```
<PanelMenu :model="items" />
```
## Multiple [#](_panelmenu_.md#multiple)

Only one root menuitem at a time can be active by default, enabling _multiple_ property changes this behavior to allow multiple root menuitems.
```
<PanelMenu :model="items" multiple />
```
## Controlled [#](_panelmenu_.md#controlled)

If the menuitem has a _key_ defined, PanelMenu state can be controlled programmatically with the _expandedKeys_ property that defines the keys that are expanded. This property is a Map instance whose key is the key of a node and value is a boolean.
```
<Button type="button" label="Toggle All" text @click="toggleAll" />
<PanelMenu v-model:expandedKeys="expandedKeys" :model="items" />
```
## Template [#](_panelmenu_.md#template)

PanelMenu offers item customization with the _item_ template that receives the menuitem instance from the model as a parameter.
```
<PanelMenu :model="items">
    <template #item="{ item }">
        <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group">
            <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
            <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
        </a>
    </template>
</PanelMenu>
```
## Command [#](_panelmenu_.md#command)

The _command_ property defines the callback to run when an item is activated by click or a key event.
```
<PanelMenu :model="items" />
<Toast />
```
## Router [#](_panelmenu_.md#router)

Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.
```
<PanelMenu :model="items">
    <template #item="{ item }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2" :href="href" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </router-link>
        <a v-else v-ripple class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2" :href="item.url" :target="item.target">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
        </a>
    </template>
</PanelMenu>
```
## Accessibility [#](_panelmenu_.md#accessibility)

### Screen Reader

Accordion header elements have a _button_ role, an _aria-label_ defined using the _label_ property of the menuitem model and _aria-controls_ to define the id of the content section along with _aria-expanded_ for the visibility state.

The content of an accordion panel uses _region_ role, defines an id that matches the _aria-controls_ of the header and _aria-labelledby_ referring to the id of the header.

The tree elements has a _tree_ as the role and each menu item has a _treeitem_ role along with _aria-label_ and _aria-expanded_ attributes. The container element of a treenode has the _group_ role. The _aria-setsize_, _aria-posinset_ and _aria-level_ attributes are calculated implicitly and added to each treeitem.

### Header Keyboard Support

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

_down arrow_

Moves focus to the next header. If focus is on the last header, moves focus to the first header.

_up arrow_

Moves focus to the previous header. If focus is on the first header, moves focus to the last header.

_home_

Moves focus to the first header.

_end_

Moves focus to the last header.