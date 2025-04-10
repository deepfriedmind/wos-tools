---
url: https://primevue.org/contextmenu
scrapeDate: 2025-04-09T00:36:51.471Z
library: primevue

exactVersionMatch: false
---

## ContextMenu

ContextMenu displays an overlay menu to display actions related to an element.

## Import [#](_contextmenu_.md#import)
```
import ContextMenu from 'primevue/contextmenu';
```
## Basic [#](_contextmenu_.md#basic)

ContextMenu requires a collection of menuitems as its _model_ and the _show_ method needs to be called explicity using an event of the target like _contextmenu_ to display the menu.

![Logo](https://primefaces.org/cdn/primevue/images/nature/nature2.jpg)
```
<img alt="Logo" src="/images/nature/nature2.jpg" class="w-full md:w-[30rem] rounded shadow-lg" @contextmenu="onImageRightClick" aria-haspopup="true" />
<ContextMenu ref="menu" :model="items" />
```
## Document [#](_contextmenu_.md#document)

Setting global property attaches the context menu to the document.

Right-Click anywhere on this page to view the global ContextMenu.
```
<ContextMenu global :model="items" />
```
## Template [#](_contextmenu_.md#template)

ContextMenu offers item customization with the _item_ template that receives the menuitem instance from the model as a parameter.
```
<ul class="m-0 p-0 list-none border border-surface-200 dark:border-surface-700 rounded p-4 flex flex-col gap-2 w-full md:w-[30rem]">
    <li
        v-for="product in products"
        :key="product.id"
        :class="['p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded border border-transparent transition-all transition-duration-200', { 'border-primary': selectedId === product.id }]"
        @contextmenu="onRightClick($event, product.id)"
    >
        <div class="flex flex-wrap p-2 items-center gap-4">
            <img class="w-16 shrink-0 rounded" :src="'/images/product/' + product.image" :alt="product.name" />
            <div class="flex-1 flex flex-col gap-1">
                <span class="font-bold">{{ product.name }}</span>
                <div class="flex items-center gap-2">
                    <i class="pi pi-tag text-sm"></i>
                    <span>{{ product.category }}</span>
                </div>
            </div>
            <span class="font-bold ml-8">${{ product.price }}</span>
        </div>
    </li>
</ul>
<ContextMenu ref="menu" :model="items" @hide="selectedId = null">
    <template #item="{ item, props }">
        <a v-ripple class="flex items-center" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="item.items" class="pi pi-angle-right ml-auto"></i>
        </a>
    </template>
</ContextMenu>
```
## Command [#](_contextmenu_.md#command)

The _command_ property defines the callback to run when an item is activated by click or a key event.
*   ![Amy Elsner](https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png)Amy Elsner
    
    Admin
*   ![Anna Fali](https://primefaces.org/cdn/primevue/images/avatar/annafali.png)Anna Fali
    
    Member
*   ![Asiya Javayant](https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png)Asiya Javayant
    
    Member
*   ![Bernardo Dominic](https://primefaces.org/cdn/primevue/images/avatar/bernardodominic.png)Bernardo Dominic
    
    Guest
*   ![Elwin Sharvill](https://primefaces.org/cdn/primevue/images/avatar/elwinsharvill.png)Elwin Sharvill
    
    Member
```
<ul class="m-0 list-none border border-surface rounded p-4 flex flex-col gap-2 w-full sm:w-96">
    <li
        v-for="user in users"
        :key="user.id"
        :class="['p-2 hover:bg-emphasis rounded border border-transparent transition-all duration-200 flex items-center justify-content-between', { 'border-primary': selectedUser?.id === user.id }]"
        @contextmenu="onRightClick($event, user)"
    >
        <div class="flex flex-1 items-center gap-2">
            <img :alt="user.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${user.image}`" class="w-8 h-8" />
            <span class="font-bold">{{ user.name }}</span>
        </div>
        <Tag :value="user.role" :severity="getBadge(user)" />
    </li>
</ul>
<ContextMenu ref="menu" :model="items" @hide="selectedUser = null" />
<Toast />
```
## Router [#](_contextmenu_.md#router)

Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.
```
<span class="inline-flex items-center justify-center border-2 border-primary rounded w-16 h-16" @contextmenu="onRightClick" aria-haspopup="true">
    <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="..." fill="var(--p-primary-color)" />
        <path d="..." fill="var(--p-text-color)" />
    </svg>
</span>
<ContextMenu ref="routemenu" :model="items">
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
</ContextMenu>
```
## DataTable [#](_contextmenu_.md#datatable)

DataTable has built-in support for ContextMenu, see the [ContextMenu](_datatable_.md#contextmenu) demo for an example.

## Accessibility [#](_contextmenu_.md#accessibility)

### Screen Reader

ContextMenu component uses the _menubar_ role with _aria-orientation_ set to "vertical" and the value to describe the menu can either be provided with _aria-labelledby_ or _aria-label_ props. Each list item has a _menuitem_ role with _aria-label_ referring to the label of the item and _aria-disabled_ defined if the item is disabled. A submenu within a ContextMenu uses the _menu_ role with an _aria-labelledby_ defined as the id of the submenu root menuitem label. In addition, menuitems that open a submenu have _aria-haspopup_ and _aria-expanded_ to define the relation between the item and the submenu.

### Keyboard Support

Key

Function

_tab_

When focus is in the menu, closes the context menu and moves focus to the next focusable element in the page sequence.

_enter_

If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays.

_space_

If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays.

_escape_

Closes the context menu.

_down arrow_

If focus is not inside the menu and menu is open, add focus to the first item. If an item is already focused, moves focus to the next menuitem within the submenu.

_up arrow_

If focus is not inside the menu and menu is open, add focus to the last item. If an item is already focused, moves focus to the next menuitem within the submenu.

_right arrow_

Opens a submenu if there is one available and moves focus to the first item.

_left arrow_

Closes a submenu and moves focus to the root item of the closed submenu.

_home_

Moves focus to the first menuitem within the submenu.

_end_

Moves focus to the last menuitem within the submenu.

_any printable character_

Moves focus to the menuitem whose label starts with the characters being typed.