import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { MyForm } from '@/components/MyForm'
import { Button } from '@/components/Button'
import { authStore } from '@/stores/authStore'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form</Text>
      {/* <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      /> */}
      <View style={styles.formContainer}>{/* <MyForm /> */}</View>
      <Button
        onPress={() => {
          authStore.logout()
        }}
      >
        Logout
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  formContainer: {
    padding: 20,
    width: '100%'
  }
})
