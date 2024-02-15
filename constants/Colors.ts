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
const red500 = '#FF453A'

const gray950 = '#181A20'
export const gray950rgba = [24, 26, 32, 1]

export type ColorScheme = {
  text: string
  textSecondary: string
  placeholderText: string
  textInputBorder: string
  textInputBackground: string
  textActiveInputBackground: string
  textActiveInputBorder: string
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
  errorText: string
}

const light: ColorScheme = {
  text: '#000',
  textSecondary: gray500,
  placeholderText: gray500,
  textInputBorder: gray500,
  textInputBackground: gray100,
  textActiveInputBackground: tonalColorLight,
  textActiveInputBorder: tintColorLight,
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
  outlineButtonColor: tintColorLight,
  errorText: red500
}

const dark: ColorScheme = {
  text: '#fff',
  textSecondary: slate500,
  placeholderText: slate500,
  textInputBorder: slate500,
  textInputBackground: slate900,
  textActiveInputBackground: tonalColorDark,
  textActiveInputBorder: tintColorDark,
  background: gray950,
  tint: tintColorDark,
  tabIconDefault: slate500,
  tabIconSelected: tintColorDark,
  buttonColor: tintColorDark,
  buttonTextColor: tintColorForegroundDark,
  filledButtonColor: tintColorDark,
  filledButtonTextColor: tintColorForegroundDark,
  tonalButtonColor: tonalColorDark,
  tonalButtonTextColor: tonalColorForegroundDark,
  outlineButtonColor: tintColorDark,
  errorText: red500
}

export default {
  light,
  dark
}
