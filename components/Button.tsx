import { Pressable, PressableProps, View } from 'react-native'
import { Text, useThemeColor } from './Themed'
import Colors from '@/constants/Colors'
import { Ref, forwardRef } from 'react'

export type ButtonProps = PressableProps & { children: React.ReactNode } & {
  variant?: 'filled' | 'outlined' | 'tonal' | 'text'
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
  }
}
export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<View>
) {
  const { variant = 'filled', style, ...otherProps } = props

  const isStyleObject = typeof style === 'object'

  const backgroundThemeKey = buttonColorConfig[variant].background
  const textThemeKey = buttonColorConfig[variant].text
  const borderThemeKey = buttonColorConfig[variant].border

  const backgroundColor = useThemeColor({}, backgroundThemeKey)
  const textColor = useThemeColor({}, textThemeKey)
  const borderColor = useThemeColor({}, borderThemeKey)

  return (
    <Pressable
      ref={ref}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        padding: 15,
        borderRadius: 99,
        alignItems: 'center',
        borderWidth: variant === 'outlined' ? 1 : 0,
        borderColor,
        backgroundColor,
        ...(isStyleObject ? style : {})
      })}
      {...otherProps}
    >
      <Text style={{ fontWeight: 'bold', color: textColor }}>
        {props.children}
      </Text>
    </Pressable>
  )
})
