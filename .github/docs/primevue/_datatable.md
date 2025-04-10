---
url: https://primevue.org/datatable
scrapeDate: 2025-04-09T00:36:40.246Z
library: primevue

exactVersionMatch: false
---

## DataTable

DataTable displays data in tabular format.

## Import [#](_datatable_.md#import)
```
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
```
## Basic [#](_datatable_.md#basic)

DataTable requires a _value_ as data to display and _Column_ components as children for the representation.
```
<DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
## Dynamic Columns [#](_datatable_.md#dynamic_columns)

Columns can be created programmatically.
```
<DataTable :value="products" tableStyle="min-width: 50rem">
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
</DataTable>
```
## Template [#](_datatable_.md#template)

Custom content at _header_ and _footer_ sections are supported via templating.
```
<DataTable :value="products" tableStyle="min-width: 50rem">
    <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold">Products</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    </template>
    <Column field="name" header="Name"></Column>
    <Column header="Image">
        <template #body="slotProps">
            <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="w-24 rounded" />
        </template>
    </Column>
    <Column field="price" header="Price">
        <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
        </template>
    </Column>
    <Column field="category" header="Category"></Column>
    <Column field="rating" header="Reviews">
        <template #body="slotProps">
            <Rating :modelValue="slotProps.data.rating" readonly />
        </template>
    </Column>
    <Column header="Status">
        <template #body="slotProps">
            <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
        </template>
    </Column>
    <template #footer> In total there are {{ products ? products.length : 0 }} products. </template>
</DataTable>
```
## Size [#](_datatable_.md#size)

In addition to a regular table, alternatives with alternative sizes are available.
```
<SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
<DataTable :value="products" :size="size.value" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
## Grid Lines [#](_datatable_.md#gridlines)

Enabling _showGridlines_ displays borders between cells.
```
<DataTable :value="products" showGridlines tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
## Striped Rows [#](_datatable_.md#striped)

Alternating rows are displayed when _stripedRows_ property is present.
```
<DataTable :value="products" stripedRows tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
### Basic [#](_datatable_.md#paginator_basic)

Pagination is enabled by adding _paginator_ property and defining _rows_ per page.
```
<DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" style="width: 25%"></Column>
    <Column field="country.name" header="Country" style="width: 25%"></Column>
    <Column field="company" header="Company" style="width: 25%"></Column>
    <Column field="representative.name" header="Representative" style="width: 25%"></Column>
</DataTable>
```
### Template [#](_datatable_.md#paginator_template)

Paginator UI is customized using the _paginatorTemplate_ property. Each element can also be customized further with your own UI to replace the default one, refer to the [Paginator](_paginator_.md) component for more information about the advanced customization options.
```
<DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
    <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
    </template>
    <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
    </template>
    <Column field="name" header="Name" style="width: 25%"></Column>
    <Column field="country.name" header="Country" style="width: 25%"></Column>
    <Column field="company" header="Company" style="width: 25%"></Column>
    <Column field="representative.name" header="Representative" style="width: 25%"></Column>
</DataTable>
```
### Headless [#](_datatable_.md#paginator_headless)

Headless mode on Pagination is enabled by adding using _paginatorcontainer_.
```
<DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
    <Column field="name" header="Name" style="width: 25%"></Column>
    <Column field="country.name" header="Country" style="width: 25%"></Column>
    <Column field="company" header="Company" style="width: 25%"></Column>
    <Column field="representative.name" header="Representative" style="width: 25%"></Column>
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
</DataTable>
```
## Sort [#](_datatable_.md#sort)

### Single Column [#](_datatable_.md#single_sort)

Sorting on a column is enabled by adding the _sortable_ property.
```
<DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="code" header="Code" sortable style="width: 25%"></Column>
    <Column field="name" header="Name" sortable style="width: 25%"></Column>
    <Column field="category" header="Category" sortable style="width: 25%"></Column>
    <Column field="quantity" header="Quantity" sortable style="width: 25%"></Column>
</DataTable>
```
### Multiple Columns [#](_datatable_.md#multiple_sort)

Multiple columns can be sorted by defining _sortMode_ as _multiple_. This mode requires metaKey (e.g. _⌘_) to be pressed when clicking a header.
```
<DataTable :value="products" sortMode="multiple" tableStyle="min-width: 50rem">
    <Column field="code" header="Code" sortable style="width: 25%"></Column>
    <Column field="name" header="Name" sortable style="width: 25%"></Column>
    <Column field="category" header="Category" sortable style="width: 25%"></Column>
    <Column field="quantity" header="Quantity" sortable style="width: 25%"></Column>
</DataTable>
```
### Presort [#](_datatable_.md#pre_sort)

Defining a default _sortField_ and _sortOrder_ displays data as sorted initially in single column sorting. In _multiple_ sort mode, _multiSortMeta_ should be used instead by providing an array of _DataTableSortMeta_ objects.
```
<DataTable :value="products" sortField="price" :sortOrder="-1" tableStyle="min-width: 50rem">
    <Column field="code" header="Code" sortable style="width: 20%"></Column>
    <Column field="name" header="Name" sortable style="width: 20%"></Column>
    <Column field="price" header="Price" :sortable="true">
        <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
        </template>
    </Column>
    <Column field="category" header="Category" sortable style="width: 20%"></Column>
    <Column field="quantity" header="Quantity" sortable style="width: 20%"></Column>
</DataTable>
```
### Removable [#](_datatable_.md#removable_sort)

