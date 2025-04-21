Your task involves using the Day.js library to manipulate dates and times in Vue with TypeScript.

Requirements:

- Check the documentation below for the functions/features you need to use.
- Use dayjs via `const dayjs = useDayjs()`.
- Inside `<template>` you can use `$dayjs()` directly.
- Do not add imports from dayjs, it's auto-imported by the framework.

# Day.js docs

> Fast 2kB alternative to Moment.js with the same modern API

## Customization

- [Calendar](../docs/dayjs/customization/calendar.md): `Locale#calendar` should have the following formatting strings.
- [Customize](../docs/dayjs/customization/customization.md): Day.js is very easy to customize.
- [Month Abbreviations](../docs/dayjs/customization/month-abbreviations.md): `Locale#monthsShort` should be an array of the month abbreviations.
- [Month Names](../docs/dayjs/customization/month-names.md): `Locale#months` should be an array of the month names.
- [Relative Time](../docs/dayjs/customization/relative-time.md): `Locale#relativeTime` should be an object of the replacement strings for `dayjs#from`.
- [Weekday Abbreviations](../docs/dayjs/customization/weekday-abbreviations.md): `Locale#weekdaysShort` should be an array of the weekdays abbreviations.
- [Minimal Weekday Abbreviations](../docs/dayjs/customization/weekday-min.md): `Locale#weekdaysMin` should be an array of two letter weekday abbreviations.
- [Weekday Names](../docs/dayjs/customization/weekday-names.md): `Locale#weekdays` should be an array of the weekdays names.

## Display

- [As Array](../docs/dayjs/display/as-array.md): Returns an array that mirrors the parameters
- [As ISO 8601 String](../docs/dayjs/display/as-iso-string.md): To format as an ISO 8601 string.
- [As Javascript Date](../docs/dayjs/display/as-javascript-date.md): To get a copy of the native `Date` object parsed from the Day.js object use `dayjs#toDate`.
- [As JSON](../docs/dayjs/display/as-json.md): To serialize as an ISO 8601 string.
- [As Object](../docs/dayjs/display/as-object.md): Returns an object with the date's properties.
- [As String](../docs/dayjs/display/as-string.md): Returns a string representation of the date.
- [Calendar Time](../docs/dayjs/display/calendar-time.md): Calendar time displays time relative to a given reference time (defaults to now) but does so slightly differently than `dayjs#fromNow`.
- [Days in Month](../docs/dayjs/display/days-in-month.md): Get the number of days in the current month.
- [Difference](../docs/dayjs/display/difference.md): This indicates the difference between two date-time in the specified unit.
- [Display](../docs/dayjs/display/display.md): Once parsing and manipulation are done, you need some way to display the Day.js object.
- [Format](../docs/dayjs/display/format.md): Get the formatted date according to the string of tokens passed in.
- [Time from now](../docs/dayjs/display/from-now.md): Returns the string of relative time from now.
- [Time from X](../docs/dayjs/display/from.md): Returns the string of relative time from X.
- [Time to now](../docs/dayjs/display/to-now.md): Returns the string of relative time to now.
- [Time to X](../docs/dayjs/display/to.md): Returns the string of relative time to X.
- [Unix Timestamp (milliseconds)](../docs/dayjs/display/unix-timestamp-milliseconds.md): This returns the number of milliseconds since the Unix Epoch of the Day.js object.
- [Unix Timestamp](../docs/dayjs/display/unix-timestamp.md): This returns the Unix timestamp (the number of seconds since the Unix Epoch) of the Day.js object.

## Durations

