---
url: https://primevue.org/treetable
scrapeDate: 2025-04-09T00:36:42.481Z
library: primevue

exactVersionMatch: false
---

## TreeTable

TreeTable is used to display hierarchical data in tabular format.

## Import [#](_treetable_.md#import)
```
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
```
## Basic [#](_treetable_.md#basic)

TreeTable requires a collection of _TreeNode_ instances as a _value_ and _Column_ components as children for the representation. The column with the element to toggle a node should have _expander_ enabled.
```
<TreeTable :value="nodes" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
## Dynamic Columns [#](_treetable_.md#dynamic_columns)

Columns can be created programmatically.
```
<TreeTable :value="nodes" tableStyle="min-width: 50rem">
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" :expander="col.expander"></Column>
</TreeTable>
```
## Controlled [#](_treetable_.md#controlled)

Expansion state is controlled with _expandedKeys_ property. The _expandedKeys_ should be an object whose keys refer to the node key and values represent the expanded state e.g. _{'0-0': true}_.
```
<Button @click="toggleApplications" label="Toggle Applications" />
<TreeTable v-model:expandedKeys="expandedKeys" :value="nodes" class="mt-6" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
## Template [#](_treetable_.md#template)

Custom content at _header_ and _footer_ slots are supported via templating.
```
<TreeTable :value="nodes" tableStyle="min-width: 50rem">
    <template #header>
        <div class="text-xl font-bold">File Viewer</div>
    </template>
    <Column field="name" header="Name" expander style="width: 250px"></Column>
    <Column field="size" header="Size" style="width: 150px"></Column>
    <Column field="type" header="Type" style="width: 150px"></Column>
    <Column style="width: 10rem">
        <template #body>
            <div class="flex flex-wrap gap-2">
                <Button type="button" icon="pi pi-search" rounded />
                <Button type="button" icon="pi pi-pencil" rounded severity="success" />
            </div>
        </template>
    </Column>
    <template #footer>
        <div class="flex justify-start">
            <Button icon="pi pi-refresh" label="Reload" severity="warn" />
        </div>
    </template>
</TreeTable>
```
## Size [#](_treetable_.md#size)

In addition to a regular table, alternatives with alternative sizes are available.
```
<TreeTable :value="nodes" :size="size.value" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
### Basic [#](_treetable_.md#paginator_basic)

Pagination is enabled by adding _paginator_ property and defining _rows_ per page.
```
<TreeTable :value="nodes" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
### Template [#](_treetable_.md#paginator_template)

Paginator UI is customized using the _paginatorTemplate_ property. Each element can also be customized further with your own UI to replace the default one, refer to the [Paginator](_paginator_.md) component for more information about the advanced customization options.
```
<TreeTable
    :value="nodes"
    :paginator="true"
    :rows="5"
    :rowsPerPageOptions="[5, 10, 25, 50]"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
    tableStyle="min-width: 50rem"
>
    <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
    </template>
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
    <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
    </template>
</TreeTable>
```
### Headless [#](_treetable_.md#paginator_headless)

Pagination is enabled by adding _paginator_ property and defining _rows_ per page.
```
<TreeTable :value="nodes" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
    <template #paginatorcontainer="{ first, last, page, pageCount, prevPageCallback, nextPageCallback, totalRecords }">
        <div class="flex items-center gap-4 border border-primary bg-transparent rounded-full w-full py-1 px-2 justify-between">
            <Button icon="pi pi-chevron-left" rounded text @click="prevPageCallback" :disabled="page === 0" />
            <div class="text-color font-medium">
                <span class="hidden sm:block">Showing {{ first }} to {{ last }} of {{ totalRecords }}</span>
                <span class="block sm:hidden">Page {{ page + 1 }} of {{ pageCount }}</span>
            </div>
            <Button icon="pi pi-chevron-right" rounded text @click="nextPageCallback" :disabled="page === pageCount - 1" />
        </div>
    </template>
</TreeTable>
```
## Sort [#](_treetable_.md#sort)

### Single Column [#](_treetable_.md#single_sort)

