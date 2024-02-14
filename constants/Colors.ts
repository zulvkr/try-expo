const tintColorLight = '#B80C93'
const tintColorDark = '#B70093'
const tintColorForegroundLight = '#fff'
const tintColorForegroundDark = '#fff'

const tonalColorLight = '#FFDBF8'
const tonalColorDark = '#401137'
const tonalColorForegroundLight = '#B70093'
const tonalColorForegroundDark = '#EA01BD'

const gray100 = '#F4F4F4'
const gray500 = '#9E9E9E'

const slate900 = '#22262F'
const slate500 = '#5E707D'

export type ColorScheme = {
  text: string
  textSecondary: string
  placeholderText: string
  textInputBorder: string
  background: string
  tint: string
  tabIconDefault: string
  tabIconSelected: string
  buttonColor: string
  buttonTextColor: string
  filledButtonColor: string
  filledButtonTextColor: string
  tonalButtonColor: string
  tonalButtonTextColor: string
  outlineButtonColor: string
}

const light: ColorScheme = {
  text: '#000',
  textSecondary: gray500,
  placeholderText: gray500,
  textInputBorder: gray500,
  background: '#fff',
  tint: tintColorLight,
  tabIconDefault: gray500,
  tabIconSelected: tintColorLight,
  buttonColor: tintColorLight,
  buttonTextColor: tintColorForegroundLight,
  filledButtonColor: tintColorLight,
  filledButtonTextColor: tintColorForegroundLight,
  tonalButtonColor: tonalColorLight,
  tonalButtonTextColor: tonalColorForegroundLight,
  outlineButtonColor: tintColorLight
}

const dark: ColorScheme = {
  text: '#fff',
  textSecondary: slate500,
  placeholderText: slate500,
  textInputBorder: slate500,
  background: '#181A20',
  tint: tintColorDark,
  tabIconDefault: slate500,
  tabIconSelected: tintColorDark,
  buttonColor: tintColorDark,
  buttonTextColor: tintColorForegroundDark,
  filledButtonColor: tintColorDark,
  filledButtonTextColor: tintColorForegroundDark,
  tonalButtonColor: tonalColorDark,
  tonalButtonTextColor: tonalColorForegroundDark,
  outlineButtonColor: tintColorDark
}

export default {
  light,
  dark
}
