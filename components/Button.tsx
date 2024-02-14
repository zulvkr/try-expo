import { Pressable, PressableProps, View, ViewStyle } from 'react-native'
import { Text, useThemeColor } from './Themed'
import Colors from '@/constants/Colors'
import { Ref, forwardRef } from 'react'

export type ButtonProps = Omit<
  PressableProps & { children: React.ReactNode } & {
    variant?: 'filled' | 'outlined' | 'tonal' | 'text'
  },
  'style'
> & { style?: ViewStyle } & {
  renderLeft?: () => React.ReactNode
  renderRight?: () => React.ReactNode
} & {
  disabled?: boolean
}

type keyOfColor = keyof typeof Colors.light & keyof typeof Colors.dark

type buttonColorConfig = {
  background: keyOfColor
  text: keyOfColor
  border: keyOfColor
}

const buttonColorConfig: Record<string, buttonColorConfig> = {
  filled: {
    text: 'filledButtonTextColor',
    background: 'filledButtonColor',
    border: 'background'
  },
  outlined: {
    text: 'outlineButtonColor',
    border: 'outlineButtonColor',
    background: 'background'
  },
  tonal: {
    text: 'tonalButtonTextColor',
    background: 'tonalButtonColor',
    border: 'background'
  },
  disabled: {
    text: 'textSecondary',
    background: 'textInputBackground',
    border: 'background'
  }
}

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<View>
) {
  const { variant = 'filled', style, ...otherProps } = props

  const backgroundThemeKey =
    buttonColorConfig[props.disabled ? 'disabled' : variant].background
  const textThemeKey = buttonColorConfig[variant].text
  const borderThemeKey = buttonColorConfig[variant].border

  const backgroundColor = useThemeColor({}, backgroundThemeKey)
  const textColor = useThemeColor({}, textThemeKey)
  const borderColor = useThemeColor({}, borderThemeKey)

  return (
    <Pressable
      disabled={props.disabled}
      ref={ref}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        padding: 15,
        paddingVertical: 18,
        borderRadius: 99,
        alignItems: 'center',
        borderWidth: variant === 'outlined' ? 1 : 0,
        borderColor,
        backgroundColor,
        ...(style ?? {})
      })}
      {...otherProps}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.renderLeft?.()}
        <Text style={{ fontWeight: 'bold', color: textColor }}>
          {props.children}
        </Text>
        {props.renderRight?.()}
      </View>
    </Pressable>
  )
})
