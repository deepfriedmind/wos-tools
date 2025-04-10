---
url: https://primevue.org/toolbar
scrapeDate: 2025-04-09T00:36:51.176Z
library: primevue

exactVersionMatch: false
---

## Toolbar

Toolbar is a grouping component for buttons and other content.

## Import [#](_toolbar_.md#import)
```
import Toolbar from 'primevue/toolbar';
```
## Basic [#](_toolbar_.md#basic)

Toolbar provides _start_, _center_ and _end_ properties to place content at these sections.
```
<Toolbar>
    <template #start>
        <Button icon="pi pi-plus" class="mr-2" severity="secondary" text />
        <Button icon="pi pi-print" class="mr-2" severity="secondary" text />
        <Button icon="pi pi-upload" severity="secondary" text />
    </template>
    <template #center>
        <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText placeholder="Search" />
        </IconField>
    </template>
    <template #end> <SplitButton label="Save" :model="items"></SplitButton></template>
</Toolbar>
```
## Custom [#](_toolbar_.md#custom)

A customized toolbar with navigation bar functionality.
```
<Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
    <template #start>
        <div class="flex items-center gap-2">
            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="..." fill="var(--p-text-color)" />
                <path d="..." fill="transparent" />
            </svg>
            <Button label="Files" text plain />
            <Button label="Edit" text plain />
            <Button label="View" text plain />
        </div>
    </template>
    <template #end>
        <div class="flex items-center gap-2">
            <Button label="Share" severity="contrast" size="small" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
        </div>
    </template>
</Toolbar>
```
## Accessibility [#](_toolbar_.md#accessibility)

### Screen Reader

Toolbar uses _toolbar_ role to the root element, _aria-orientation_ is not included as it defaults to "horizontal". Any valid attribute is passed to the root element so you may add additional properties like _aria-labelledby_ to define the element if required.

### Keyboard Support

Component does not include any interactive elements. Arbitrary content can be placed with templating and elements like buttons inside should follow the page tab sequence.