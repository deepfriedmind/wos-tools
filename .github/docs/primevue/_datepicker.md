---
url: https://primevue.org/datepicker
scrapeDate: 2025-04-09T00:36:31.222Z
library: primevue

exactVersionMatch: false
---

## DatePicker

DatePicker is a form component for date inputs.

## Import [#](_datepicker_.md#import)
```
import DatePicker from 'primevue/datepicker';
```
## Basic [#](_datepicker_.md#basic)

DatePicker is used with the _v-model_ property for two-way value binding.
```
<DatePicker v-model="date" />
```
## Forms [#](_datepicker_.md#forms)

DatePicker integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <DatePicker name="date" fluid />
        <Message v-if="$form.date?.invalid" severity="error" size="small" variant="simple">{{ $form.date.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Format [#](_datepicker_.md#format)

Default date format is _mm/dd/yy_ which can be customized using the _dateFormat_ property. Following options can be a part of the format.
*   _d_ - day of month (no leading zero)
*   _dd_ - day of month (two digit)
*   _o_ - day of the year (no leading zeros)
*   _oo_ - day of the year (three digit)
*   _D_ - day name short
*   _DD_ - day name long
*   _m_ - month of year (no leading zero)
*   _mm_ - month of year (two digit)
*   _M_ - month name short
*   _MM_ - month name long
*   _y_ - year (two digit)
*   _yy_ - year (four digit)
*   _@_ - Unix timestamp (ms since 01/01/1970)
*   _!_ - Windows ticks (100ns since 01/01/0001)
*   _'...'_ - literal text
*   _''_ - single quote
*   _anything else_ - literal text
```
<DatePicker v-model="date" dateFormat="dd/mm/yy" />
```
## Locale [#](_datepicker_.md#locale)

Locale for different languages and formats is defined globally, refer to the [PrimeVue Locale](_configuration_.md#locale) configuration for more information.

## Icon [#](_datepicker_.md#icon)

An additional icon is displayed next to the input field when _showIcon_ is present.

Button

Default Icon

Custom Icon
```
<DatePicker v-model="buttondisplay" showIcon fluid :showOnFocus="false" />
<DatePicker v-model="icondisplay" showIcon fluid iconDisplay="input" />
<DatePicker v-model="templatedisplay" showIcon fluid iconDisplay="input" timeOnly>
    <template #inputicon="slotProps">
        <i class="pi pi-clock" @click="slotProps.clickCallback" />
    </template>
</DatePicker>
```
## Min / Max [#](_datepicker_.md#minmax)

Boundaries for the permitted dates that can be entered are defined with _minDate_ and _maxDate_ properties.
```
<DatePicker v-model="date" :minDate="minDate" :maxDate="maxDate" :manualInput="false" />
```
## Multiple [#](_datepicker_.md#multiple)

In order to choose multiple dates, set _selectionMode_ as _multiple_. In this mode, the value binding should be an array.
```
<DatePicker v-model="dates" selectionMode="multiple" :manualInput="false" />
```
## Range [#](_datepicker_.md#range)

A range of dates can be selected by defining _selectionMode_ as _range_, in this case the bound value would be an array with two values where first date is the start of the range and second date is the end.
```
<DatePicker v-model="dates" selectionMode="range" :manualInput="false" />
```
## Button Bar [#](_datepicker_.md#button)

When _showButtonBar_ is present, today and clear buttons are displayed at the footer.
```
<DatePicker v-model="date" showButtonBar />
```
## Time [#](_datepicker_.md#time)

A time picker is displayed when _showTime_ is enabled where 12/24 hour format is configured with _hourFormat_ property. In case, only time needs to be selected, add _timeOnly_ to hide the date section.

12h Format

24h Format

Time Only
```
<DatePicker id="datepicker-12h" v-model="datetime12h" showTime hourFormat="12" fluid />
<DatePicker id="datepicker-24h" v-model="datetime24h" showTime hourFormat="24" fluid />
<DatePicker id="datepicker-timeonly" v-model="time" timeOnly fluid />
```
## Month Picker [#](_datepicker_.md#monthpicker)

Month only picker is enabled by specifying _view_ as _month_ in addition to a suitable _dateFormat_.
```
<DatePicker v-model="date" view="month" dateFormat="mm/yy" />
```
## Year Picker [#](_datepicker_.md#yearpicker)

Specifying _view_ as _year_ in addition to a suitable _dateFormat_ enables the year picker.
```
<DatePicker v-model="date" view="year" dateFormat="yy" />
```
## Multiple Months [#](_datepicker_.md#multiplemonths)

Number of months to display is configured with the _numberOfMonths_ property.
```
<DatePicker v-model="date" :numberOfMonths="2" />
```
## Date Template [#](_datepicker_.md#datetemplate)

Custom content can be placed inside date cells with the _date_ slot that takes a Date as a parameter.
```
<DatePicker v-model="date">
    <template #date="slotProps">
        <strong v-if="slotProps.date.day > 10 && slotProps.date.day < 15" style="text-decoration: line-through">{{ slotProps.date.day }}</strong>
        <template v-else>{{ slotProps.date.day }}</template>
    </template>
</DatePicker>
```
## Inline [#](_datepicker_.md#inline)

DatePicker is displayed as a popup by default, add _inline_ property to customize this behavior.

Wk

Su

Mo

Tu

We

Th

Fr

Sa

13

30

31

1

2

3

4

5

14

6

7

8

9

10

11

12

15

13

14

15

16

17

18

19

16

20

21

22

23

24

25

26

17

27

28

29

30

1

2

3
```
<DatePicker v-model="date" inline showWeek class="w-full sm:w-[30rem]" />
```
## Filled [#](_datepicker_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<DatePicker v-model="date" variant="filled" />
```
## Float Label [#](_datepicker_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel>
    <DatePicker v-model="value1" inputId="over_label" showIcon iconDisplay="input" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel variant="in">
    <DatePicker v-model="value2" inputId="in_label" showIcon iconDisplay="input" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel variant="on">
    <DatePicker v-model="value3" inputId="on_label" showIcon iconDisplay="input" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_datepicker_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

Date
```
<IftaLabel>
    <DatePicker v-model="value" inputId="date" showIcon iconDisplay="input" variant="filled" />
    <label for="date">Date</label>
</IftaLabel>
```
## Sizes [#](_datepicker_.md#sizes)

DatePicker provides _small_ and _large_ sizes as alternatives to the base.
```
<DatePicker v-model="value1" size="small" placeholder="Small" showIcon iconDisplay="input" />
<DatePicker v-model="value2" placeholder="Normal" showIcon iconDisplay="input" />
<DatePicker v-model="value3" size="large" placeholder="Large" showIcon iconDisplay="input" />
```
## Invalid [#](_datepicker_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<DatePicker v-model="date1" :invalid="!date1" placeholder="Date" />
<DatePicker v-model="date2" :invalid="!date2" variant="filled" placeholder="Date" />
```
## Disabled [#](_datepicker_.md#disabled)

DatePicker is used a controlled input component with _v-model_ property.
```
<DatePicker v-model="date" disabled />
```
## Accessibility [#](_datepicker_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided via _label_ tag combined with _inputId_ prop or using _aria-labelledby_, _aria-label_ props. The input element has _combobox_ role in addition to _aria-autocomplete_ as "none", _aria-haspopup_ as "dialog" and _aria-expanded_ attributes. The relation between the input and the popup is created with _aria-controls_ attribute that refers to the id of the popup.

The optional datepicker button requires includes _aria-haspopup_, _aria-expanded_ for states along with _aria-controls_ to define the relation between the popup and the button. The value to read is retrieved from the _chooseDate_ key of the aria property from the [locale](_configuration_.md#locale) API. This label is also used for the _aria-label_ of the popup as well. When there is a value selected, it is formatted and appended to the label to be able to notify users about the current value.

Popup has a _dialog_ role along with _aria-modal_ and _aria-label_. The navigation buttons at the header has an _aria-label_ retrieved from the _prevYear_, _nextYear_, _prevMonth_, _nextMonth_, _prevDecade_ and _nextDecade_ keys of the locale aria API. Similarly month picker button uses the _chooseMonth_ and year picker button uses the _chooseYear_ keys.

Main date table uses _grid_ role that contains th elements with _col_ as the scope along with _abbr_ tag resolving to the full name of the month. Each date cell has an _aria-label_ referring to the full date value. Buttons at the footer utilize their readable labels as _aria-label_ as well. Selected date also receives the _aria-selected_ attribute.

Timepicker spinner buttons get their labels for _aria-label_ from the aria locale API using the _prevHour_, _nextHour_, _prevMinute_, _nextMinute_, _prevSecond_, _nextSecond_, _am_ and _pm_ keys.

DatePicker also includes a hidden section that is only available to screen readers with _aria-live_ as "polite". This element is updated when the selected date changes to instruct the user about the current date selected.
```
<label for="date1">Date</label>
<DatePicker inputId="date1" />
<span id="date2">Date</span>
<DatePicker aria-labelledby="date2" />
<DatePicker aria-label="Date" />
```
### Choose Date Button Keyboard Support

Key

Function

_space_

Opens popup and moves focus to the selected date, if there is none focuses on today.

_enter_

Opens popup and moves focus to the selected date, if there is none focuses on today.

### Popup Keyboard Support

Key

Function

_escape_

Closes the popup and moves focus to the input element.

_tab_

Moves focus to the next focusable element within the popup.

_shift_ + _tab_

Moves focus to the next focusable element within the popup.

### Header Buttons Keyboard Support

Key

Function

_enter_

Triggers the button action.

_space_

Triggers the button action.

### Date Grid Keyboard Support

Key

Function

_enter_

Selects the date, closes the popup and moves focus to the input element.

_space_

Closes the popup and moves focus to the input element.

_up arrow_

Moves focus to the same day of the previous week.

_alt_ + _up arrow_

Closes the popup and moves focus to the input element.

_down arrow_

Moves focus to the same day of the next week.

_right arrow_

Moves focus to the next day.

_left arrow_

Moves focus to the previous day.

_home_

Moves focus to the first day of the current week.

_end_

Moves focus to the last day of the current week.

_page up_

Changes the date to previous month in date picker mode. Moves to previous year in month picker mode and previous decade in year picker.

_shift_ + _page up_

Changes the date to previous year in date picker mode. Has no effect in month or year picker.

_page down_

Changes the date to next month in date picker mode. Moves to next year in month picker mode and next decade in year picker.

_shift_ + _page down_

Changes the date to next year in date picker mode. Has no effect in month or year picker.

### Footer Buttons Keyboard Support

Key

Function

_enter_

Triggers the button action.

_space_

Triggers the button action.