/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput
} from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from './useColorScheme'
import { Ref, forwardRef } from 'react'

export type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps &
  DefaultText['props'] & { secondary?: boolean }
export type ViewProps = ThemeProps & DefaultView['props']
export type TextInputProps = ThemeProps & DefaultTextInput['props']

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light'
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

export const Text = forwardRef((props: TextProps, ref: Ref<any>) => {
  const { style, lightColor, darkColor, secondary, ...otherProps } = props
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    secondary ? 'textSecondary' : 'text'
  )

  return <DefaultText style={[{ color }, style]} {...otherProps} ref={ref} />
})

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