When _removableSort_ is present, the third click removes the sorting from the column.
```
<DataTable :value="products" removableSort tableStyle="min-width: 50rem">
    <Column field="code" header="Code" sortable style="width: 25%"></Column>
    <Column field="name" header="Name" sortable style="width: 25%"></Column>
    <Column field="category" header="Category" sortable style="width: 25%"></Column>
    <Column field="quantity" header="Quantity" sortable style="width: 25%"></Column>
</DataTable>
```
## Filter [#](_datatable_.md#filter)

### Basic [#](_datatable_.md#basic_filter)

Data filtering is enabled by defining the _filters_ model referring to a _DataTableFilterMeta_ instance and specifying a filter element for a column using the _filter_ template. This template receives a _filterModel_ and _filterCallback_ to build your own UI.

The optional global filtering searches the data against a single value that is bound to the _global_ key of the _filters_ object. The fields to search against are defined with the _globalFilterFields_.
```
<DataTable v-model:filters="filters" :value="customers" paginator :rows="10" dataKey="id" filterDisplay="row" :loading="loading"
        :globalFilterFields="['name', 'country.name', 'representative.name', 'status']">
    <template #header>
        <div class="flex justify-end">
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </IconField>
        </div>
    </template>
    <template #empty> No customers found. </template>
    <template #loading> Loading customers data. Please wait. </template>
    <Column field="name" header="Name" style="min-width: 12rem">
        <template #body="{ data }">
            {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
        </template>
    </Column>
    <Column header="Country" filterField="country.name" style="min-width: 12rem">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                <span>{{ data.country.name }}</span>
            </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by country" />
        </template>
    </Column>
    <Column header="Agent" filterField="representative" :showFilterMenu="false" style="min-width: 14rem">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                <span>{{ data.representative.name }}</span>
            </div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="representatives" optionLabel="name" placeholder="Any" style="min-width: 14rem" :maxSelectedLabels="1">
                <template #option="slotProps">
                    <div class="flex items-center gap-2">
                        <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                        <span>{{ slotProps.option.name }}</span>
                    </div>
                </template>
            </MultiSelect>
        </template>
    </Column>
    <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">
        <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" style="min-width: 12rem" :showClear="true">
                <template #option="slotProps">
                    <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                </template>
            </Select>
        </template>
    </Column>
    <Column field="verified" header="Verified" dataType="boolean" style="min-width: 6rem">
        <template #body="{ data }">
            <i class="pi" :class="{ 'pi-check-circle text-green-500': data.verified, 'pi-times-circle text-red-400': !data.verified }"></i>
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <Checkbox v-model="filterModel.value" :indeterminate="filterModel.value === null" binary @change="filterCallback()" />
        </template>
    </Column>
</DataTable>
```
### Advanced [#](_datatable_.md#advanced_filter)

When _filterDisplay_ is set as _menu_, filtering UI is placed inside a popover with support for multiple constraints and advanced templating.
```
<DataTable v-model:filters="filters" :value="customers" paginator showGridlines :rows="10" dataKey="id"
        filterDisplay="menu" :loading="loading" :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']">
    <template #header>
        <div class="flex justify-between">
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </IconField>
        </div>
    </template>
    <template #empty> No customers found. </template>
    <template #loading> Loading customers data. Please wait. </template>
    <Column field="name" header="Name" style="min-width: 12rem">
        <template #body="{ data }">
            {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
        </template>
    </Column>
    <Column header="Country" filterField="country.name" style="min-width: 12rem">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                <span>{{ data.country.name }}</span>
            </div>
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by country" />
        </template>
        <template #filterclear="{ filterCallback }">
            <Button type="button" icon="pi pi-times" @click="filterCallback()" severity="secondary"></Button>
        </template>
        <template #filterapply="{ filterCallback }">
            <Button type="button" icon="pi pi-check" @click="filterCallback()" severity="success"></Button>
        </template>
        <template #filterfooter>
            <div class="px-4 pt-0 pb-4 text-center">Customized Buttons</div>
        </template>
    </Column>
    <Column header="Agent" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                <span>{{ data.representative.name }}</span>
            </div>
        </template>
        <template #filter="{ filterModel }">
            <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any">
                <template #option="slotProps">
                    <div class="flex items-center gap-2">
                        <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                        <span>{{ slotProps.option.name }}</span>
                    </div>
                </template>
            </MultiSelect>
        </template>
    </Column>
    <Column header="Date" filterField="date" dataType="date" style="min-width: 10rem">
        <template #body="{ data }">
            {{ formatDate(data.date) }}
        </template>
        <template #filter="{ filterModel }">
            <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
        </template>
    </Column>
    <Column header="Balance" filterField="balance" dataType="numeric" style="min-width: 10rem">
        <template #body="{ data }">
            {{ formatCurrency(data.balance) }}
        </template>
        <template #filter="{ filterModel }">
            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
        </template>
    </Column>
    <Column header="Status" field="status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
        <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel }">
            <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                <template #option="slotProps">
                    <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                </template>
            </Select>
        </template>
    </Column>
    <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width: 12rem">
        <template #body="{ data }">
            <ProgressBar :value="data.activity" :showValue="false" style="height: 6px"></ProgressBar>
        </template>
        <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4"></Slider>
            <div class="flex items-center justify-between px-2">
                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
        </template>
    </Column>
    <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
        <template #body="{ data }">
            <i class="pi" :class="{ 'pi-check-circle text-green-500 ': data.verified, 'pi-times-circle text-red-500': !data.verified }"></i>
        </template>
        <template #filter="{ filterModel }">
            <label for="verified-filter" class="font-bold"> Verified </label>
            <Checkbox v-model="filterModel.value" :indeterminate="filterModel.value === null" binary inputId="verified-filter" />
        </template>
    </Column>
</DataTable>
```
## Row Selection [#](_datatable_.md#row_selection)

### Single [#](_datatable_.md#single_row_selection)

