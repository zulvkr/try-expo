import { isLoggedInSelector } from '@/features/auth/stores/authSlice'
import { useAppSelector } from '@/stores/redux'
import { Redirect } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
  const isLoggedIn = useAppSelector(state => isLoggedInSelector(state))

  if (isLoggedIn) {
    return <Redirect href='/' />
  }
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
      <StatusBar style='light' />
    </>
  )
}
