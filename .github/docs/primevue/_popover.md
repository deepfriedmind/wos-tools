---
url: https://primevue.org/popover
scrapeDate: 2025-04-09T00:36:51.541Z
library: primevue

exactVersionMatch: false
---

## Popover

Popover is a container component that can overlay other components on page.

## Import [#](_popover_.md#import)
```
import Popover from 'primevue/popover';
```
## Basic [#](_popover_.md#basic)

Popover is accessed via its ref and visibility is controlled using _toggle_, _show_ and _hide_ functions with an event of the target.
```
<Button type="button" icon="pi pi-share-alt" label="Share" @click="toggle" />
<Popover ref="op">
    <div class="flex flex-col gap-4 w-[25rem]">
        <div>
            <span class="font-medium block mb-2">Share this document</span>
            <InputGroup>
                <InputText value="https://primevue.org/12323ff26t2g243g423g234gg52hy25XADXAG3" readonly class="w-[25rem]"></InputText>
                <InputGroupAddon>
                    <i class="pi pi-copy"></i>
                </InputGroupAddon>
            </InputGroup>
        </div>
        <div>
            <span class="font-medium block mb-2">Invite Member</span>
            <InputGroup>
                <InputText disabled />
                <Button label="Invite" icon="pi pi-users"></Button>
            </InputGroup>
        </div>
        <div>
            <span class="font-medium block mb-2">Team Members</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-4">
                <li v-for="member in members" :key="member.name" class="flex items-center gap-2">
                    <img :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`" style="width: 32px" />
                    <div>
                        <span class="font-medium">{{ member.name }}</span>
                        <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div>
                    </div>
                    <div class="flex items-center gap-2 text-surface-500 dark:text-surface-400 ml-auto text-sm">
                        <span>{{ member.role }}</span>
                        <i class="pi pi-angle-down"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</Popover>
```
## Select Data [#](_popover_.md#selectdata)

In this sample, data is retrieved from the content inside the popover.
```
<Button type="button" :label="selectedMember ? selectedMember.name : 'Select Member'" @click="toggle" class="min-w-48" />
<Popover ref="op">
    <div class="flex flex-col gap-4">
        <div>
            <span class="font-medium block mb-2">Team Members</span>
            <ul class="list-none p-0 m-0 flex flex-col">
                <li v-for="member in members" :key="member.name" class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" @click="selectMember(member)">
                    <img :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`" style="width: 32px" />
                    <div>
                        <span class="font-medium">{{ member.name }}</span>
                        <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</Popover>
```
## DataTable [#](_popover_.md#datatable)

Place the Popover outside of the data iteration components to avoid rendering it multiple times.

Id

Code

Name

Price

Image

Details
```
<DataTable :value="products" :rows="5" paginator tableStyle="min-width: 50rem">
    <Column field="id" header="Id" class="w-1/6"></Column>
    <Column field="code" header="Code" class="w-1/6"></Column>
    <Column field="name" header="Name" class="w-1/6" bodyClass="whitespace-nowrap"></Column>
    <Column field="price" header="Price" sortable class="w-1/6">
        <template #body="slotProps"> $ {{ slotProps.data.price }} </template>
    </Column>
    <Column header="Image" class="w-1/6">
        <template #body="slotProps">
            <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="w-16 shadow-sm" />
        </template>
    </Column>
    <Column header="Details" class="w-1/6">
        <template #body="slotProps">
            <Button type="button" @click="displayProduct($event, slotProps.data)" icon="pi pi-search" severity="secondary" rounded></Button>
        </template>
    </Column>
</DataTable>
<Popover ref="op">
    <div v-if="selectedProduct" class="rounded flex flex-col">
        <div class="flex justify-center rounded">
            <div class="relative mx-auto">
                <img class="rounded w-44 sm:w-64" :src="`https://primefaces.org/cdn/primevue/images/product/${selectedProduct.image}`" :alt="selectedProduct.name" />
                <Tag :value="selectedProduct.inventoryStatus" :severity="getSeverity(selectedProduct)" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
            </div>
        </div>
        <div class="pt-4">
            <div class="flex flex-row justify-between items-start gap-2 mb-4">
                <div>
                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ selectedProduct.category }}</span>
                    <div class="text-lg font-medium mt-1">{{ selectedProduct.name }}</div>
                </div>
                <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                        <span class="text-surface-900 font-medium text-sm">{{ selectedProduct.rating }}</span>
                        <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <Button icon="pi pi-shopping-cart" :label="`Buy Now | \$${selectedProduct.price}`" :disabled="selectedProduct.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto whitespace-nowrap" @click="hidePopover"></Button>
                <Button icon="pi pi-heart" outlined @click="hidePopover"></Button>
            </div>
        </div>
    </div>
</Popover>
```
## Accessibility [#](_popover_.md#accessibility)

### Screen Reader

Popover component uses _dialog_ role and since any attribute is passed to the root element you may define attributes like _aria-label_ or _aria-labelledby_ to describe the popup contents. In addition _aria-modal_ is added since focus is kept within the popup.

Popover adds _aria-expanded_ state attribute and _aria-controls_ to the trigger so that the relation between the trigger and the popup is defined.

### Popover Keyboard Support

When the popup gets opened, the first focusable element receives the focus and this can be customized by adding _autofocus_ to an element within the popup.

Key

Function

_tab_

Moves focus to the next the focusable element within the popup.

_shift_ + _tab_

Moves focus to the previous the focusable element within the popup.

_escape_

Closes the popup and moves focus to the trigger.