Single row selection is enabled by defining _selectionMode_ as _single_ along with a value binding using _selection_ property. When available, it is suggested to provide a unique identifier of a row with _dataKey_ to optimize performance.

By default, metaKey press (e.g. _⌘_) is necessary to unselect a row however this can be configured with disabling the _metaKeySelection_ property. In touch enabled devices this option has no effect and behavior is same as setting it to false.
```
<ToggleSwitch v-model="metaKey" inputId="input-metakey" />
<DataTable v-model:selection="selectedProduct" :value="products" selectionMode="single" :metaKeySelection="metaKey" dataKey="id" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
### Multiple [#](_datatable_.md#multiple_rows_selection)

More than one row is selectable by setting _selectionMode_ to _multiple_. By default in multiple selection mode, metaKey press (e.g. _⌘_) is not necessary to add to existing selections. When the optional _metaKeySelection_ is present, behavior is changed in a way that selecting a new row requires meta key to be present. Note that in touch enabled devices, DataTable always ignores metaKey.
```
<ToggleSwitch v-model="metaKey" inputId="input-metakey" />
<DataTable v-model:selection="selectedProducts" :value="products" selectionMode="multiple" :metaKeySelection="metaKey" dataKey="id" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
### RadioButton [#](_datatable_.md#radiobutton_row_selection)

Specifying _selectionMode_ as _single_ on a Column, displays a radio button inside that column for selection. By default, row clicks also trigger selection, set _selectionMode_ of DataTable to _radiobutton_ to only trigger selection using the radio buttons.
```
<DataTable v-model:selection="selectedProduct" :value="products" dataKey="id" tableStyle="min-width: 50rem">
    <Column selectionMode="single" headerStyle="width: 3rem"></Column>
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
### Checkbox [#](_datatable_.md#checkbox_row_selection)

Specifying _selectionMode_ as _multiple_ on a Column, displays a checkbox inside that column for selection.

The header checkbox toggles the selection state of the whole dataset by default, when paginator is enabled you may add _selectAll_ property and _select-all-change_ event to only control the selection of visible rows.
```
<DataTable v-model:selection="selectedProducts" :value="products" dataKey="id" tableStyle="min-width: 50rem">
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
### Column [#](_datatable_.md#column_row_selection)

Row selection with an element inside a column is implemented with templating.
```
<DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
    <Column class="w-24 !text-end">
        <template #body="{ data }">
            <Button icon="pi pi-search" @click="selectRow(data)" severity="secondary" rounded></Button>
        </template>
    </Column>
</DataTable>
```
### Events [#](_datatable_.md#row_selection_events)

DataTable provides _row-select_ and _row-unselect_ events to listen selection events.
```
<DataTable v-model:selection="selectedProduct" :value="products" selectionMode="single" dataKey="id" :metaKeySelection="false"
        @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" tableStyle="min-width: 50rem">
    <Column selectionMode="single" headerStyle="width: 3rem"></Column>
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
## Row Expansion [#](_datatable_.md#row_expansion)

Row expansion is controlled with _expandedRows_ property. The column that has the expander element requires _expander_ property to be enabled. Optional _rowExpand_ and _rowCollapse_ events are available as callbacks.

Expanded rows can either be an array of row data or when _dataKey_ is present, an object whose keys are strings referring to the identifier of the row data and values are booleans to represent the expansion state e.g. _{'1004': true}_. The _dataKey_ alternative is more performant for large amounts of data.
```
<DataTable v-model:expandedRows="expandedRows" :value="products" dataKey="id"
        @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" tableStyle="min-width: 60rem">
    <template #header>
        <div class="flex flex-wrap justify-end gap-2">
            <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
            <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
        </div>
    </template>
    <Column expander style="width: 5rem" />
    <Column field="name" header="Name"></Column>
    <Column header="Image">
        <template #body="slotProps">
            <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="shadow-lg" width="64" />
        </template>
    </Column>
    <Column field="price" header="Price">
        <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
        </template>
    </Column>
    <Column field="category" header="Category"></Column>
    <Column field="rating" header="Reviews">
        <template #body="slotProps">
            <Rating :modelValue="slotProps.data.rating" readonly />
        </template>
    </Column>
    <Column header="Status">
        <template #body="slotProps">
            <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
        </template>
    </Column>
    <template #expansion="slotProps">
        <div class="p-4">
            <h5>Orders for {{ slotProps.data.name }}</h5>
            <DataTable :value="slotProps.data.orders">
                <Column field="id" header="Id" sortable></Column>
                <Column field="customer" header="Customer" sortable></Column>
                <Column field="date" header="Date" sortable></Column>
                <Column field="amount" header="Amount" sortable>
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.amount) }}
                    </template>
                </Column>
                <Column field="status" header="Status" sortable>
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status.toLowerCase()" :severity="getOrderSeverity(slotProps.data)" />
                    </template>
                </Column>
                <Column headerStyle="width:4rem">
                    <template #body>
                        <Button icon="pi pi-search" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </template>
</DataTable>
```
## Edit [#](_datatable_.md#edit)

### Cell [#](_datatable_.md#cell_edit)

Cell editing is enabled by setting _editMode_ as _cell_, defining input elements with _editor_ templating of a Column and implementing _cell-edit-complete_ to update the state.
```
<DataTable :value="products" editMode="cell" @cell-edit-complete="onCellEditComplete"
    :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
            bodycell: ({ state }) => ({
                class: [{ '!py-0': state['d_editing'] }]
            })
        }
    }"
