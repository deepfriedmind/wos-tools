---
url: https://primevue.org/progressspinner
scrapeDate: 2025-04-09T00:37:00.313Z
library: primevue

exactVersionMatch: false
---

## ProgressSpinner

ProgressSpinner is a process status indicator.

## import [#](_progressspinner_.md#import)
```
import ProgressSpinner from 'primevue/progressspinner';
```
## Basic [#](_progressspinner_.md#basic)

An infinite spin animation is displayed by default.

## Custom [#](_progressspinner_.md#custom)

ProgressSpinner can be customized with styling property like _style_, _strokeWidth_ _fill_ and _animationDuration_.
```
<ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
    animationDuration=".5s" aria-label="Custom ProgressSpinner" />
```
## Accessibility [#](_progressspinner_.md#accessibility)

### Screen Reader

ProgressSpinner components uses _progressbar_ role. Value to describe the component can be defined using _aria-labelledby_ and _aria-label_ props.
```
<ProgressSpinner aria-label="Loading" />
```
### Keyboard Support

Component does not include any interactive elements.