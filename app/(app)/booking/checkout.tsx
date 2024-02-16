import { Button } from '@/components/Button'
import { Text, View } from '@/components/Themed'
import { useRouter } from 'expo-router'

export default function Checkout() {
  const router = useRouter()

  return (
    <View>
      <Text>Checkout</Text>
      <Button
        onPress={() => {
          // router.push('/booking/seat')
        }}
      >
        Next
      </Button>
    </View>
  )
}
