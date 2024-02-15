import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
  ViewStyle
} from 'react-native'
import { Text, useThemeColor } from './Themed'
import Colors from '@/constants/Colors'
import { Ref, forwardRef } from 'react'

export type ButtonProps = Omit<
  PressableProps & { children: React.ReactNode },
  'style'
> & {
  variant?: 'filled' | 'outlined' | 'tonal' | 'text'
} & { style?: ViewStyle } & {
  renderLeft?: () => React.ReactNode
  renderRight?: () => React.ReactNode
} & {
  disabled?: boolean
  loading?: boolean
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
      disabled={props.loading || props.disabled}
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
          minHeight: 22,
          alignItems: 'center'
        }}
      >
        {props.renderLeft?.()}
        {props.loading ? (
          <ActivityIndicator size={22} color={textColor} />
        ) : (
          <Text style={{ fontWeight: 'bold', color: textColor }}>
            {props.children}
          </Text>
        )}
        {props.renderRight?.()}
      </View>
    </Pressable>
  )
})

export type IconButtonProps = Omit<
  PressableProps & { children: React.ReactNode },
  'style'
> & { style?: ViewStyle }

export const IconButton = forwardRef(function IconButton(
  props: ButtonProps,
  ref: Ref<View>
) {
  const { style, ...otherProps } = props

  return (
    <Pressable
      ref={ref}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        height: 32,
        width: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        ...(style ?? {})
      })}
      {...otherProps}
    >
      <Text
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.children}
      </Text>
    </Pressable>
  )
})
