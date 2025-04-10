---
url: https://primevue.org/deferredcontent
scrapeDate: 2025-04-09T00:36:51.951Z
library: primevue

exactVersionMatch: false
---

## DeferredContent

DeferredContent postpones the loading the content that is initially not in the viewport until it becomes visible on scroll.

## Import [#](_deferredcontent_.md#import)
```
import DeferredContent from 'primevue/deferredcontent';
```
## Basic [#](_deferredcontent_.md#basic)

DeferredContent is used by wrapping the target.

Scroll down to lazy load an image.
```
<DeferredContent @load="onImageLoad">
    <img src="/images/nature/nature4.jpg" alt="Nature" class="rounded-xl w-full md:w-96 block sm:mx-auto" />
</DeferredContent>
```
## DataTable [#](_deferredcontent_.md#datatable)

A practical example that triggers a fetch when the table becomes visible in viewport.

Scroll down to lazy load a DataTable.
```
<DeferredContent @load="onDataLoad" role="region" aria-live="polite" aria-label="Content loaded after page scrolled down">
    <DataTable :value="products">
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
    </DataTable>
</DeferredContent>
```
## Accessibility [#](_deferredcontent_.md#accessibility)

### Screen Reader

DeferredContent can be utilized in many use cases as a result no role is enforced, in fact a role may not be necessary if the card is used for presentational purposes only. Any valid attribute is passed to the container element so you have full control over the roles like [landmark](https://www.w3.org/TR/wai-aria/#landmark) and attributes like _aria-live_.
```
<DeferredContent role="region" aria-live="polite" aria-label="Content loaded after page scrolled down">
    Content
</DeferredContent>
```
### Keyboard Support

Component does not include any interactive elements.