---
url: https://primevue.org/iftalabel
scrapeDate: 2025-04-09T00:36:30.815Z
library: primevue

exactVersionMatch: false
---

## IftaLabel

IftaLabel is used to create infield top aligned labels

## Import [#](_iftalabel_.md#import)
```
import IftaLabel from 'primevue/iftalabel';
```
## Basic [#](_iftalabel_.md#basic)

IftaLabel is used by wrapping the input and its label.

Username
```
<IftaLabel>
    <InputText id="username" v-model="value" />
    <label for="username">Username</label>
</IftaLabel>
```
## Invalid [#](_iftalabel_.md#invalid)

When the form element is invalid, the label is also highlighted.

Username
```
<IftaLabel>
    <InputText id="username" v-model="value" :invalid="!value" />
    <label for="username">Username</label>
</IftaLabel>
```
## Accessibility [#](_iftalabel_.md#accessibility)

### Screen Reader

IftaLabel does not require any roles and attributes.

### Keyboard Support

Component does not include any interactive elements.