>
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" style="width: 25%">
        <template #body="{ data, field }">
            {{ field === 'price' ? formatCurrency(data[field]) : data[field] }}
        </template>
        <template #editor="{ data, field }">
            <template v-if="field !== 'price'">
                <InputText v-model="data[field]" autofocus fluid />
            </template>
            <template v-else>
                <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus fluid />
            </template>
        </template>
    </Column>
</DataTable>
```
### Row [#](_datatable_.md#row_edit)

Row editing is configured with setting _editMode_ as _row_ and defining _editingRows_ with the v-model directive to hold the reference of the editing rows. Similarly with cell edit mode, defining input elements with _editor_ slot of a Column and implementing _row-edit-save_ are necessary to update the state. The column to control the editing state should have _editor_ templating applied.
```
<DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id" @row-edit-save="onRowEditSave"
    :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
            bodycell: ({ state }) => ({
                style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
            })
        }
    }"
>
    <Column field="code" header="Code" style="width: 20%">
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
        </template>
    </Column>
    <Column field="name" header="Name" style="width: 20%">
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
        </template>
    </Column>
    <Column field="inventoryStatus" header="Status" style="width: 20%">
        <template #editor="{ data, field }">
            <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status" fluid>
                <template #option="slotProps">
                    <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                </template>
            </Select>
        </template>
        <template #body="slotProps">
            <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
        </template>
    </Column>
    <Column field="price" header="Price" style="width: 20%">
        <template #body="{ data, field }">
            {{ formatCurrency(data[field]) }}
        </template>
        <template #editor="{ data, field }">
            <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" fluid />
        </template>
    </Column>
    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
</DataTable>
```
### Vertical [#](_datatable_.md#vertical_scroll)

Adding _scrollable_ property along with a _scrollHeight_ for the data viewport enables vertical scrolling with fixed headers.
```
<DataTable :value="customers" scrollable scrollHeight="400px" tableStyle="min-width: 50rem">
    <Column field="name" header="Name"></Column>
    <Column field="country.name" header="Country"></Column>
    <Column field="representative.name" header="Representative"></Column>
    <Column field="company" header="Company"></Column>
</DataTable>
```
### Flexible [#](_datatable_.md#flex_scroll)

Flex scroll feature makes the scrollable viewport section dynamic instead of a fixed value so that it can grow or shrink relative to the parent size of the table. Click the button below to display a maximizable Dialog where data viewport adjusts itself according to the size changes.
```
<Button label="Show" icon="pi pi-external-link" @click="dialogVisible = true" />
<Dialog v-model:visible="dialogVisible" header="Flex Scroll" :style="{ width: '75vw' }" maximizable modal :contentStyle="{ height: '300px' }">
    <DataTable :value="customers" scrollable scrollHeight="flex" tableStyle="min-width: 50rem">
        <Column field="name" header="Name"></Column>
        <Column field="country.name" header="Country"></Column>
        <Column field="representative.name" header="Representative"></Column>
        <Column field="company" header="Company"></Column>
    </DataTable>
    <template #footer>
        <Button label="Ok" icon="pi pi-check" @click="dialogVisible = false" />
    </template>
</Dialog>
```
### Horizontal [#](_datatable_.md#horizontal_scroll)

Horizontal scrollbar is displayed when table width exceeds the parent width.
```
<DataTable :value="customers" scrollable scrollHeight="400px">
    <Column field="id" header="Id" footer="Id" style="min-width: 100px"></Column>
    <Column field="name" header="Name" footer="Name" style="min-width: 200px"></Column>
    <Column field="country.name" header="Country" footer="Country" style="min-width: 200px"></Column>
    <Column field="date" header="Date" footer="Date" style="min-width: 200px"></Column>
    <Column field="balance" header="Balance" footer="Balance" style="min-width: 200px">
        <template #body="{ data }">
            {{ formatCurrency(data.balance) }}
        </template>
    </Column>
    <Column field="company" header="Company" footer="Company" style="min-width: 200px"></Column>
    <Column field="status" header="Status" footer="Status" style="min-width: 200px"></Column>
    <Column field="activity" header="Activity" footer="Activity" style="min-width: 200px"></Column>
    <Column field="representative.name" header="Representative" footer="Representative" style="min-width: 200px"></Column>
</DataTable>
```
### Frozen Rows [#](_datatable_.md#frozen_rows)

Rows can be fixed during scrolling by enabling the _frozenValue_ property.
```
<DataTable
    :value="customers"
    :frozenValue="lockedCustomers"
    scrollable
    scrollHeight="400px"
    :pt="{
        table: { style: 'min-width: 50rem' },
        bodyrow: ({ props }) => ({
            class: [{ 'font-bold': props.frozenRow }]
        })
    }"
>
    <Column field="name" header="Name"></Column>
    <Column field="country.name" header="Country"></Column>
    <Column field="representative.name" header="Representative"></Column>
    <Column field="status" header="Status"></Column>
    <Column style="flex: 0 0 4rem">
        <template #body="{ data, frozenRow, index }">
            <Button type="button" :icon="frozenRow ? 'pi pi-lock-open' : 'pi pi-lock'" :disabled="frozenRow ? false : lockedCustomers.length >= 2" text size="small" @click="toggleLock(data, frozenRow, index)" />
        </template>
    </Column>
