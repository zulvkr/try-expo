import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import { View, useThemeColor } from './Themed'
import { TextInput as DefaultTextInput, StyleSheet } from 'react-native'
import { useState } from 'react'

export type TextInputProps = DefaultTextInput['props'] & {
  renderLeft?: (isFocused: boolean) => React.ReactNode
  renderRight?: (isFocused: boolean) => React.ReactNode
} & { containerProps?: ViewProps }

export function TextInput(props: TextInputProps) {
  const { style, containerProps, onFocus, onBlur, ...otherProps } = props
  const { style: containerStyle, ...otherContainerProps } = containerProps ?? {}
  const backgroundColor = useThemeColor({}, 'textInputBackground')
  const color = useThemeColor({}, 'text')
  const placeholderTextColor = useThemeColor({}, 'placeholderText')

  const [isFocused, setIsFocused] = useState(false)

  const textInputFocusedBorderColor = useThemeColor({}, 'textActiveInputBorder')
  const textInputFocusedBackgroundColor = useThemeColor(
    {},
    'textActiveInputBackground'
  )

  return (
    <View
      style={[
        styles.textInputContainer,
        { backgroundColor, borderColor: backgroundColor },
        isFocused && {
          borderColor: textInputFocusedBorderColor,
          backgroundColor: textInputFocusedBackgroundColor
        },
        containerStyle
      ]}
      {...otherContainerProps}
    >
      {props.renderLeft?.(isFocused)}
      <DefaultTextInput
        style={[styles.textInput, { color }, style]}
        placeholderTextColor={placeholderTextColor}
        onFocus={e => {
          setIsFocused(true)
          onFocus?.(e)
        }}
        onBlur={e => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        {...otherProps}
      />
      {props.renderRight?.(isFocused)}
    </View>
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1
  },
  textInput: {
    flex: 1,
    paddingVertical: 12
  }
})
