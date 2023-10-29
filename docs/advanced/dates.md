# Date & Time Formatting

FlipClock.js provides basic date and time formatting. Use the following formatting strings on clock faces that support it.

`YY` - Outputs a 2 digit year `23` \
`YYYY` - Outputs a 4 digit year `2023`

`M` - Outputs a 1 digit month `1` \
`MM` - Outputs a 2 digit year `01`

`D` - Outputs a 1 digit day `1` \
`DD` - Outputs a 2 digit day `01`

`H` - Outputs a 1 digit 24-hour time `1` \
`HH` - Outputs a 2 digit 24-hour time `01`

`h` - Outputs a 1 digit 12-hour time `1` \
`hh` - Outputs a 2 digit 12-hour time `01`


`m` - Outputs a 1 digit minute `1` \
`mm` - Outputs a 2 digit minute `01`

`s` - Outputs a 1 digit second `1` \
`ss` - Outputs a 2 digit second `01`

`v` - Outputs a 1 digit millisecond `1` \
`vv` - Outputs a 2 digit millisecond `01` \
`vvv` - Outputs a 3 digit millisecond `001` \
`vvvv` - Outputs a 4 digit millisecond `0001`

### Special Characters

` `&nbsp;- A space notates a new group. Groups can be used to group similar formats. This mostly has to do with how the DOM structure is rendered.

*NOTE, any character character will be output as a string literal.*

::: tip
It is not the goal of FlipClock.js to provide comprehensive date formatting, it does provide basic date and time parsing that should be familiar to libraries like moment.js. If you wish to use [moment.js](https://momentjs.com/) or a similar library, you are free to do so.
:::
