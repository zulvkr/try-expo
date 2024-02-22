import { Redirect, Stack } from 'expo-router'

import { customHeaderBackButton } from '@/components/HeaderBackButton'
import { isLoggedInSelector } from '@/features/auth/stores/authSlice'
import { useAppSelector } from '@/stores/redux'

function RootLayout() {
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  if (!isLoggedIn) {
    return <Redirect href='/get-started/' />
  }

  return <RootLayoutNav />
}

export default RootLayout

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
      <Stack.Screen
        name='movies/[movieId]'
        options={{
          headerBackVisible: false,
          headerLeft: customHeaderBackButton('dark'),
          headerTitle: '',
          headerBackTitleVisible: false,
          headerBackTitle: 'Back',
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name='booking'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