- [Add Time](../docs/dayjs/durations/add.md): Returns a cloned duration object with a specified amount of time added.
- [As ISO 8601 String](../docs/dayjs/durations/as-iso-string.md): Returns duration in string as specified by ISO 8601 standard.
- [As JSON](../docs/dayjs/durations/as-json.md): When serializing a duration object to JSON, it will be represented as an ISO8601 string.
- [As Unit of Time](../docs/dayjs/durations/as.md): As an alternate to `Duration#asX`, you can use `Duration#as('x')`.
- [Clone](../docs/dayjs/durations/clone.md): Create a clone of a duration. Durations are immutable, just like Day.js object objects. Still, this lets you get a snapshot, at some point in time.
- [Creating](../docs/dayjs/durations/creating.md): To create a duration, call `dayjs.duration()` with the length of time in milliseconds.
- [Days](../docs/dayjs/durations/days.md): As with the other getters for durations, `dayjs.duration().days()` gets the days (0 - 30).
- [Using Duration with Diff](../docs/dayjs/durations/diffing.md): You can also use duration with `dayjs#diff` to get the duration between two date times. To do so, simply pass the `dayjs#diff` method into `dayjs#duration` as follows:
- [Durations](../docs/dayjs/durations/durations.md): Day.js also has duration objects. Where a Day.js object is defined as single points in time, durations are defined as a length of time.
- [Format](../docs/dayjs/durations/format.md): Get the formatted duration according to the string of tokens passed in.
- [Get Unit of Time](../docs/dayjs/durations/get.md): As an alternate to `Duration#x()` getters, you can use `Duration#get('x')`.
- [Hours](../docs/dayjs/durations/hours.md): As with the other getters for durations, `dayjs.duration().hours()` gets the hours (0 - 23).
- [Humanize](../docs/dayjs/durations/humanize.md): Sometimes, you want all the goodness of `dayjs#from` but you don't want to have to create two Day.js objects, you just want to display a length of time.
- [Is a Duration](../docs/dayjs/durations/is-a-duration.md): To check if a variable is a Day.js duration object, use `dayjs.isDuration()`.
- [Locale](../docs/dayjs/durations/locale.md): You can get or set the locale of a duration using `locale`. The locale will affect the duration's string methods, like `humanize()`. See the i18n section for more information on internationalization generally.
- [Milliseconds](../docs/dayjs/durations/milliseconds.md): To get the number of milliseconds in a duration, use `dayjs.duration().milliseconds()`.
- [Minutes](../docs/dayjs/durations/minutes.md): As with the other getters for durations, `dayjs.duration().minutes()` gets the minutes (0 - 59).
- [Months](../docs/dayjs/durations/months.md): As with the other getters for durations, `dayjs.duration().months()` gets the months (0 - 11).
- [Seconds](../docs/dayjs/durations/seconds.md): To get the number of seconds in a duration, use `dayjs.duration().seconds()`.
- [Subtract Time](../docs/dayjs/durations/subtract.md): Returns a cloned duration object with a specified amount of time subtracted.
- [Weeks](../docs/dayjs/durations/weeks.md): As with the other getters for durations, `dayjs.duration().weeks()` gets the weeks (0 - 4).
- [Years](../docs/dayjs/durations/years.md): As with the other getters for durations, `dayjs.duration().years()` gets the years.

## Get Set

- [Date of Month](../docs/dayjs/get-set/date.md): Gets or sets the day of the month.
- [Day of Year](../docs/dayjs/get-set/day-of-year.md): Gets or sets the day of the year.
- [Day of Week](../docs/dayjs/get-set/day.md): Gets or sets the day of the week.
- [Get + Set](../docs/dayjs/get-set/get-set.md): Day.js uses overloaded getters and setters, that is to say, calling these methods without parameters acts as a getter, and calling them with a parameter acts as a setter.
- [Get](../docs/dayjs/get-set/get.md): String getter, returns the corresponding information getting from Day.js object.
- [Hour](../docs/dayjs/get-set/hour.md): Gets or sets the hour.
- [Week Year (ISO)](../docs/dayjs/get-set/iso-week-year.md): Gets the ISO week-year.
- [Week of Year (ISO)](../docs/dayjs/get-set/iso-week.md): Gets or sets the ISO week of the year.
- [ISO Day of Week](../docs/dayjs/get-set/iso-weekday.md): Gets or sets the ISO day of the week with 1 being Monday and 7 being Sunday.
- [Weeks In Year (ISO)](../docs/dayjs/get-set/iso-weeks-in-year.md): Gets the number of weeks in the current year, according to ISO weeks.
- [Maximum](../docs/dayjs/get-set/max.md): Returns the maximum (most distant future) of the given Day.js instances. This accepts both multiple arguments and array that contains Day.js instance.
- [Millisecond](../docs/dayjs/get-set/millisecond.md): Gets or sets the millisecond.
- [Minimum](../docs/dayjs/get-set/min.md): Returns the minimum (most distant past) of the given Day.js instances.
- [Minute](../docs/dayjs/get-set/minute.md): Gets or sets the minutes.
- [Month](../docs/dayjs/get-set/month.md): Gets or sets the month.
- [Quarter](../docs/dayjs/get-set/quarter.md): Gets or sets the quarter.
- [Second](../docs/dayjs/get-set/second.md): Gets or sets the second.
- [Set](../docs/dayjs/get-set/set.md): Generic setter, accepting unit as first argument, and value as second, returns a new instance with the applied changes.
- [Week Year](../docs/dayjs/get-set/week-year.md): Gets the week-year according to the locale.
- [Week of Year](../docs/dayjs/get-set/week.md): Gets or sets the week of the year.
- [Day of Week (Locale Aware)](../docs/dayjs/get-set/weekday.md): Gets or sets the day of the week according to the locale.
- [Year](../docs/dayjs/get-set/year.md): Gets or sets the year.

