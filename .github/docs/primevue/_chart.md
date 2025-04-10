---
url: https://primevue.org/chart
scrapeDate: 2025-04-09T00:37:01.860Z
library: primevue

exactVersionMatch: false
---

## Chart

Chart components are based on Chart.js, an open source HTML5 based charting library.

## Import [#](_chart_.md#import)
```
import Chart from 'primevue/chart';
```
## Chart.js [#](_chart_.md#chartjs)

Chart component uses [Chart.JS](https://chartjs.org/) underneath so it needs to be installed as a dependency.

## Basic [#](_chart_.md#basic)

A chart is configured with 3 properties; _type_, _data_ and _options_. Chart type is defined using the _type_ property that accepts _pie_, _doughtnut_, _line_, _bar_, _radar_ and _polarArea_ as a value. The _data_ defines datasets represented with the chart and the _options_ provide numerous customization options to customize the presentation.
```
<Chart type="bar" :data="chartData" :options="chartOptions" />
```
## Pie [#](_chart_.md#pie)

A pie chart is a circular statistical graphic which is divided into slices to illustrate numerical proportion.
```
<Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
```
## Doughnut [#](_chart_.md#doughnut)

A doughnut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a whole to be included.
```
<Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
```
## Vertical Bar [#](_chart_.md#vertical)

A bar chart or bar graph is a chart that presents grouped data with rectangular bars with lengths proportional to the values that they represent.
```
<Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"  />
```
## Horizontal Bar [#](_chart_.md#horizontal)

A bar chart is rendered horizontally when _indexAxis_ option is set as _y_.
```
<Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"  />
```
## Stacked Bar [#](_chart_.md#stacked)

Bars can be stacked on top of each other when _stacked_ option of a scale is enabled.
```
<Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
```
## Line [#](_chart_.md#line)

A line chart or line graph is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments.
```
<Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
```
## Multi Axis [#](_chart_.md#multiaxis)

Multiple axes can be added using the _scales_ option.
```
<Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
```
## Line Styles [#](_chart_.md#linestyles)

Various styles of a line series can be customized to display customizations like an area chart.
```
<Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
```
## Polar Area [#](_chart_.md#polararea)

Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.
```
<Chart type="polarArea" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
```
## Radar [#](_chart_.md#radar)

A radar chart is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.
```
<Chart type="radar" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
```
## Combo [#](_chart_.md#combo)

Different chart types can be combined in the same graph usign the _type_ option of a dataset.
```
<Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
```
## Accessibility [#](_chart_.md#accessibility)

### Screen Reader

Chart components internally use _canvas_ element, refer to the [Chart.js accessibility](https://www.chartjs.org/docs/latest/general/accessibility.html) guide for more information. The canvas element can be customized with _canvasProps_ property to define aria roles and properties, in addition any content inside the component is directly passed as a child of the canvas to be able to provide fallback content like a table.
```
<Chart type="line" :data="data" :canvasProps="{'role': 'img', 'aria-label': 'Data'}" />
```