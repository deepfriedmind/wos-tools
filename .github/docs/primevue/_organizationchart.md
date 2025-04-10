---
url: https://primevue.org/organizationchart
scrapeDate: 2025-04-09T00:36:39.703Z
library: primevue

exactVersionMatch: false
---

## OrganizationChart

OrganizationChart visualizes hierarchical organization data.

## Import [#](_organizationchart_.md#import)
```
import OrganizationChart from 'primevue/organizationchart';
```
## Basic [#](_organizationchart_.md#basic)

OrganizationChart requires a collection of _TreeNode_ instances as a _value_.
```
<OrganizationChart :value="data">
    <template #default="slotProps">
        <span>{{ slotProps.node.label }}</span>
    </template>
</OrganizationChart>
```
## Template [#](_organizationchart_.md#template)

The _type_ property of an OrganizationChartNode is used to map a template to a node. If it is undefined, the default template is used.

![Argentina](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)

Argentina

 

 

 

 

![Argentina](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)

Argentina

 

 

 

 

![Argentina](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)

Argentina

![Croatia](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)

Croatia
```
<OrganizationChart :value="data" collapsible>
    <template #country="slotProps">
        <div class="flex flex-col items-center">
            <img :alt="slotProps.node.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`w-2rem flag flag-${slotProps.node.data}`" />
            <div class="mt-4 font-medium text-lg">{{ slotProps.node.label }}</div>
        </div>
    </template>
    <template #default="slotProps">
        <span>{{slotProps.node.data.label}}</span>
    </template>
</OrganizationChart>
```
## Selection [#](_organizationchart_.md#selection)

Selection is enabled by defining the _selectionMode_ to either "single" or "multiple" and specifying the _selectionKeys_ with the v-model directive. Note that selection on a particular node can be disabled if the _selectable_ is false on the node instance.

![Amy Elsner](https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png)Amy ElsnerCEO

 

 

 

 

![Anna Fali](https://primefaces.org/cdn/primevue/images/avatar/annafali.png)Anna FaliCMO

 

 

 

 

![Stephen Shaw](https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png)Stephen ShawCTO

 

 

 

 
```
<OrganizationChart v-model:selectionKeys="selection" :value="data" collapsible selectionMode="multiple">
    <template #person="slotProps">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <img :alt="slotProps.node.data.name" :src="slotProps.node.data.image" class="mb-4 w-12 h-12" />
                <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
                <span>{{ slotProps.node.data.title }}</span>
            </div>
        </div>
    </template>
    <template #default="slotProps">
        <span>{{ slotProps.node.label }}</span>
    </template>
</OrganizationChart>
```
## Colored [#](_organizationchart_.md#colored)

Styling a specific node is configured with _styleClass_ and _style_ options of a TreeNode.

![Amy Elsner](https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png)Amy ElsnerCEO

 

 

 

 

![Anna Fali](https://primefaces.org/cdn/primevue/images/avatar/annafali.png)Anna FaliCMO

 

 

 

 

![Stephen Shaw](https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png)Stephen ShawCTO

 

 

 

 
```
<OrganizationChart :value="data" collapsible>
    <template #person="slotProps">
        <div class="flex flex-col">
            <div class="flex flex-col items-center">
                <img :alt="slotProps.node.data.name" :src="slotProps.node.data.image" class="mb-4 w-12 h-12" />
                <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
                <span>{{ slotProps.node.data.title }}</span>
            </div>
        </div>
    </template>
    <template #default="slotProps">
        <span>{{ slotProps.node.label }}</span>
    </template>
</OrganizationChart>
```
## Accessibility [#](_organizationchart_.md#accessibility)

### Screen Reader

Component currently uses a table based implementation and does not provide high level of screen reader support, a nested list implementation replacement is planned with aria roles and attributes aligned to a tree widget for high level of reader support in the upcoming versions.

### Keyboard Support

Key

Function

_tab_

Moves focus through the focusable elements within the chart.

_enter_

Toggles the expanded state of a node.

_space_

Toggles the expanded state of a node.