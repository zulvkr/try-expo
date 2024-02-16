import HeaderBackButton from '@/components/HeaderBackButton'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerLeft: HeaderBackButton,
        headerBackVisible: false
      }}
    >
      <Stack.Screen
        name='[movieId]'
        options={{
          headerTitle: 'Date and Time'
        }}
      />
      <Stack.Screen
        name='seat'
        options={{
          headerTitle: 'Your Seat'
        }}
      />
      <Stack.Screen
        name='checkout'
        options={{
          headerTitle: 'Details Order'
        }}
      />
      <Stack.Screen
        name='success-modal'
        options={{
          presentation: 'modal'
        }}
      />
    </Stack>
  )
}

export default Layout