## I18n

- [Changing locale globally](../docs/dayjs/i18n/changing-locale.md): By default, Day.js comes with English locale **only**.
- [Checking the current Day.js locale](../docs/dayjs/i18n/getting-locale.md): This returns the locale of current instance.
- [i18n](../docs/dayjs/i18n/i18n.md): Day.js has great support for internationalization.
- [Changing locales locally](../docs/dayjs/i18n/instance-locale.md): A global locale configuration can be problematic when passing around date-times that may need to be formatted into different locale.
- [Listing the months and weekdays of the current locale](../docs/dayjs/i18n/listing-months-weekdays.md): To get the list of months or weekdays in a locale.
- [Loading locale in the browser](../docs/dayjs/i18n/loading-into-browser.md): Loading locale on demand.
- [Loading locale in NodeJS](../docs/dayjs/i18n/loading-into-nodejs.md): Loading locale on demand.
- [Accessing locale specific functionality](../docs/dayjs/i18n/locale-data.md): You can access the properties of the currently loaded locale through the `dayjs.localeData()` function, or `dayjs().localeData()` for current Day.js object.

## Installation

- [Browser](../docs/dayjs/installation/browser.md): #### CDN resource
- [Download](../docs/dayjs/installation/download.md): Download the latest version of Day.js at https://www.jsdelivr.com/package/npm/dayjs
- [Installation](../docs/dayjs/installation/installation.md): Day.js was designed to work both in the browser and in Node.js.
- [Node.js](../docs/dayjs/installation/node-js.md): To get started with Day.js in your Node.js project, simply add the dependency to your Node.js package manager.
- [TypeScript](../docs/dayjs/installation/typescript.md): Day.js ships with official type declarations for TypeScript in NPM package out of the box.

## Manipulate

- [Add](../docs/dayjs/manipulate/add.md): Returns a cloned Day.js object with a specified amount of time added.
- [End of Time](../docs/dayjs/manipulate/end-of.md): Returns a cloned Day.js object and set it to the end of a unit of time.
- [Local](../docs/dayjs/manipulate/local.md): This returns a Day.js object with a flag to use local time.
- [Manipulate](../docs/dayjs/manipulate/manipulate.md): Once you have a Day.js object, you may want to manipulate it in some way.
- [Start of Time](../docs/dayjs/manipulate/start-of.md): Returns a cloned Day.js object and set it to the start of a unit of time.
- [Subtract](../docs/dayjs/manipulate/subtract.md): Returns a cloned Day.js object with a specified amount of time subtracted.
- [UTC offset](../docs/dayjs/manipulate/utc-offset.md): Get the UTC offset in minutes.
- [UTC](../docs/dayjs/manipulate/utc.md): This returns a Day.js object with a flag to use UTC time.

## Parse

- [Array](../docs/dayjs/parse/array.md): You can create a Dayjs object with an array of numbers that mirror the parameters passed to `new Date()`
- [Date](../docs/dayjs/parse/date.md): Create a Day.js object with a pre-existing native Javascript `Date` object.
- [Dayjs Clone](../docs/dayjs/parse/dayjs-clone.md): All Day.js objects are **immutable**. Still, `dayjs#clone` can create a clone of the current object if you need one.
- [Validation](../docs/dayjs/parse/is-valid.md): Returns a `boolean` indicating whether the `Dayjs`'s date is valid.
- [Now](../docs/dayjs/parse/now.md): Calling `dayjs()` without parameters returns a fresh Day.js object with the current date and time.
- [Object](../docs/dayjs/parse/object.md): You can create a Dayjs object by specifying some of the units in an object.
- [Parse](../docs/dayjs/parse/parse.md): Instead of modifying the native `Date.prototype`, Day.js creates a wrapper for the `Date` object. To get this wrapper object, simply call `dayjs()` with one of the supported input types.
- [String + Format](../docs/dayjs/parse/string-format.md): If you know the format of an input string, you can use that to parse a date.
- [String](../docs/dayjs/parse/string.md): Parse the given string in ISO 8601 format (a space instead of the 'T' is allowed) and return a Day.js object instance.
- [Unix Timestamp (milliseconds)](../docs/dayjs/parse/unix-timestamp-milliseconds.md): Create a Day.js object by passing an integer value representing the number of milliseconds (13 digits, since the Unix Epoch Jan 1 1970 12AM UTC).
- [Unix Timestamp (seconds)](../docs/dayjs/parse/unix-timestamp.md): Create a Day.js object from a Unix timestamp (10 digits, seconds since the Unix Epoch).
- [UTC](../docs/dayjs/parse/utc.md): By default, Day.js parses and displays in local time.