</DataTable>
```
### Frozen Columns [#](_datatable_.md#frozen_columns)

A column can be fixed during horizontal scrolling by enabling the _frozen_ property. The location is defined with the _alignFrozen_ that can be _left_ or _right_.
```
<ToggleButton v-model="balanceFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Balance" offLabel="Balance" />
<DataTable :value="customers" scrollable scrollHeight="400px" class="mt-6">
    <Column field="name" header="Name" style="min-width: 200px" frozen class="font-bold"></Column>
    <Column field="id" header="Id" style="min-width: 100px"></Column>
    <Column field="name" header="Name" style="min-width: 200px"></Column>
    <Column field="country.name" header="Country" style="min-width: 200px"></Column>
    <Column field="date" header="Date" style="min-width: 200px"></Column>
    <Column field="company" header="Company" style="min-width: 200px"></Column>
    <Column field="status" header="Status" style="min-width: 200px"></Column>
    <Column field="activity" header="Activity" style="min-width: 200px"></Column>
    <Column field="representative.name" header="Representative" style="min-width: 200px"></Column>
    <Column field="balance" header="Balance" style="min-width: 200px" alignFrozen="right" :frozen="balanceFrozen">
        <template #body="{ data }">
            <span class="font-bold">{{ formatCurrency(data.balance) }}</span>
        </template>
    </Column>
</DataTable>
```
### Preload [#](_datatable_.md#preload_virtualscroll)

Virtual Scrolling is an efficient way to render large amount data. Usage is similar to regular scrolling with the addition of _virtualScrollerOptions_ property to define a fixed _itemSize_. Internally, [VirtualScroller](_virtualscroller_.md) component is utilized so refer to the API of VirtualScroller for more information about the available options.

In this example, **100000** preloaded records are rendered by the Table.
```
<DataTable :value="cars" scrollable scrollHeight="400px" :virtualScrollerOptions="{ itemSize: 44 }" tableStyle="min-width: 50rem">
    <Column field="id" header="Id" style="width: 20%; height: 44px"></Column>
    <Column field="vin" header="Vin" style="width: 20%; height: 44px"></Column>
    <Column field="year" header="Year" style="width: 20%; height: 44px"></Column>
    <Column field="brand" header="Brand" style="width: 20%; height: 44px"></Column>
    <Column field="color" header="Color" style="width: 20%; height: 44px"></Column>
</DataTable>
```
### Lazy [#](_datatable_.md#lazy_virtualscroll)

When lazy loading is enabled via the _virtualScrollerOptions_, data is fetched on demand during scrolling instead of preload.

In sample below, an in-memory list and timeout is used to mimic fetching from a remote datasource. The _virtualCars_ is an empty array that is populated on scroll.
```
<DataTable :value="virtualCars" scrollable scrollHeight="400px" tableStyle="min-width: 50rem"
        :virtualScrollerOptions="{ lazy: true, onLazyLoad: loadCarsLazy, itemSize: 44, delay: 200, showLoader: true, loading: lazyLoading, numToleratedItems: 10 }">
    <Column field="id" header="Id" style="width: 20%; height: 44px">
        <template #loading>
            <div class="flex items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="60%" height="1rem" />
            </div>
        </template>
    </Column>
    <Column field="vin" header="Vin" style="width: 20%; height: 44px">
        <template #loading>
            <div class="flex items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="40%" height="1rem" />
            </div>
        </template>
    </Column>
    <Column field="year" header="Year" style="width: 20%; height: 44px">
        <template #loading>
            <div class="flex items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="30%" height="1rem" />
            </div>
        </template>
    </Column>
    <Column field="brand" header="Brand" style="width: 20%; height: 44px">
        <template #loading>
            <div class="flex items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="40%" height="1rem" />
            </div>
        </template>
    </Column>
    <Column field="color" header="Color" style="width: 20%; height: 44px">
        <template #loading>
            <div class="flex items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="60%" height="1rem" />
            </div>
        </template>
    </Column>
</DataTable>
```
## Column Group [#](_datatable_.md#column_group)

Columns can be grouped within a _Row_ component and groups can be displayed within a ColumnGroup component. These groups can be displayed using _type_ property that can be _header_ or _footer_. Number of cells and rows to span are defined with the _colspan_ and _rowspan_ properties of a Column.
```
<DataTable :value="sales" tableStyle="min-width: 50rem">
    <ColumnGroup type="header">
        <Row>
            <Column header="Product" :rowspan="3" />
            <Column header="Sale Rate" :colspan="4" />
        </Row>
        <Row>
            <Column header="Sales" :colspan="2" />
            <Column header="Profits" :colspan="2" />
        </Row>
        <Row>
            <Column header="Last Year" sortable field="lastYearSale" />
            <Column header="This Year" sortable field="thisYearSale" />
            <Column header="Last Year" sortable field="lastYearProfit" />
            <Column header="This Year" sortable field="thisYearProfit" />
        </Row>
    </ColumnGroup>
    <Column field="product" />
    <Column field="lastYearSale">
        <template #body="slotProps"> {{ slotProps.data.lastYearSale }}% </template>
    </Column>
    <Column field="thisYearSale">
        <template #body="slotProps"> {{ slotProps.data.thisYearSale }}% </template>
    </Column>
    <Column field="lastYearProfit">
        <template #body="slotProps">
            {{ formatCurrency(slotProps.data.lastYearProfit) }}
        </template>
    </Column>
    <Column field="thisYearProfit">
        <template #body="slotProps">
            {{ formatCurrency(slotProps.data.thisYearProfit) }}
        </template>
    </Column>
    <ColumnGroup type="footer">
        <Row>
            <Column footer="Totals:" :colspan="3" footerStyle="text-align:right" />
            <Column :footer="lastYearTotal" />
            <Column :footer="thisYearTotal" />
        </Row>
    </ColumnGroup>
