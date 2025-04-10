---
url: https://primevue.org/dataview
scrapeDate: 2025-04-09T00:36:40.612Z
library: primevue

exactVersionMatch: false
---

## DataView

DataView displays data in grid or list layout with pagination and sorting features.

## Import [#](_dataview_.md#import)
```
import DataView from 'primevue/dataview';
```
## Basic [#](_dataview_.md#basic)

DataView requires a _value_ to display along with a _list_ slot for item content.
```
<DataView :value="products">
    <template #list="slotProps">
        <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                    <div class="md:w-40 relative">
                        <img class="block xl:block mx-auto rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                        <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                            <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                            <div>
                                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                    <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold">${{ item.price }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <Button icon="pi pi-heart" outlined></Button>
                                <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</DataView>
```
## Pagination [#](_dataview_.md#pagination)

Pagination is enabled with the _paginator_ and _rows_ properties. Refer to the [Paginator](_paginator_.md) for more information about customizing the paginator.
```
<DataView :value="products" paginator :rows="5">
    <template #list="slotProps">
        <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                    <div class="md:w-40 relative">
                        <img class="block xl:block mx-auto rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                        <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                            <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                            <div>
                                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                    <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold">${{ item.price }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <Button icon="pi pi-heart" outlined></Button>
                                <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</DataView>
```
## Sorting [#](_dataview_.md#sorting)

Built-in sorting is controlled by bindings _sortField_ and _sortField_ properties from a custom UI.
```
<DataView :value="products" :sortOrder="sortOrder" :sortField="sortField">
    <template #header>
        <Select v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)" />
    </template>
    <template #list="slotProps">
        <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                    <div class="md:w-40 relative">
                        <img class="block xl:block mx-auto rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                        <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                            <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                            <div>
                                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                    <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold">${{ item.price }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <Button icon="pi pi-heart" outlined></Button>
                                <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</DataView>
```
## Layout [#](_dataview_.md#layout)

DataView supports _list_ and _grid_ display modes defined with the _layout_ property. The _grid_ mode is not built-in for flexibility purposes and requires a library with CSS grid features like Tailwind.
```
<DataView :value="products" :layout="layout">
    <template #header>
        <div class="flex justify-end">
            <SelectButton v-model="layout" :options="options" :allowEmpty="false">
                <template #option="{ option }">
                    <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                </template>
            </SelectButton>
        </div>
    </template>
    <template #list="slotProps">
        <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                    <div class="md:w-40 relative">
                        <img class="block xl:block mx-auto rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                        <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                            <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                            <div>
                                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                    <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold">${{ item.price }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <Button icon="pi pi-heart" outlined></Button>
                                <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template #grid="slotProps">
        <div class="grid grid-cols-12 gap-4">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                    <div class="bg-surface-50 flex justify-center rounded p-4">
                        <div class="relative mx-auto">
                            <img class="rounded w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" style="max-width: 300px"/>
                            <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                                <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>
                            </div>
                        </div>
                    </div>
                    <div class="pt-6">
                        <div class="flex flex-row justify-between items-start gap-2">
                            <div>
                                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                            </div>
                            <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                    <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-6 mt-6">
                            <span class="text-2xl font-semibold">${{ item.price }}</span>
                            <div class="flex gap-2">
                                <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto whitespace-nowrap"></Button>
                                <Button icon="pi pi-heart" outlined></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</DataView>
```
## Loading [#](_dataview_.md#loading)

While data is being loaded, [Skeleton](_skeleton_.md) component may be used to indicate the busy state.
```
<DataView :value="products" :layout="layout">
    <template #header>
        <div class="flex justify-end">
            <SelectButton v-model="layout" :options="options" :allowEmpty="false">
                <template #option="{ option }">
                    <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                </template>
            </SelectButton>
        </div>
    </template>
    <template #list>
        <div class="flex flex-col">
            <div v-for="i in 6" :key="i">
                <div class="flex flex-col xl:flex-row xl:items-start p-6 gap-6" :class="{ 'border-t border-surface-200 dark:border-surface-700': i !== 0 }">
                    <Skeleton class="!w-9/12 sm:!w-64 xl:!w-40 !h-24 mx-auto" />
                    <div class="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                        <div class="flex flex-col items-center sm:items-start gap-4">
                            <Skeleton width="8rem" height="2rem" />
                            <Skeleton width="6rem" height="1rem" />
                            <div class="flex items-center gap-4">
                                <Skeleton width="6rem" height="1rem" />
                                <Skeleton width="3rem" height="1rem" />
                            </div>
                        </div>
                        <div class="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                            <Skeleton width="4rem" height="2rem" />
                            <Skeleton size="3rem" shape="circle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template #grid>
        <div class="grid grid-cols-12 gap-4">
            <div v-for="i in 6" :key="i" class="col-span-12 sm:col-span-6 xl:col-span-4 p-2">
                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <Skeleton width="6rem" height="2rem" />
                        <Skeleton width="3rem" height="1rem" />
                    </div>
                    <div class="flex flex-col items-center gap-4 py-8">
                        <Skeleton width="75%" height="10rem" />
                        <Skeleton width="8rem" height="2rem" />
                        <Skeleton width="6rem" height="1rem" />
                    </div>
                    <div class="flex items-center justify-between">
                        <Skeleton width="4rem" height="2rem" />
                        <Skeleton width="6rem" height="1rem" shape="circle" size="3rem" />
                    </div>
                </div>
            </div>
        </div>
    </template>
</DataView>
```
## Accessibility [#](_dataview_.md#accessibility)

### Screen Reader

The container element that wraps the layout options buttons has a _group_ role whereas each button element uses _button_ role and _aria-pressed_ is updated depending on selection state. Values to describe the buttons are derived from the _aria.listView_ and _aria.gridView_ properties of the [locale](_configuration_.md#locale) API respectively.

Refer to [paginator](_paginator_.md) accessibility documentation for the paginator of the component.

### Keyboard Support

Key

Function

_tab_

Moves focus to the buttons.

_space_

Toggles the checked state of a button.