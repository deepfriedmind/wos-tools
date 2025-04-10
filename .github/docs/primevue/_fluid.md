---
url: https://primevue.org/fluid
scrapeDate: 2025-04-09T00:37:00.703Z
library: primevue

exactVersionMatch: false
---

## Fluid

Fluid is a layout component to make descendant components span full width of their container.

## Import [#](_fluid_.md#import)
```
import Fluid from 'primevue/fluid';
```
## Basic [#](_fluid_.md#basic)

Components with the _fluid_ option like _InputText_ have the ability to span the full width of their component. Enabling the _fluid_ for each component individually may be cumbersome so wrap the content with _Fluid_ to instead for an easier alternative.

Any component that has the _fluid_ property can be nested inside the _Fluid_ component. The _fluid_ property of a child component has higher precedence than the fluid container as shown in the last sample.
```
<div>
    <label for="non-fluid" class="font-bold mb-2 block">Non-Fluid</label>
    <InputText id="non-fluid" />
</div>
<div>
    <label for="fluid" class="font-bold mb-2 block">Fluid Prop</label>
    <InputText id="non-fluid" fluid />
</div>
<Fluid>
    <span class="font-bold mb-2 block">Fluid Container</span>
    <div class="grid grid-cols-2 gap-4">
        <div><InputText /></div>
        <div><InputText /></div>
        <div class="col-span-full"><InputText /></div>
        <div><InputText :fluid="false" placeholder="Non-Fluid" /></div>
    </div>
</Fluid>
```
## Accessibility [#](_fluid_.md#accessibility)

### Screen Reader

Fluid does not require any roles and attributes.

### Keyboard Support

Component does not include any interactive elements.