</DataTable>
```
## Row Group [#](_datatable_.md#row_group)

### Subheader [#](_datatable_.md#rowgroup_subheader)

Rows are grouped with the _groupRowsBy_ property. When _rowGroupMode_ is set as _subheader_, a header and footer can be displayed for each group. The content of a group header is provided with _groupheader_ and footer with _groupfooter_ slots.
```
<DataTable :value="customers" rowGroupMode="subheader" groupRowsBy="representative.name" sortMode="single"
        sortField="representative.name" :sortOrder="1" scrollable scrollHeight="400px" tableStyle="min-width: 50rem">
    <Column field="representative.name" header="Representative"></Column>
    <Column field="name" header="Name" style="min-width: 200px"></Column>
    <Column field="country" header="Country" style="min-width: 200px">
        <template #body="slotProps">
            <div class="flex items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.data.country.code}`" style="width: 24px" />
                <span>{{ slotProps.data.country.name }}</span>
            </div>
        </template>
    </Column>
    <Column field="company" header="Company" style="min-width: 200px"></Column>
    <Column field="status" header="Status" style="min-width: 200px">
        <template #body="slotProps">
            <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
        </template>
    </Column>
    <Column field="date" header="Date" style="min-width: 200px"></Column>
    <template #groupheader="slotProps">
        <div class="flex items-center gap-2">
            <img :alt="slotProps.data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.data.representative.image}`" width="32" style="vertical-align: middle" />
            <span>{{ slotProps.data.representative.name }}</span>
        </div>
    </template>
    <template #groupfooter="slotProps">
        <div class="flex justify-end font-bold w-full">Total Customers: {{ calculateCustomerTotal(slotProps.data.representative.name) }}</div>
    </template>
</DataTable>
```
### Expandable [#](_datatable_.md#rowgroup_expandable)

When _expandableRowGroups_ is present in subheader based row grouping, groups can be expanded and collapsed. State of the expansions are controlled using the _expandedRows_ property and _rowgroup-expand_ and _rowgroup-collapse_ events.
```
<DataTable v-model:expandedRowGroups="expandedRowGroups" :value="customers" tableStyle="min-width: 50rem"
        expandableRowGroups rowGroupMode="subheader" groupRowsBy="representative.name" @rowgroup-expand="onRowGroupExpand" @rowgroup-collapse="onRowGroupCollapse"
        sortMode="single" sortField="representative.name" :sortOrder="1">
    <template #groupheader="slotProps">
        <img :alt="slotProps.data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.data.representative.image}`" width="32" style="vertical-align: middle; display: inline-block" class="ml-2" />
        <span class="align-middle ml-2 font-bold leading-normal">{{ slotProps.data.representative.name }}</span>
    </template>
    <Column field="representative.name" header="Representative"></Column>
    <Column field="name" header="Name" style="width: 20%"></Column>
    <Column field="country" header="Country" style="width: 20%">
        <template #body="slotProps">
            <div class="flex items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.data.country.code}`" style="width: 24px" />
                <span>{{ slotProps.data.country.name }}</span>
            </div>
        </template>
    </Column>
    <Column field="company" header="Company" style="width: 20%"></Column>
    <Column field="status" header="Status" style="width: 20%">
        <template #body="slotProps">
            <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
        </template>
    </Column>
    <Column field="date" header="Date" style="width: 20%"></Column>
    <template #groupfooter="slotProps">
        <div class="flex justify-end font-bold w-full">Total Customers: {{ calculateCustomerTotal(slotProps.data.representative.name) }}</div>
    </template>
</DataTable>
```
### RowSpan [#](_datatable_.md#rowgroup_rowspan)

When _rowGroupMode_ is configured to be _rowspan_, the grouping column spans multiple rows.
```
<DataTable :value="customers" rowGroupMode="rowspan" groupRowsBy="representative.name" sortMode="single" sortField="representative.name" :sortOrder="1" tableStyle="min-width: 50rem">
    <Column header="#" headerStyle="width:3rem">
        <template #body="slotProps">
            {{ slotProps.index + 1 }}
        </template>
    </Column>
    <Column field="representative.name" header="Representative" style="min-width: 200px">
        <template #body="slotProps">
            <div class="flex items-center gap-2">
                <img :alt="slotProps.data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.data.representative.image}`" width="32" style="vertical-align: middle" />
                <span>{{ slotProps.data.representative.name }}</span>
            </div>
        </template>
    </Column>
    <Column field="name" header="Name" style="min-width: 200px"></Column>
    <Column field="country" header="Country" style="min-width: 150px">
        <template #body="slotProps">
            <div class="flex items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.data.country.code}`" style="width: 24px" />
                <span>{{ slotProps.data.country.name }}</span>
            </div>
        </template>
    </Column>
    <Column field="company" header="Company" style="min-width: 200px"></Column>
    <Column field="status" header="Status" style="min-width: 100px">
        <template #body="slotProps">
            <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
        </template>
    </Column>
</DataTable>
```
## Conditional Style [#](_datatable_.md#conditional_style)

Particular rows and cells can be styled based on conditions. The _rowClass_ receives a row data as a parameter to return a style class for a row whereas cells are customized using the _body_ template.
```
<DataTable :value="products" :rowClass="rowClass" :rowStyle="rowStyle" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity">
        <template #body="slotProps">
            <Badge :value="slotProps.data.quantity" :severity="stockSeverity(slotProps.data)" />
        </template>
    </Column>
</DataTable>
```
## Column Resize [#](_datatable_.md#column_resize)

### Fit Mode [#](_datatable_.md#resize_fitmode)

Columns can be resized with drag and drop when _resizableColumns_ is enabled. Default resize mode is _fit_ that does not change the overall table width.
```
<DataTable :value="products" resizableColumns columnResizeMode="fit" showGridlines tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
### Expand Mode [#](_datatable_.md#resize_expandmode)