Sorting on a column is enabled by adding the _sortable_ property.
```
<TreeTable :value="nodes" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" sortable expander style="width: 34%"></Column>
    <Column field="size" header="Size" sortable style="width: 33%"></Column>
    <Column field="type" header="Type" sortable style="width: 33%"></Column>
</TreeTable>
```
### Multiple Columns [#](_treetable_.md#multiple_sort)

Multiple columns can be sorted by defining _sortMode_ as _multiple_. This mode requires metaKey (e.g. _⌘_) to be pressed when clicking a header.
```
<TreeTable :value="nodes" sortMode="multiple" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" sortable expander style="width: 34%"></Column>
    <Column field="size" header="Size" sortable style="width: 33%"></Column>
    <Column field="type" header="Type" sortable style="width: 33%"></Column>
</TreeTable>
```
### Removable Sort [#](_treetable_.md#removable_sort)

When _removableSort_ is present, the third click removes the sorting from the column.
```
<TreeTable :value="nodes" sortMode="multiple" removableSort tableStyle="min-width: 50rem">
    <Column field="name" header="Name" sortable expander style="width: 34%"></Column>
    <Column field="size" header="Size" sortable style="width: 33%"></Column>
    <Column field="type" header="Type" sortable style="width: 33%"></Column>
</TreeTable>
```
## Filter [#](_treetable_.md#filter)

Filtering is enabled by adding the _filter_ property to a Column. The _filterMode_ specifies the filtering strategy, in _lenient_ mode when the query matches a node, children of the node are not searched further as all descendants of the node are included. On the other hand, in _strict_ mode when the query matches a node, filtering continues on all descendants. A general filled called _globalFilter_ is also provided to search all columns that support filtering.
```
<SelectButton v-model="filterMode" optionLabel="label" dataKey="label" :options="filterOptions" />
<TreeTable :value="nodes" :filters="filters" :filterMode="filterMode.value">
    <template #header>
        <div class="flex justify-end">
            <IconField>
                <InputIcon class="pi pi-search" />
                <InputText v-model="filters['global']" placeholder="Global Search" />
            </IconField>
        </div>
    </template>
    <Column field="name" header="Name" expander style="min-width: 12rem">
        <template #filter>
            <InputText v-model="filters['name']" type="text" placeholder="Filter by name" />
        </template>
    </Column>
    <Column field="size" header="Size" style="min-width: 12rem">
        <template #filter>
            <InputText v-model="filters['size']" type="text" placeholder="Filter by size" />
        </template>
    </Column>
    <Column field="type" header="Type" style="min-width: 12rem">
        <template #filter>
            <InputText v-model="filters['type']" type="text" placeholder="Filter by type" />
        </template>
    </Column>
</TreeTable>
```
## Selection [#](_treetable_.md#selection)

### Single [#](_treetable_.md#single_row_selection)

Single node selection is configured by setting _selectionMode_ as _single_ along with _selectionKeys_ property to manage the selection value binding.

By default, metaKey press (e.g. _⌘_) is necessary to unselect a node however this can be configured with disabling the _metaKeySelection_ property. In touch enabled devices this option has no effect and behavior is same as setting it to false.
```
<ToggleSwitch v-model="metaKey" inputId="input-metakey" />
<TreeTable v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="single" :metaKeySelection="metaKey" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
### Multiple [#](_treetable_.md#multiple_rows_selection)

More than one node is selectable by setting _selectionMode_ to _multiple_. By default in multiple selection mode, metaKey press (e.g. _⌘_) is not necessary to add to existing selections. When the optional _metaKeySelection_ is present, behavior is changed in a way that selecting a new node requires meta key to be present. Note that in touch enabled devices, TreeTable always ignores metaKey.

In multiple selection mode, value binding should be a key-value pair where key is the node key and value is a boolean to indicate selection.
```
<ToggleSwitch v-model="metaKey" inputId="input-metakey" />
<TreeTable v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="multiple" :metaKeySelection="metaKey" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
### Checkbox [#](_treetable_.md#checkbox_row_selection)

Selection of multiple nodes via checkboxes is enabled by configuring _selectionMode_ as _checkbox_.

