---
url: https://primevue.org/tag
scrapeDate: 2025-04-09T00:37:02.553Z
library: primevue

exactVersionMatch: false
---

## Tag

Tag component is used to categorize content.

## Import [#](_tag_.md#import)
```
import Tag from 'primevue/tag';
```
## Basic [#](_tag_.md#basic)

Label of the tag is defined with the _value_ property.

New

## Severity [#](_tag_.md#severity)

Severity defines the variant of a tag.

PrimarySecondarySuccessInfoWarnDangerContrast
```
<Tag value="Primary"></Tag>
<Tag severity="secondary" value="Secondary"></Tag>
<Tag severity="success" value="Success"></Tag>
<Tag severity="info" value="Info"></Tag>
<Tag severity="warn" value="Warn"></Tag>
<Tag severity="danger" value="Danger"></Tag>
<Tag severity="contrast" value="Contrast"></Tag>
```
## Pill [#](_tag_.md#pill)

Enabling _rounded_, displays a tag as a pill.

PrimarySecondarySuccessInfoWarnDangerContrast
```
<Tag value="Primary" rounded></Tag>
<Tag severity="secondary" value="Secondary" rounded></Tag>
<Tag severity="success" value="Success" rounded></Tag>
<Tag severity="info" value="Info" rounded></Tag>
<Tag severity="warn" value="Warn" rounded></Tag>
<Tag severity="danger" value="Danger" rounded></Tag>
<Tag severity="contrast" value="Contrast" rounded></Tag>
```
## Icon [#](_tag_.md#icons)

A font icon next to the value can be displayed with the _icon_ property.

PrimarySecondarySuccessInfoWarnDangerContrast
```
<Tag icon="pi pi-user" value="Primary"></Tag>
<Tag icon="pi pi-search" severity="secondary" value="Secondary"></Tag>
<Tag icon="pi pi-check" severity="success" value="Success"></Tag>
<Tag icon="pi pi-info-circle" severity="info" value="Info"></Tag>
<Tag icon="pi pi-exclamation-triangle" severity="warn" value="Warn"></Tag>
<Tag icon="pi pi-times" severity="danger" value="Danger"></Tag>
<Tag icon="pi pi-cog" severity="contrast" value="Contrast"></Tag>
```
## Template [#](_tag_.md#template)

Children of the component are passed as the content for templating.

![Country](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)Italy
```
<Tag style="border: 2px solid var(--border-color); background: transparent; color: var(--text-color)">
    <div class="flex items-center gap-2 px-1">
        <img alt="Country" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" class="flag flag-it" style="width: 18px" />
        <span class="text-base">Italy</span>
    </div>
</Tag>
```
## Accessibility [#](_tag_.md#accessibility)

### Screen Reader

Tag does not include any roles and attributes by default, any attribute is passed to the root element so aria roles and attributes can be added if required. If the tags are dynamic, _aria-live_ may be utilized as well. In case badges need to be tabbable, _tabindex_ can be added to implement custom key handlers.

### Keyboard Support

Component does not include any interactive elements.