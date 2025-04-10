---
url: https://primevue.org/megamenu
scrapeDate: 2025-04-09T00:36:51.049Z
library: primevue

exactVersionMatch: false
---

## MegaMenu

MegaMenu is a navigation component that displays submenus and content in columns.

## Import [#](_megamenu_.md#import)
```
import MegaMenu from 'primevue/megamenu';
```
## Basic [#](_megamenu_.md#basic)

MegaMenu requires a collection of menuitems as its _model_.
```
<MegaMenu :model="items" />
```
## Vertical [#](_megamenu_.md#Vertical)

Layout of the MegaMenu is configured with the _orientation_ property that accepts _horizontal_ and _vertical_ as options.
```
<MegaMenu :model="items" orientation="vertical" />
```
## Template [#](_megamenu_.md#template)

MegaMenu offers item customization with the _item_ template that receives the menuitem instance from the model as a parameter. Additional slots named _start_ and _end_ are provided to embed content before or after the menu.
```
<MegaMenu :model="items" class="p-4 bg-surface-0" style="border-radius: 3rem">
    <template #start>
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
            <path d="..." fill="var(--p-primary-color)" />
            <path d="..." fill="var(--p-text-color)" />
        </svg>
    </template>
    <template #item="{ item }">
        <a v-if="item.root" class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg uppercase" style="border-radius: 2rem">
            <span>{{ item.label }}</span>
        </a>
        <a v-else-if="!item.image" class="flex items-center p-4 cursor-pointer mb-2 gap-3">
            <span class="inline-flex items-center justify-center rounded-full bg-primary text-primary-contrast w-12 h-12">
                <i :class="[item.icon, 'text-lg']"></i>
            </span>
            <span class="inline-flex flex-col gap-1">
                <span class="font-bold text-lg">{{ item.label }}</span>
                <span class="whitespace-nowrap">{{ item.subtext }}</span>
            </span>
        </a>
        <div v-else class="flex flex-col items-start gap-4 p-2">
            <img alt="megamenu-demo" :src="item.image" class="w-full" />
            <span>{{ item.subtext }}</span>
            <Button :label="item.label" outlined />
        </div>
    </template>
    <template #end>
        <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
    </template>
</MegaMenu>
```
## Command [#](_megamenu_.md#command)

The _command_ property of a menuitem defines the callback to run when an item is activated by click or a key event.
```
{
    label: 'Log out',
    icon: 'pi pi-signout',
    command: () => {
        // Callback to run
    }
}
```
## Router [#](_megamenu_.md#router)

Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.
```
<MegaMenu :model="items">
    <template #item="{ item }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
            </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
        </a>
    </template>
</MegaMenu>
```
## Accessibility [#](_megamenu_.md#accessibility)

### Screen Reader

MegaMenu component uses the _menubar_ role along with _aria-orientation_ and the value to describe the component can either be provided with _aria-labelledby_ or _aria-label_ props. Each list item has a _menuitem_ role with _aria-label_ referring to the label of the item and _aria-disabled_ defined if the item is disabled. A submenu within a MegaMenu uses the _menu_ role with an _aria-labelledby_ defined as the id of the submenu root menuitem label. In addition, root menuitems that open a submenu have _aria-haspopup_ and _aria-expanded_ to define the relation between the item and the submenu.

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

_alt_ + _up arrow_

If focus is inside a popup menu, moves focus to the first element in the submenu otherwise closes the submenu and moves focus to the root item of the closed submenu in horizontal mode.

_right arrow_

If focus is on a root element, moves focus to the next menuitem. If the focus in inside a submenu, moves focus to the first menuitem of the next menu group.

_left arrow_

If focus is on a root element, moves focus to the previous menuitem. If the focus in inside a submenu, moves focus to the first menuitem of the previous menu group.

_home_

Moves focus to the first menuitem within the submenu.

_end_

Moves focus to the last menuitem within the submenu.

_any printable character_

Moves focus to the menuitem whose label starts with the characters being typed.