## Plugin

- [AdvancedFormat](../docs/dayjs/plugin/advanced-format.md): AdvancedFormat extends `dayjs().format` API to supply more format options.
- [ArraySupport](../docs/dayjs/plugin/array-support.md): ArraySupport extends `dayjs()`, `dayjs.utc` APIs to support array argument.
- [BadMutable](../docs/dayjs/plugin/bad-mutable.md): Day.js is designed to be immutable, however, in order to make it fully compatible with moment.js in some legacy projects we introduced a plugin 🚨 BadMutable 🚨 to make Day.js mutable.
- [BigIntSupport](../docs/dayjs/plugin/bigint-support.md): BigIntSupport extends `dayjs()`, `dayjs.unix` APIs to support BigInt argument.
- [BuddhistEra](../docs/dayjs/plugin/buddhist-era.md): BuddhistEra extends `dayjs().format` API to supply Buddhist Era (B.E.) format options.
- [Calendar](../docs/dayjs/plugin/calendar.md): Calendar adds `.calendar` API to return a `string` to display calendar time
- [CustomParseFormat](../docs/dayjs/plugin/custom-parse-format.md): CustomParseFormat extends `dayjs()` constructor to support custom formats of input strings.
- [DayOfYear](../docs/dayjs/plugin/day-of-year.md): DayOfYear adds `.dayOfYear()` API to returns a `number` indicating the `Dayjs`'s day of the year, or to set the day of the year.
- [DevHelper](../docs/dayjs/plugin/dev-helper.md): DevHelper adds some helper function to give you more hints and warnings while using Day.js.
- [Duration](../docs/dayjs/plugin/duration.md): Duration adds `.duration` `.isDuration` APIs to support duration.
- [IsBetween](../docs/dayjs/plugin/is-between.md): IsBetween adds `.isBetween()` API to returns a `boolean` indicating if a date is between two other dates.
- [IsLeapYear](../docs/dayjs/plugin/is-leap-year.md): IsLeapYear adds `.isLeapYear` API to returns a `boolean` indicating whether the `Dayjs`'s year is a leap year or not.
- [IsSameOrAfter](../docs/dayjs/plugin/is-same-or-after.md): IsSameOrAfter adds `.isSameOrAfter()` API to return a `boolean` indicating if a date is the same or after another date.
- [IsSameOrBefore](../docs/dayjs/plugin/is-same-or-before.md): IsSameOrBefore adds `.isSameOrBefore()` API to returns a `boolean` indicating if a date is same or before another date.
- [IsToday](../docs/dayjs/plugin/is-today.md): IsToday adds `.isToday()` API to indicates whether the Day.js object is today or not.
- [IsTomorrow](../docs/dayjs/plugin/is-tomorrow.md): IsTomorrow adds `.isTomorrow()` API to indicates whether the Day.js object is tomorrow or not.
- [IsYesterday](../docs/dayjs/plugin/is-yesterday.md): IsYesterday adds `.isYesterday()` API to indicates whether the Day.js object is yesterday or not.
- [IsoWeek](../docs/dayjs/plugin/iso-week.md): IsoWeek adds `.isoWeek()` API to get or set the ISO week of the year. And adds `.isoWeekday()` to get or set ISO day of the week and `.isoWeekYear()` to get ISO week-year, and extends `.startOf` `.endOf` APIs to support unit `isoWeek`.
- [IsoWeeksInYear](../docs/dayjs/plugin/iso-weeks-in-year.md): IsoWeeksInYear adds `.isoWeeksInYear()` API to return a `number` to get the number of weeks in year, according to ISO weeks.
- [Loading plugin in the browser](../docs/dayjs/plugin/loading-into-browser.md): Loading plugin on demand.
- [Loading plugin in NodeJS](../docs/dayjs/plugin/loading-into-nodejs.md): Loading plugin on demand.
- [LocaleData](../docs/dayjs/plugin/locale-data.md): LocaleData extends `dayjs().localeData` API to supply locale data.
- [LocalizedFormat](../docs/dayjs/plugin/localized-format.md): LocalizedFormat extends `dayjs().format` API to supply localized format options.
- [MinMax](../docs/dayjs/plugin/min-max.md): MinMax adds `.min` `.max` APIs to return a `dayjs` to compare given dayjs instances.
- [ObjectSupport](../docs/dayjs/plugin/object-support.md): ObjectSupport extends `dayjs()`, `dayjs.utc`, `dayjs().set`, `dayjs().add`, `dayjs().subtract` APIs to support object argument.
- [Plugin](../docs/dayjs/plugin/plugin.md): A plugin is an independent module that can be added to Day.js to extend functionality or add new features.
- [PluralGetSet](../docs/dayjs/plugin/plural-get-set.md): PluralGetSet adds plural getter & setter APIs `.milliseconds()`, `.seconds()`, `.minutes()`, `.hours()`, `.days()`, `.weeks()`, `.isoWeeks()`, `.months()`, `.quarters()`, `.years()`, `.dates()`.
- [PreParsePostFormat](../docs/dayjs/plugin/preparse-postformat.md): Pre-parse / Post-format lets you process the input before the parser and process the string output after the formatter. Based on similar behavior for locales in moment.js.
- [QuarterOfYear](../docs/dayjs/plugin/quarter-of-year.md): QuarterOfYear adds `.quarter()` API to return to which quarter of the year belongs a date, and extends `.add` `.subtract` `.startOf` `.endOf` APIs to support unit `quarter`.
- [RelativeTime](../docs/dayjs/plugin/relative-time.md): RelativeTime adds `.from` `.to` `.fromNow` `.toNow` APIs to formats date to relative time strings (e.g. 3 hours ago).
- [Timezone](../docs/dayjs/plugin/timezone.md): Timezone adds `dayjs.tz` `.tz` `.tz.guess` `.tz.setDefault` APIs to parse or display between time zones.
- [ToArray](../docs/dayjs/plugin/to-array.md): ToArray adds `.toArray()` API to return an `array` that mirrors the parameters
- [ToObject](../docs/dayjs/plugin/to-object.md): ToObject adds `.toObject()` API to return an `object` with the date's properties.
- [UpdateLocale](../docs/dayjs/plugin/update-locale.md): UpdateLocale adds `.updateLocale` API to update a locale's properties.
- [UTC](../docs/dayjs/plugin/utc.md): UTC adds `.utc` `.local` `.isUTC` APIs to parse or display in UTC.
- [weekOfYear](../docs/dayjs/plugin/week-of-year.md): WeekOfYear adds `.week()` API to returns a `number` indicating the `Dayjs`'s week of the year.
- [WeekYear](../docs/dayjs/plugin/week-year.md): WeekYear adds `.weekYear()` API to get locale aware week of the year.
- [Weekday](../docs/dayjs/plugin/weekday.md): Weekday adds `.weekday()` API to get or set locale aware day of the week.

