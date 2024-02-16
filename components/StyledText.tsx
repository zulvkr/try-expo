import { Ref, forwardRef } from 'react'
import { Text, TextProps, useThemeColor } from './Themed'

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />
}

// export function SecondaryText(props: TextProps) {
//   const color = useThemeColor({}, 'textSecondary')
//   return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />
// }

export const SecondaryText = forwardRef((props: TextProps, ref: Ref<Text>) => {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    'textSecondary'
  )

  return <Text {...otherProps} ref={ref} style={[{ color }, style]} />
})
