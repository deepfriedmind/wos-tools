---
url: https://primevue.org/menu
scrapeDate: 2025-04-09T00:36:51.124Z
library: primevue

exactVersionMatch: false
---

## Menu

Menu displays a list of items in vertical orientation.

## Import [#](_menu_.md#import)
```
import Menu from 'primevue/menu';
```
## Basic [#](_menu_.md#basic)

Menu requires a collection of menuitems as its _model_.

## Group [#](_menu_.md#group)

Menu supports single level of grouping by defining children with the _items_ property.

## Popup [#](_menu_.md#popup)

Overlay mode is enabled by adding _popup_ property and calling _toggle_ function of the menu ref with an event of the target.
```
<Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
<Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
```
## Template [#](_menu_.md#template)

Menu offers item customization with the _item_ template that receives the menuitem instance from the model as a parameter. The submenu label has its own _submenulabel_ template, additional slots named _start_ and _end_ are provided to embed content before or after the menu.
```
<Menu :model="items" class="w-full md:w-60">
    <template #start>
        <span class="inline-flex items-center gap-1 px-2 py-2">
            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
                <path d="..." fill="var(--p-primary-color)" />
                <path d="..." fill="var(--p-text-color)" />
            </svg>
            <span class="text-xl font-semibold">PRIME<span class="text-primary">APP</span></span>
        </span>
    </template>
    <template #submenulabel="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
    </template>
    <template #item="{ item, props }">
        <a v-ripple class="flex items-center" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
        </a>
    </template>
    <template #end>
        <button v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
            <span class="inline-flex flex-col items-start">
                <span class="font-bold">Amy Elsner</span>
                <span class="text-sm">Admin</span>
            </span>
        </button>
    </template>
</Menu>
```
## Command [#](_menu_.md#command)

The _command_ property defines the callback to run when an item is activated by click or a key event.
```
<Menu :model="items" />
<Toast />
```
## Router [#](_menu_.md#router)

Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.
```
<Menu :model="items">
    <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
        </a>
    </template>
</Menu>
```
## Accessibility [#](_menu_.md#accessibility)

### Screen Reader

Menu component uses the _menu_ role and the value to describe the menu can either be provided with _aria-labelledby_ or _aria-label_ props. Each list item has a _menuitem_ role with _aria-label_ referring to the label of the item and _aria-disabled_ defined if the item is disabled.

In popup mode, the component implicitly manages the _aria-expanded_, _aria-haspopup_ and _aria-controls_ attributes of the target element to define the relation between the target and the popup.

### Keyboard Support

Key

Function

_tab_

Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence.

_shift_ + _tab_

Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence.

_enter_

Activates the focused menuitem. If menu is in overlay mode, popup gets closes and focus moves to target.

_space_

Activates the focused menuitem. If menu is in overlay mode, popup gets closes and focus moves to target.

_escape_

If menu is in overlay mode, popup gets closes and focus moves to target.

_down arrow_

Moves focus to the next menuitem.

_up arrow_

Moves focus to the previous menuitem.

_alt_ + _up arrow_

If menu is in overlay mode, popup gets closes and focus moves to the target.

_home_

Moves focus to the first menuitem.

_end_

Moves focus to the last menuitem.