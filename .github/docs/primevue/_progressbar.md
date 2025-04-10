---
url: https://primevue.org/progressbar
scrapeDate: 2025-04-09T00:37:00.513Z
library: primevue

exactVersionMatch: false
---

## ProgressBar

ProgressBar is a process status indicator.

## Import [#](_progressbar_.md#import)
```
import ProgressBar from 'primevue/progressbar';
```
## Basic [#](_progressbar_.md#basic)

ProgressBar is used with the _value_ property.
```
<ProgressBar :value="50"></ProgressBar>
```
## Dynamic [#](_progressbar_.md#dynamic)

Value is reactive so updating it dynamically changes the bar as well.
```
<ProgressBar :value="value"></ProgressBar>
```
## Template [#](_progressbar_.md#template)

Custom content inside the ProgressBar is defined with the _default_ slot.
```
<ProgressBar :value="40"> {{ value }}/100 </ProgressBar>
```
## Indeterminate [#](_progressbar_.md#indeterminate)

For progresses with no value to track, set the _mode_ property to _indeterminate_.
```
<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
```
## Accessibility [#](_progressbar_.md#accessibility)

### Screen Reader

ProgressBar components uses _progressbar_ role along with _aria-valuemin_, _aria-valuemax_ and _aria-valuenow_ attributes. Value to describe the component can be defined using _aria-labelledby_ and _aria-label_ props.
```
<span id="label_status" />
<ProgressBar aria-labelledby="label_status" />
<ProgressBar aria-label="Status" />
```
### Keyboard Support

Not applicable.