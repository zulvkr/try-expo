import { useTheme } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Layout() {
  const isDark = useTheme().dark

  return (
    <SafeAreaView style={styles.safearea}>
      <Stack
        initialRouteName='login'
        screenOptions={{
          headerShadowVisible: false
        }}
      >
        <Stack.Screen
          name='login'
          options={{
            title: 'Iqlix Login',
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen name='register' />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1
  }
})
