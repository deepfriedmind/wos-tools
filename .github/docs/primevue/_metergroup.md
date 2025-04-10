---
url: https://primevue.org/metergroup
scrapeDate: 2025-04-09T00:37:00.128Z
library: primevue

exactVersionMatch: false
---

## MeterGroup

MeterGroup displays scalar measurements within a known range.

## Import [#](_metergroup_.md#import)
```
import MeterGroup from 'primevue/metergroup';
```
## Basic [#](_metergroup_.md#basic)

MeterGroup requires a _value_ as the data to display where each item in the collection should be a type of _MeterItem_.

1.  Space used (15%)
```
<MeterGroup :value="value" />
```
## Multiple [#](_metergroup_.md#multiple)

Adding more items to the array displays the meters in a group.

1.  Apps (16%)
2.  Messages (8%)
3.  Media (24%)
4.  System (10%)
```
<MeterGroup :value="value" />
```
## Icon [#](_metergroup_.md#icon)

Icons can be displayed next to the labels instead of the default marker.

1.  Apps (16%)
2.  Messages (8%)
3.  Media (24%)
4.  System (10%)
```
<MeterGroup :value="value" />
```
## Label [#](_metergroup_.md#label)

The position of the labels relative to the meters is defined using the _labelPosition_ property. The default orientation of the labels is horizontal, and the vertical alternative is available through the _labelOrientation_ option.

1.  Apps (16%)
2.  Messages (8%)
3.  Media (24%)
4.  System (10%)
```
<MeterGroup :value="value" labelPosition="start" labelOrientation="vertical" />
```
## Vertical [#](_metergroup_.md#vertical)

Layout of the MeterGroup is configured with the _orientation_ property that accepts either _horizontal_ or _vertical_ as available options.

1.  Apps (24%)
2.  Messages (16%)
3.  Media (24%)
4.  System (12%)
```
<MeterGroup :value="value" orientation="vertical" labelOrientation="vertical" />
```
## Min-Max [#](_metergroup_.md#minmax)

Boundaries are configured with the _min_ and _max_ values whose defaults are 0 and 100 respectively.

1.  Apps (8%)
2.  Messages (4%)
3.  Media (12%)
4.  System (5%)
```
<MeterGroup :value="value" :max="200"  />
```
## Template [#](_metergroup_.md#template)

MeterGroup provides templating support for labels, meter items, and content around the meters.
```
<MeterGroup :value="value" labelPosition="start">
    <template #label="{ value }">
        <div class="flex flex-wrap gap-4">
            <template v-for="val of value" :key="val.label">
                <Card class="flex-1 border border-surface shadow-none">
                    <template #content>
                        <div class="flex justify-between gap-8">
                            <div class="flex flex-col gap-1">
                                <span class="text-surface-500 dark:text-surface-400 text-sm">{{ val.label }}</span>
                                <span class="font-bold text-lg">{{ val.value }}%</span>
                            </div>
                            <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" :style="{ backgroundColor: `${val.color1}`, color: '#ffffff' }">
                                <i :class="val.icon" />
                            </span>
                        </div>
                    </template>
                </Card>
            </template>
        </div>
    </template>
    <template #meter="slotProps">
        <span :class="slotProps.class" :style="{ background: `linear-gradient(to right, ${slotProps.value.color1}, ${slotProps.value.color2})`, width: slotProps.size }" />
    </template>
    <template #start="{ totalPercent }">
        <div class="flex justify-between mt-4 mb-2 relative">
            <span>Storage</span>
            <span :style="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
            <span class="font-medium">1TB</span>
        </div>
    </template>
    <template #end>
        <div class="flex justify-between mt-4">
            <Button label="Manage Storage" outlined size="small" />
            <Button label="Update Plan" size="small" />
        </div>
    </template>
</MeterGroup>
```
## Accessibility [#](_metergroup_.md#accessibility)

### Screen Reader

MeterGroup component uses _meter_ role in addition to the _aria-valuemin_, _aria-valuemax_ and _aria-valuenow_ attributes. Value to describe the component can be defined using _aria-labelledby_ prop.

### Keyboard Support

Component does not include any interactive elements.