import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, useThemeColor } from './Themed'
import { Pressable, StyleSheet, ViewProps } from 'react-native'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { useState } from 'react'
import Colors from '@/constants/Colors'

export type CheckboxProps = Omit<IconProps<''>, 'name' | 'color'> & {
  value?: boolean
  onChange?: (value: boolean) => void
  color?: (isChecked: boolean) => string
  label?: string
  containerProps?: ViewProps
}

export default function Checkbox(props: CheckboxProps) {
  const { value, onChange, color, label, containerProps, ...otherProps } = props

  const [isChecked, setIsChecked] = useState(value ?? false)

  const handlePress = () => {
    setIsChecked(!isChecked)
    onChange?.(!isChecked)
  }

  const inactiveCheckboxColor = useThemeColor(
    {
      dark: Colors.dark.tint
    },
    'textSecondary'
  )
  const activeCheckboxColor = useThemeColor({}, 'tint')

  const _value = value !== undefined ? value : isChecked

  const defaultColor = _value ? activeCheckboxColor : inactiveCheckboxColor

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      {...props.containerProps}
    >
      <MaterialCommunityIcons
        name={_value ? 'checkbox-marked' : 'checkbox-blank-outline'}
        color={props.color ? props.color(_value) : defaultColor}
        size={28}
        {...otherProps}
      />
      {props.label && <Text style={styles.checkboxLabel}>{props.label}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxLabel: {
    marginLeft: 16,
    fontSize: 12
  }
})
