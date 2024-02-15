import { authStore } from '@/stores/authStore'
import { Redirect } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { StatusBar } from 'expo-status-bar'
import { observer } from 'mobx-react-lite'

export default observer(function Layout() {
  if (authStore.isAuth) {
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
})
