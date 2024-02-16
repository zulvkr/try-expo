import { HeaderBackButtonProps } from '@react-navigation/elements'
import { useRouter } from 'expo-router'
import { Image, Pressable, useColorScheme } from 'react-native'

export const customHeaderBackButton = (scheme?: 'dark' | 'light') => {
  return (props: HeaderBackButtonProps) => {
    const globalScheme = useColorScheme()
    const router = useRouter()
    const _scheme = scheme || globalScheme
    return (
      <Pressable
        style={{
          zIndex: 10,
          width: 32,
          height: 32
        }}
        onPress={() => {
          router.back()
        }}
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