Setting _columnResizeMode_ as _expand_ changes the table width as well.
```
<DataTable :value="products" resizableColumns columnResizeMode="expand" showGridlines tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
## Reorder [#](_datatable_.md#reorder)

Order of the columns and rows can be changed using drag and drop. Column reordering is configured by adding _reorderableColumns_ property.

Similarly, adding _rowReorder_ property to a column enables draggable rows. For the drag handle a column needs to have _rowReorder_ property and table needs to have _row-reorder_ event is required to control the state of the rows after reorder completes.
```
<DataTable :value="products" :reorderableColumns="true" @columnReorder="onColReorder" @rowReorder="onRowReorder" tableStyle="min-width: 50rem">
    <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
    <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
</DataTable>
```
## Column Toggle [#](_datatable_.md#column_toggle)

Column visibility based on a condition can be implemented with dynamic columns, in this sample a MultiSelect is used to manage the visible columns.
```
<DataTable :value="products" tableStyle="min-width: 50rem">
    <template #header>
        <div style="text-align:left">
            <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="onToggle"
                display="chip" placeholder="Select Columns" />
        </div>
    </template>
    <Column field="code" header="Code" />
    <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="col.field + '_' + index"></Column>
</DataTable>
```
## Export [#](_datatable_.md#export)

DataTable can export its data to CSV format.
```
<DataTable :value="products" ref="dt" tableStyle="min-width: 50rem">
    <template #header>
        <div class="text-end pb-4">
            <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
        </div>
    </template>
    <Column field="code" header="Code" exportHeader="Product Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
```
## Context Menu [#](_datatable_.md#contextmenu)

DataTable has exclusive integration with ContextMenu using the _contextMenu_ event to open a menu on right click alont with _contextMenuSelection_ property and _row-contextmenu_ event to control the selection via the menu.
```
<ContextMenu ref="cm" :model="menuModel" @hide="selectedProduct = null" />
<DataTable v-model:contextMenuSelection="selectedProduct" :value="products" contextMenu
        @row-contextmenu="onRowContextMenu" tableStyle="min-width: 50rem">
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="price" header="Price">
        <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
        </template>
    </Column>
</DataTable>
```
## Stateful [#](_datatable_.md#stateful)

Stateful table allows keeping the state such as page, sort and filtering either at local storage or session storage so that when the page is visited again, table would render the data using the last settings.

Change the state of the table e.g paginate, navigate away and then return to this table again to test this feature, the setting is set as _session_ with the _stateStorage_ property so that Table retains the state until the browser is closed. Other alternative is _local_ referring to _localStorage_ for an extended lifetime.
```
<DataTable v-model:filters="filters" v-model:selection="selectedCustomer" :value="customers"
    stateStorage="session" stateKey="dt-state-demo-session" paginator :rows="5" filterDisplay="menu"
    selectionMode="single" dataKey="id" :globalFilterFields="['name', 'country.name', 'representative.name', 'status']" tableStyle="min-width: 50rem">
    <template #header>
        <IconField>
            <InputIcon>
                <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Global Search" />
        </IconField>
    </template>
    <Column field="name" header="Name" sortable style="width: 25%">
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
        </template>
    </Column>
    <Column header="Country" sortable sortField="country.name" filterField="country.name" filterMatchMode="contains" style="width: 25%">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                <span>{{ data.country.name }}</span>
            </div>
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by country" />
        </template>
    </Column>
    <Column header="Representative" sortable sortField="representative.name" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="width: 25%">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                <span>{{ data.representative.name }}</span>
            </div>
        </template>
        <template #filter="{ filterModel }">
            <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any">
                <template #option="slotProps">
                    <div class="flex items-center gap-2">
                        <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                        <span>{{ slotProps.option.name }}</span>
                    </div>
                </template>
            </MultiSelect>
        </template>
    </Column>
    <Column field="status" header="Status" sortable filterMatchMode="equals" style="width: 25%">
        <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel }">
            <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                <template #option="slotProps">
                    <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                </template>
            </Select>
        </template>
    </Column>
    <template #empty> No customers found. </template>
</DataTable>
```
## Samples [#](_datatable_.md#samples)

### Customers [#](_datatable_.md#customers)

DataTable with selection, pagination, filtering, sorting and templating.
```
<DataTable v-model:filters="filters" v-model:selection="selectedCustomers" :value="customers" paginator :rows="10" dataKey="id" filterDisplay="menu"
    :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']">
    <template #header>
        <div class="flex justify-between">
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </IconField>
        </div>
    </template>
    <template #empty> No customers found. </template>
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column field="name" header="Name" sortable style="min-width: 14rem">
        <template #body="{ data }">
            {{ data.name }}
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
        </template>
    </Column>
    <Column header="Country" sortable sortField="country.name" filterField="country.name" style="min-width: 14rem">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                <span>{{ data.country.name }}</span>
            </div>
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by country" />
        </template>
    </Column>
    <Column header="Agent" sortable sortField="representative.name" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
        <template #body="{ data }">
            <div class="flex items-center gap-2">
                <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                <span>{{ data.representative.name }}</span>
            </div>
        </template>
        <template #filter="{ filterModel }">
            <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any">
                <template #option="slotProps">
                    <div class="flex items-center gap-2">
                        <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                        <span>{{ slotProps.option.name }}</span>
                    </div>
                </template>
            </MultiSelect>
        </template>
    </Column>
    <Column field="date" header="Date" sortable filterField="date" dataType="date" style="min-width: 10rem">
        <template #body="{ data }">
            {{ formatDate(data.date) }}
        </template>
        <template #filter="{ filterModel }">
            <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
        </template>
    </Column>
    <Column field="balance" header="Balance" sortable filterField="balance" dataType="numeric" style="min-width: 10rem">
        <template #body="{ data }">
            {{ formatCurrency(data.balance) }}
        </template>
        <template #filter="{ filterModel }">
            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
        </template>
    </Column>
    <Column header="Status" field="status" sortable :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
        <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
        </template>
        <template #filter="{ filterModel }">
            <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                <template #option="slotProps">
                    <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                </template>
            </Select>
        </template>
    </Column>
    <Column field="activity" header="Activity" sortable :showFilterMatchModes="false" style="min-width: 12rem">
        <template #body="{ data }">
            <ProgressBar :value="data.activity" :showValue="false" style="height: 6px"></ProgressBar>
        </template>
        <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4"></Slider>
            <div class="flex items-center justify-between px-2">
                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
        </template>
    </Column>
    <Column headerStyle="width: 5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body>
            <Button type="button" icon="pi pi-cog" rounded />
        </template>
    </Column>
