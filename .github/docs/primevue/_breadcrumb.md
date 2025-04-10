---
url: https://primevue.org/breadcrumb
scrapeDate: 2025-04-09T00:36:52.208Z
library: primevue

exactVersionMatch: false
---

## Breadcrumb

Breadcrumb provides contextual information about page hierarchy.

## Import [#](_breadcrumb_.md#import)
```
import Breadcrumb from 'primevue/breadcrumb';
```
## Basic [#](_breadcrumb_.md#basic)

Breadcrumb requires a collection of menuitems as its _model_, the root item is defined with the _home_ property.

1.  [](_breadcrumb.md)

3.  [Electronics](_breadcrumb.md)

5.  [Computer](_breadcrumb.md)

7.  [Accessories](_breadcrumb.md)

9.  [Keyboard](_breadcrumb.md)

11.  [Wireless](_breadcrumb.md)
```
<Breadcrumb :home="home" :model="items" />
```
## Template [#](_breadcrumb_.md#template)

Custom content can be placed inside the items using the _item_ template. The divider between the items has its own _separator_ template.

1.  
2.  /
3.  
4.  /
5.  
6.  /
7.  
8.  /
9.  
10.  /
11.  
```
<Breadcrumb :home="home" :model="items">
    <template #item="{ item }">
        <a class="cursor-pointer" :href="item.url">
            <span :class="item.icon"></span>
        </a>
    </template>
    <template #separator> / </template>
</Breadcrumb>
```
## Router [#](_breadcrumb_.md#router)

Items with navigation are defined with templating to be able to use a router link component, an external link or programmatic navigation.

1.  [](_introduction.md)

3.  Components

5.  Form

7.  [InputText](_inputtext.md)
```
<Breadcrumb :home="home" :model="items">
    <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="[item.icon, 'text-color']" />
                <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
        </a>
    </template>
</Breadcrumb>
```
## Accessibility [#](_breadcrumb_.md#accessibility)

### Screen Reader

Breadcrumb uses the _nav_ element and since any attribute is passed to the root implicitly _aria-labelledby_ or _aria-label_ can be used to describe the component. Inside an ordered list is used where the list item separators have _aria-hidden_ to be able to ignored by the screen readers. If the last link represents the current route, _aria-current_ is added with "page" as the value.

### Keyboard Support

No special keyboard interaction is needed, all menuitems are focusable based on the page tab sequence.