import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Image, Pressable, useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const customHeaderBackButton = (scheme?: 'dark' | 'light') => {
  return (props: NativeStackHeaderProps) => {
    const insets = useSafeAreaInsets()
    const globalScheme = useColorScheme()
    const _scheme = scheme || globalScheme
    return (
      <Pressable
        style={{
          position: 'absolute',
          zIndex: 10,
          top: insets.top,
          left: insets.left + 20,
          width: 32,
          height: 32
        }}
        onPress={() => props.navigation.goBack()}
      >
        <Image
          style={{
            width: 32,
            height: 32
          }}
          source={
            _scheme === 'dark'
              ? require('@/assets/images/back-arrow-light-icon.png')
              : require('@/assets/images/back-arrow-dark-icon.png')
          }
        />
      </Pressable>
    )
  }
}

const HeaderBackButton = customHeaderBackButton()

export default HeaderBackButton
