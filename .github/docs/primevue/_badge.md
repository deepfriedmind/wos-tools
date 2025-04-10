---
url: https://primevue.org/badge
scrapeDate: 2025-04-09T00:37:01.995Z
library: primevue

exactVersionMatch: false
---

## Badge

Badge is a small status indicator for another element.

## Import [#](_badge_.md#import)
```
// import as component
import Badge from 'primevue/badge';
import OverlayBadge from 'primevue/overlaybadge';
```
## Basic [#](_badge_.md#basic)

Content to display is defined with the _value_ property or the default slot.

210
```
<Badge value="2"></Badge>
<Badge>10</Badge>
```
## Severity [#](_badge_.md#severity)

Severity defines the variant of a badge.

2684935
```
<Badge value="2"></Badge>
<Badge value="6" severity="secondary"></Badge>
<Badge value="8" severity="success"></Badge>
<Badge value="4" severity="info"></Badge>
<Badge value="9" severity="warn"></Badge>
<Badge value="3" severity="danger"></Badge>
<Badge value="5" severity="contrast"></Badge>
```
## Size [#](_badge_.md#size)

Use the _size_ property to customize the dimensions of a Badge.

8642
```
<Badge value="8" size="xlarge" severity="success"></Badge>
<Badge value="6" size="large" severity="warn"></Badge>
<Badge value="4" severity="info"></Badge>
<Badge value="2" size="small"></Badge>
```
## Overlay [#](_badge_.md#overlay)

A badge can be added to any element by encapsulating the content with the _OverlayBadge_ component.
```
<OverlayBadge value="2">
    <i class="pi pi-bell" style="font-size: 2rem" />
</OverlayBadge>
<OverlayBadge value="4" severity="danger">
    <i class="pi pi-calendar" style="font-size: 2rem" />
</OverlayBadge>
<OverlayBadge severity="danger">
    <i class="pi pi-envelope" style="font-size: 2rem" />
</OverlayBadge>
```
## Button [#](_badge_.md#button)

Buttons have built-in support for badges to display a badge inline.
```
<Button type="button" label="Notifications" icon="pi pi-bell" badge="2" />
<Button type="button" label="Inbox" icon="pi pi-inbox" badge="2" badgeSeverity="contrast" outlined />
```
## Accessibility [#](_badge_.md#accessibility)

### Screen Reader

Badge does not include any roles and attributes by default, any attribute is passed to the root element so aria roles and attributes can be added if required. If the badges are dynamic, _aria-live_ may be utilized as well. In case badges need to be tabbable, _tabindex_ can be added to implement custom key handlers.

### Keyboard Support

Component does not include any interactive elements.