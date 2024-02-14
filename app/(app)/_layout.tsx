import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { Redirect, Stack } from 'expo-router'

import { useColorScheme } from '@/components/useColorScheme'
import { authStore } from '@/stores/authStore'
import { observer } from 'mobx-react-lite'

function RootLayout() {
  if (!authStore.isAuth) {
    return <Redirect href='/get-started/' />
  }

  return <RootLayoutNav />
}

export default observer(RootLayout)

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  )
}
