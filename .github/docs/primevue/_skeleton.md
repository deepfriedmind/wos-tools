---
url: https://primevue.org/skeleton
scrapeDate: 2025-04-09T00:37:02.079Z
library: primevue

exactVersionMatch: false
---

## Skeleton

Skeleton is a placeholder to display instead of the actual content.

## Import [#](_skeleton_.md#import)
```
import Skeleton from 'primevue/skeleton';
```
## Shapes [#](_skeleton_.md#shapes)

Various shapes and sizes can be created using styling properties like _shape_, _width_, _height_, _borderRadius_ and _class_.

##### Rectangle

##### Rounded

##### Square

##### Circle
```
<h5>Rectangle</h5>
<Skeleton class="mb-2"></Skeleton>
<Skeleton width="10rem" class="mb-2"></Skeleton>
<Skeleton width="5rem" class="mb-2"></Skeleton>
<Skeleton height="2rem" class="mb-2"></Skeleton>
<Skeleton width="10rem" height="4rem"></Skeleton>
<h5>Rounded</h5>
<Skeleton class="mb-2" borderRadius="16px"></Skeleton>
<Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
<Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
<Skeleton height="2rem" class="mb-2" borderRadius="16px"></Skeleton>
<Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
<h5 class="mt-4">Square</h5>
<Skeleton size="2rem" class="mr-2"></Skeleton>
<Skeleton size="3rem" class="mr-2"></Skeleton>
<Skeleton size="4rem" class="mr-2"></Skeleton>
<Skeleton size="5rem"></Skeleton>
<h5 class="mt-4">Circle</h5>
<Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
<Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
<Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
<Skeleton shape="circle" size="5rem"></Skeleton>
```
## Card [#](_skeleton_.md#card)

Sample Card implementation using different Skeleton components and Tailwind CSS utilities.
```
<div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
    <div class="flex mb-4">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <div>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height=".5rem"></Skeleton>
        </div>
    </div>
    <Skeleton width="100%" height="150px"></Skeleton>
    <div class="flex justify-between mt-4">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
    </div>
</div>
```
## List [#](_skeleton_.md#list)

Sample List implementation using different Skeleton components and Tailwind CSS utilities.
```
<div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
    <ul class="m-0 p-0 list-none">
        <li class="mb-4">
            <div class="flex">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div class="self-center" style="flex: 1">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </li>
        <li class="mb-4">
            <div class="flex">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div class="self-center" style="flex: 1">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </li>
        <li class="mb-4">
            <div class="flex">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div class="self-center" style="flex: 1">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </li>
        <li>
            <div class="flex">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                <div class="self-center" style="flex: 1">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </li>
    </ul>
</div>
```
## DataTable [#](_skeleton_.md#datatable)

Sample DataTable implementation using different Skeleton components and Tailwind CSS utilities.
```
<DataTable :value="products">
    <Column field="code" header="Code">
        <template #body>
            <Skeleton></Skeleton>
        </template>
    </Column>
    <Column field="name" header="Name">
        <template #body>
            <Skeleton></Skeleton>
        </template>
    </Column>
    <Column field="category" header="Category">
        <template #body>
            <Skeleton></Skeleton>
        </template>
    </Column>
    <Column field="quantity" header="Quantity">
        <template #body>
            <Skeleton></Skeleton>
        </template>
    </Column>
</DataTable>
```
## Accessibility [#](_skeleton_.md#accessibility)

### Screen Reader

Skeleton uses _aria-hidden_ as "true" so that it gets ignored by screen readers, any valid attribute is passed to the root element so you may customize it further if required. If multiple skeletons are grouped inside a container, you may use _aria-busy_ on the container element as well to indicate the loading process.

### Keyboard Support

Component does not include any interactive elements.