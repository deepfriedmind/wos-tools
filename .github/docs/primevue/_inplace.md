---
url: https://primevue.org/inplace
scrapeDate: 2025-04-09T00:37:00.233Z
library: primevue

exactVersionMatch: false
---

## Inplace

Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.

## Import [#](_inplace_.md#import)
```
import Inplace from 'primevue/inplace';
```
## Basic [#](_inplace_.md#basic)

_Inplace_ component requires _display_ and _content_ templates to define the content of each state.
```
<Inplace>
    <template #display> View Content </template>
    <template #content>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </template>
</Inplace>
```
## Input [#](_inplace_.md#input)

The _closeCallback_ switches the state back to display mode when called from an event.
```
<Inplace>
    <template #display>
        {{ text || 'Click to Edit' }}
    </template>
    <template #content="{ closeCallback }">
        <span class="inline-flex items-center gap-2">
            <InputText v-model="text" autofocus />
            <Button icon="pi pi-times" text severity="danger" @click="closeCallback" />
        </span>
    </template>
</Inplace>
```
## Image [#](_inplace_.md#image)

Any content such as an image can be placed inside an Inplace.
```
<Inplace>
    <template #display>
        <span class="inline-flex items-center gap-2">
            <span class="pi pi-image"></span>
            <span>View Photo</span>
        </span>
    </template>
    <template #content>
        <img class="w-full sm:w-80 shadow-md" alt="Nature" src="https://primefaces.org/cdn/primevue/images/nature/nature8.jpg" />
    </template>
</Inplace>
```
## Lazy [#](_inplace_.md#lazy)

The _open_ event is used to initialize the content such as loading data in a lazy manner.
```
<Inplace @open="loadData">
    <template #display> View Data </template>
    <template #content>
        <DataTable :value="products">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </template>
</Inplace>
```
## Accessibility [#](_inplace_.md#accessibility)

### Screen Reader

Inplace component defines _aria-live_ as "polite" by default, since any valid attribute is passed to the main container aria roles and attributes of the root element can be customized easily.

### View Mode Keyboard Support

Key

Function

_enter_

Switches to content.