</DataTable>
```
### Products [#](_datatable_.md#dtproducts)

CRUD implementation example with a Dialog.
```
<Toolbar class="mb-6">
    <template #start>
        <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
    </template>
    <template #end>
        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
        <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
    </template>
</Toolbar>
<DataTable
    ref="dt"
    v-model:selection="selectedProducts"
    :value="products"
    dataKey="id"
    :paginator="true"
    :rows="10"
    :filters="filters"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
>
    <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between">
            <h4 class="m-0">Manage Products</h4>
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Search..." />
            </IconField>
        </div>
    </template>
    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
    <Column field="code" header="Code" sortable style="min-width: 12rem"></Column>
    <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
    <Column header="Image">
        <template #body="slotProps">
            <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
        </template>
    </Column>
    <Column field="price" header="Price" sortable style="min-width: 8rem">
        <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
        </template>
    </Column>
    <Column field="category" header="Category" sortable style="min-width: 10rem"></Column>
    <Column field="rating" header="Reviews" sortable style="min-width: 12rem">
        <template #body="slotProps">
            <Rating :modelValue="slotProps.data.rating" :readonly="true" />
        </template>
    </Column>
    <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
        <template #body="slotProps">
            <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
        </template>
    </Column>
    <Column :exportable="false" style="min-width: 12rem">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
        </template>
    </Column>
</DataTable>
```
## Accessibility [#](_datatable_.md#accessibility)

### Screen Reader

DataTable uses a _table_ element whose attributes can be extended with the _tableProps_ option. This property allows passing aria roles and attributes like _aria-label_ and _aria-describedby_ to define the table for readers. Default role of the table is _table_. Header, body and footer elements use _rowgroup_, rows use _row_ role, header cells have _columnheader_ and body cells use _cell_ roles. Sortable headers utilizer _aria-sort_ attribute either set to "ascending" or "descending".

Built-in checkbox and radiobutton components for row selection use _checkbox_ and _radiobutton_. The label to describe them is retrieved from the _aria.selectRow_ and _aria.unselectRow_ properties of the [locale](_configuration_.md#locale) API. Similarly header checkbox uses _selectAll_ and _unselectAll_ keys. When a row is selected, _aria-selected_ is set to true on a row.

The element to expand or collapse a row is a _button_ with _aria-expanded_ and _aria-controls_ properties. Value to describe the buttons is derived from _aria.expandRow_ and _aria.collapseRow_ properties of the [locale](_configuration_.md#locale) API.

The filter menu button use _aria.showFilterMenu_ and _aria.hideFilterMenu_ properties as _aria-label_ in addition to the _aria-haspopup_, _aria-expanded_ and _aria-controls_ to define the relation between the button and the overlay. Popop menu has _dialog_ role with _aria-modal_ as focus is kept within the overlay. The operator dropdown use _aria.filterOperator_ and filter constraints dropdown use _aria.filterConstraint_ properties. Buttons to add rules on the other hand utilize _aria.addRule_ and _aria.removeRule_ properties. The footer buttons similarly use _aria.clear_ and _aria.apply_ properties. _filterInputProps_ of the Column component can be used to define aria labels for the built-in filter components, if a custom component is used with templating you also may define your own aria labels as well.

Editable cells use custom templating so you need to manage aria roles and attributes manually if required. The row editor controls are button elements with _aria.editRow_, _aria.cancelEdit_ and _aria.saveEdit_ used for the _aria-label_.

Paginator is a standalone component used inside the DataTable, refer to the [paginator](_paginator_.md) for more information about the accessibility features.

### Keyboard Support

Any button element inside the DataTable used for cases like filter, row expansion, edit are tabbable and can be used with _space_ and _enter_ keys.

### Sortable Headers Keyboard Support

Key

Function

_tab_

Moves through the headers.

_enter_

Sorts the column.

_space_

Sorts the column.

### Filter Menu Keyboard Support

Key

Function

_tab_

Moves through the elements inside the popup.

_escape_

Hides the popup.

### Selection Keyboard Support

Key

Function

_tab_

Moves focus to the first selected row, if there is none then first row receives the focus.

_up arrow_

Moves focus to the previous row.

_down arrow_

Moves focus to the next row.

_enter_

Toggles the selected state of the focused row depending on the metaKeySelection setting.

_space_

Toggles the selected state of the focused row depending on the metaKeySelection setting.

_home_

Moves focus to the first row.

_end_

Moves focus to the last row.

_shift_ + _down arrow_

Moves focus to the next row and toggles the selection state.

_shift_ + _up arrow_

Moves focus to the previous row and toggles the selection state.

_shift_ + _space_

Selects the rows between the most recently selected row and the focused row.

_control_ + _shift_ + _home_

Selects the focused rows and all the options up to the first one.

_control_ + _shift_ + _end_

Selects the focused rows and all the options down to the last one.

_control_ + _a_

Selects all rows.