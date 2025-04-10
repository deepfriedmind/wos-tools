---
url: https://primevue.org/timeline
scrapeDate: 2025-04-09T00:36:40.694Z
library: primevue

exactVersionMatch: false
---

## Timeline

Timeline visualizes a series of chained events.

## Import [#](_timeline_.md#import)
```
import Timeline from 'primevue/timeline';
```
## Basic [#](_timeline_.md#basic)

Timeline requires a _value_ for the collection of events and _content_ slot that receives an object as a parameter to return content.
```
<Timeline :value="events">
    <template #content="slotProps">
        {{ slotProps.item.status }}
    </template>
</Timeline>
```
## Alignment [#](_timeline_.md#alignment)

Content location relative the line is defined with the _align_ property.
```
<Timeline :value="events" class="w-full md:w-80">
    <template #content="slotProps">
        {{ slotProps.item.status }}
    </template>
</Timeline>
<Timeline :value="events" align="right" class="w-full md:w-80">
    <template #content="slotProps">
        {{ slotProps.item.status }}
    </template>
</Timeline>
<Timeline :value="events" align="alternate" class="w-full md:w-80">
    <template #content="slotProps">
        {{ slotProps.item.status }}
    </template>
</Timeline>
```
## Opposite [#](_timeline_.md#opposite)

Additional content at the other side of the line can be provided with the _opposite_ property.

15/10/2020 14:00

Processing

16/10/2020 10:00

Delivered
```
<Timeline :value="events">
    <template #opposite="slotProps">
        <small class="text-surface-500 dark:text-surface-400">{{slotProps.item.date}}</small>
    </template>
    <template #content="slotProps">
        {{slotProps.item.status}}
    </template>
</Timeline>
```
## Template [#](_timeline_.md#template)

Sample implementation with custom content and styled markers.

![](https://primefaces.org/cdn/primevue/images/product/game-controller.jpg)

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!

Processing

15/10/2020 14:00

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!

Delivered

16/10/2020 10:00

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
```
<Timeline :value="events" align="alternate" class="customized-timeline">
    <template #marker="slotProps">
        <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" :style="{ backgroundColor: slotProps.item.color }">
            <i :class="slotProps.item.icon"></i>
        </span>
    </template>
    <template #content="slotProps">
        <Card class="mt-4">
            <template #title>
                {{ slotProps.item.status }}
            </template>
            <template #subtitle>
                {{ slotProps.item.date }}
            </template>
            <template #content>
                <img v-if="slotProps.item.image" :src="`/images/product/${slotProps.item.image}`" :alt="slotProps.item.name" width="200" class="shadow-sm" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!
                </p>
                <Button label="Read more" text></Button>
            </template>
        </Card>
    </template>
</Timeline>
```
## Horizontal [#](_timeline_.md#horizontal)

TimeLine orientation is controlled with the _layout_ property, default is _vertical_ having _horizontal_ as the alternative.
```
<Timeline :value="events" layout="horizontal" align="top">
    <template #content="slotProps">
        {{ slotProps.item }}
    </template>
</Timeline>
<Timeline :value="events" layout="horizontal" align="bottom">
    <template #content="slotProps">
        {{ slotProps.item }}
    </template>
</Timeline>
<Timeline :value="events" layout="horizontal" align="alternate">
    <template #opposite> &nbsp; </template>
    <template #content="slotProps">
        {{ slotProps.item }}
    </template>
</Timeline>
```
## Accessibility [#](_timeline_.md#accessibility)

### Screen Reader

Timeline uses a semantic ordered list element to list the events. No specific role is enforced, still you may use any aria role and attributes as any valid attribute is passed to the list element.

### Keyboard Support

Component does not include any interactive elements.