import { Redirect, Stack } from 'expo-router'

import { authStore } from '@/stores/authStore'
import { observer } from 'mobx-react-lite'
import HeaderBackButton, {
  customHeaderBackButton
} from '@/components/HeaderBackButton'

function RootLayout() {
  if (!authStore.isAuth) {
    return <Redirect href='/get-started/' />
  }

  return <RootLayoutNav />
}

export default observer(RootLayout)

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
      <Stack.Screen
        name='movies/[movieId]'
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerBackTitle: 'Back',
          headerTransparent: true,
          header: customHeaderBackButton('dark')
        }}
      />
    </Stack>
  )
}