In checkbox selection mode, value binding should be a key-value pair where key (or the dataKey) is the node key and value is an object that has _checked_ and _partialChecked_ properties to represent the checked state of a node.
```
{
    '0-0': {
        partialChecked: false,
        checked: true
    }
}
```
```
<TreeTable v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="checkbox" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
### Events [#](_treetable_.md#row_selection_events)

TreeTable provides _nodeSelect_ and _nodeUnselect_ events to listen selection events.
```
<TreeTable v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="single" @nodeSelect="onNodeSelect" @nodeUnselect="onNodeUnselect" :metaKeySelection="false" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
## Lazy Load [#](_treetable_.md#lazy_load)

Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking corresponding callbacks everytime _paging_, _sorting_ and _filtering_ occurs. Sample below imitates lazy loading data from a remote datasource using an in-memory list and timeouts to mimic network connection.

Enabling the _lazy_ property and assigning the logical number of rows to _totalRecords_ by doing a projection query are the key elements of the implementation so that paginator displays the UI assuming there are actually records of totalRecords size although in reality they are not present on page, only the records that are displayed on the current page exist.

In addition, only the root elements should be loaded, children can be loaded on demand using _nodeExpand_ callback.
```
<TreeTable :value="nodes" :lazy="true" :paginator="true" :rows="rows" :loading="loading"
    @nodeExpand="onExpand" @page="onPage" :totalRecords="totalRecords" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander></Column>
    <Column field="size" header="Size"></Column>
    <Column field="type" header="Type"></Column>
</TreeTable>
```
### Vertical [#](_treetable_.md#vertical_scroll)

Adding _scrollable_ property along with a _scrollHeight_ for the data viewport enables vertical scrolling with fixed headers.
```
<TreeTable :value="nodes" scrollable scrollHeight="270px" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
### Flexible [#](_treetable_.md#flex_scroll)

Flex scroll feature makes the scrollable viewport section dynamic instead of a fixed value so that it can grow or shrink relative to the parent size of the table. Click the button below to display a maximizable Dialog where data viewport adjusts itself according to the size changes.
```
<Button label="Show" icon="pi pi-external-link" @click="dialogVisible = true" />
<Dialog v-model:visible="dialogVisible" header="Flex Scroll" :style="{ width: '75vw' }" maximizable modal :contentStyle="{ height: '300px' }">
    <TreeTable :value="nodes" :scrollable="true" scrollHeight="flex" tableStyle="min-width: 50rem">
        <Column field="name" header="Name" :expander="true" style="min-width: 200px"></Column>
        <Column field="size" header="Size" style="min-width: 200px"></Column>
        <Column field="type" header="Type" style="min-width: 200px"></Column>
    </TreeTable>
    <template #footer>
        <Button label="Ok" icon="pi pi-check" @click="dialogVisible = false" />
    </template>
</Dialog>
```
### Horizontal [#](_treetable_.md#horizontal_scroll)

Horizontal scrollbar is displayed when table width exceeds the parent width.
```
<TreeTable :value="nodes" scrollable scrollHeight="300px">
    <Column field="name" header="Name" expander style="min-width: 250px"></Column>
    <Column field="size" header="Size" style="min-width: 200px"></Column>
    <Column field="type" header="Type 2" style="min-width: 200px"></Column>
    <Column field="size" header="Size 2" style="min-width: 200px"></Column>
    <Column field="type" header="Type 3" style="min-width: 200px"></Column>
    <Column field="size" header="Size 3" style="min-width: 200px"></Column>
</TreeTable>
```
### Frozen Columns [#](_treetable_.md#frozen_columns)

A column can be fixed during horizontal scrolling by enabling the _frozen_ property on a Column. The location is defined with the _alignFrozen_ that can be _left_ or _right_.
```
<TreeTable :value="nodes" scrollable scrollHeight="300px">
    <Column field="name" header="Name" expander frozen style="min-width: 250px" class="font-bold"></Column>
    <Column field="size" header="Size" style="min-width: 200px"></Column>
    <Column field="type" header="Type 2" style="min-width: 200px"></Column>
    <Column field="size" header="Size 2" style="min-width: 200px"></Column>
    <Column field="type" header="Type 3" style="min-width: 200px"></Column>
    <Column field="size" header="Size 3" style="min-width: 200px"></Column>