## Query

- [Is a Dayjs](../docs/dayjs/query/is-a-dayjs.md): This indicates whether a variable is a Day.js object or not.
- [Is After](../docs/dayjs/query/is-after.md): This indicates whether the Day.js object is after the other supplied date-time.
- [Is Before](../docs/dayjs/query/is-before.md): This indicates whether the Day.js object is before the other supplied date-time.
- [Is Between](../docs/dayjs/query/is-between.md): This indicates whether the Day.js object is between two other supplied date-time.
- [Is Leap Year](../docs/dayjs/query/is-leap-year.md): This indicates whether the Day.js object's year is a leap year or not.
- [Is Same or After](../docs/dayjs/query/is-same-or-after.md): This indicates whether the Day.js object is the same or after another supplied date-time.
- [Is Same or Before](../docs/dayjs/query/is-same-or-before.md): This indicates whether the Day.js object is the same or before another supplied date-time.
- [Is Same](../docs/dayjs/query/is-same.md): This indicates whether the Day.js object is the same as the other supplied date-time.
- [Query](../docs/dayjs/query/query.md): There are several methods to query a Day.js object.

## Timezone

- [Converting to Zone](../docs/dayjs/timezone/converting-to-zone.md): Change the time zone and update the offset and return a Day.js object instance.
- [Guessing user zone](../docs/dayjs/timezone/guessing-user-timezone.md): Return the user's time zone.
- [Parsing in Zone](../docs/dayjs/timezone/parsing-in-zone.md): Parse date-time string in the given timezone and return a Day.js object instance.
- [Set Default Timezone](../docs/dayjs/timezone/set-default-timezone.md): Change default timezone from local time zone to your custom timezone.
- [Time Zone](../docs/dayjs/timezone/timezone.md): Day.js supports time zone via the Internationalization API in supported environments. By using the native API, no extra bytes of timezone data need to be included in code bundle.
