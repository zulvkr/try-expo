import { Stack } from 'expo-router/stack'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
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