</TreeTable>
```
## Column Resize [#](_treetable_.md#column_resize)

### Fit Mode [#](_treetable_.md#resize_fitmode)

Columns can be resized with drag and drop when _resizableColumns_ is enabled. Default resize mode is _fit_ that does not change the overall table width.
```
<TreeTable :value="nodes" :resizableColumns="true" showGridlines tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander></Column>
    <Column field="size" header="Size"></Column>
    <Column field="type" header="Type"></Column>
</TreeTable>
```
### Expand Mode [#](_treetable_.md#resize_expandmode)

Setting _columnResizeMode_ as _expand_ changes the table width as well.
```
<TreeTable :value="nodes" :resizableColumns="true" columnResizeMode="expand" showGridlines tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander></Column>
    <Column field="size" header="Size"></Column>
    <Column field="type" header="Type"></Column>
</TreeTable>
```
## Column Toggle [#](_treetable_.md#column_toggle)

Column visibility based on a condition can be implemented with dynamic columns, in this sample a MultiSelect is used to manage the visible columns.
```
<TreeTable :value="nodes" tableStyle="min-width: 50rem">
    <template #header>
        <div style="text-align:left">
            <MultiSelect :modelValue="selectedColumns" @update:modelValue="onToggle" :options="columns" optionLabel="header" class="w-full sm:w-64" display="chip"/>
        </div>
    </template>
    <Column field="name" header="Name" :expander="true"></Column>
    <Column v-for="col of selectedColumns" :field="col.field" :header="col.header" :key="col.field"></Column>
</TreeTable>
```
## ContextMenu [#](_treetable_.md#contextmenu)

TreeTable has exclusive integration with ContextMenu using the _contextMenu_ event to open a menu on right click alont with _contextMenuSelection_ property and _row-contextmenu_ event to control the selection via the menu.
```
<ContextMenu ref="cm" :model="menuModel" @hide="selectedNode = null" />
<TreeTable v-model:contextMenuSelection="selectedNode" :value="nodes" contextMenu @row-contextmenu="onRowContextMenu" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" expander style="width: 34%"></Column>
    <Column field="size" header="Size" style="width: 33%"></Column>
    <Column field="type" header="Type" style="width: 33%"></Column>
</TreeTable>
```
## Accessibility [#](_treetable_.md#accessibility)

### Screen Reader

DataTable uses a _treegrid_ element whose attributes can be extended with the _tableProps_ option. This property allows passing aria roles and attributes like _aria-label_ and _aria-describedby_ to define the table for readers. Default role of the table is _table_. Header, body and footer elements use _rowgroup_, rows use _row_ role, header cells have _columnheader_ and body cells use _cell_ roles. Sortable headers utilizer _aria-sort_ attribute either set to "ascending" or "descending".

Row elements manage _aria-expanded_ for state along with _aria-posinset_, _aria-setsize_ and _aria-level_ attribute to define the hierachy.

When selection is enabled, _aria-selected_ is set to true on a row. In checkbox mode, TreeTable component uses a hidden native checkbox element.

Editable cells use custom templating so you need to manage aria roles and attributes manually if required.

Paginator is a standalone component used inside the DataTable, refer to the [paginator](_paginator_.md) for more information about the accessibility features.

### Sortable Headers Keyboard Support

Key

Function

_tab_

Moves through the headers.

_enter_

Sorts the column.

_space_

Sorts the column.

### Keyboard Support

Key

Function

_tab_

Moves focus to the first selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the next focusable element in the page tab sequence.

_shift_ + _tab_

Moves focus to the last selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the previous focusable element in the page tab sequence.

_enter_

Selects the focused treenode.

_space_

Selects the focused treenode.

_down arrow_

Moves focus to the next treenode.

_up arrow_

Moves focus to the previous treenode.

_right arrow_

If node is closed, opens the node otherwise moves focus to the first child node.

_left arrow_

If node is open, closes the node otherwise moves focus to the parent node.

_home_

Moves focus to the first same-level node.

_end_

Moves focus to the last same-level node.