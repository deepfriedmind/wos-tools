---
url: https://primevue.org/paginator
scrapeDate: 2025-04-09T00:36:41.906Z
library: primevue

exactVersionMatch: false
---

## Paginator

Paginator displays data in paged format and provides navigation between pages.

## Import [#](_paginator_.md#import)
```
import Paginator from 'primevue/paginator';
```
## Basic [#](_paginator_.md#basic)

Paginator is used as a controlled component with _first_ and _rows_ properties to manage the first index and number of records to display per page. Total number of records need to be with _totalRecords_ property. Default template includes a dropdown to change the _rows_ so _rowsPerPageOptions_ is also necessary for the dropdown options.
```
<Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
```
## Template [#](_paginator_.md#template)

Paginator elements can be customized using the _template_ property using the predefined keys, default value is "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown". Here are the available elements that can be placed inside a paginator in any order.
*   FirstPageLink
*   PrevPageLink
*   PageLinks
*   NextPageLink
*   LastPageLink
*   RowsPerPageDropdown
*   JumpToPageDropdown
*   JumpToPageInput
*   CurrentPageReport

![0](https://primefaces.org/cdn/primevue/images/nature/nature1.jpg)
```
<Paginator v-model:first="first" :rows="1" :totalRecords="12" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />
<div class="p-4 text-center">
    <img :src="`https://primefaces.org/cdn/primevue/images/nature/nature${first + 1}.jpg`" :alt="first" class="rounded w-full sm:w-[30rem]" />
</div>
```
## Current Page Report [#](_paginator_.md#currentpagereport)

Current page report item in the template displays information about the pagination state. Default value is ({currentPage} of {totalPages}) whereas available placeholders are the following;
*   {currentPage}
*   {totalPages}
*   {rows}
*   {first}
*   {last}
*   {totalRecords}
```
<Paginator :rows="10" :totalRecords="120" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" />
```
## Responsive [#](_paginator_.md#responsive)

Paginator elements can be customized per screen size by defining a template per breakpoint. Note that breakpoints are based on max-width setting, if default key is omitted then the default template would be used. Example below has 4 settings; up to 640px, between 641px-960px, between 961px-1300px and larger than 1301px which is the default.
```
<Paginator
    :template="{
        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
    }"
    :rows="10"
    :totalRecords="120">
</Paginator>
```
## Custom Content [#](_paginator_.md#customcontent)

There are two templates available named _start_ and _end_ to add custom content to these locations. Both templates get a state object as a slot property to provide the current page, first index and the rows.

Page: 0 First: 0 Rows: 10
```
<Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]">
    <template #start="slotProps">
        Page: {{ slotProps.state.page }}
        First: {{ slotProps.state.first }}
        Rows: {{ slotProps.state.rows }}
    </template>
    <template #end>
        <Button type="button" icon="pi pi-search" />
    </template>
</Paginator>
```
## Headless [#](_paginator_.md#headless)

Headless mode is enabled by defining a _container_ slot that lets you implement entire UI instead of the default elements. The template receives the following data;
*   first
*   last
*   rows
*   page
*   pageCount
*   totalRecords
*   firstPageCallback
*   lastPageCallback
*   prevPageCallback
*   nextPageCallback
*   rowChangeCallback

Showing 1 to 10 of 120Page 1 of 12
```
<Paginator :rows="10" :totalRecords="120">
    <template #container="{ first, last, page, pageCount, prevPageCallback, nextPageCallback, totalRecords }">
        <div class="flex items-center gap-4 border border-primary bg-transparent rounded-full w-full py-1 px-2 justify-between">
            <Button icon="pi pi-chevron-left" rounded text @click="prevPageCallback" :disabled="page === 0" />
            <div class="text-color font-medium">
                <span class="hidden sm:block">Showing {{ first }} to {{ last }} of {{ totalRecords }}</span>
                <span class="block sm:hidden">Page {{ page + 1 }} of {{ pageCount }}</span>
            </div>
            <Button icon="pi pi-chevron-right" rounded text @click="nextPageCallback" :disabled="page === pageCount - 1" />
        </div>
    </template>
</Paginator>
```
## Accessibility [#](_paginator_.md#accessibility)

### Screen Reader

Paginator is placed inside a _nav_ element to indicate a navigation section. All of the paginator elements can be customized using templating however the default behavious is listed below.

First, previous, next and last page navigators elements with _aria-label_ attributes referring to the _aria.firstPageLabel_, _aria.prevPageLabel_, _aria.nextPageLabel_ and _aria.lastPageLabel_ properties of the [locale](_configuration_.md#locale) API respectively.

Page links are also button elements with an _aria-label_ attribute derived from the _aria.pageLabel_ of the [locale](_configuration_.md#locale) API. Current page is marked with _aria-current_ set to "page" as well.

Current page report uses _aria-live="polite"_ to instruct screen reader about the changes to the pagination state.

Rows per page dropdown internally uses a dropdown component, refer to the [select](_select.md) documentation for accessibility details. Additionally, the dropdown uses an _aria-label_ from the _aria.rowsPerPageLabel_ property of the [locale](_configuration_.md#locale) API.

Jump to page input is an _input_ element with an _aria-label_ that refers to the _aria.jumpToPageInputLabel_ property and jump to page dropdown internally uses a dropdown component, with an _aria-label_ that refers to the _aria.jumpToPageDropdownLabel_ property of the [locale](_configuration_.md#locale) API.

### Keyboard Support

Key

Function

_tab_

Moves focus through the paginator elements.

_enter_

Executes the paginator element action.

_space_

Executes the paginator element action.

### Rows Per Page Dropdown Keyboard Support

Refer to the [select](_select.md) documentation for more details about keyboard support.