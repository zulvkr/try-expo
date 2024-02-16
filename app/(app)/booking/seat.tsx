import { Button } from '@/components/Button'
import { Text, View } from '@/components/Themed'
import { useRouter } from 'expo-router'

export default function SeatSelect() {
  const router = useRouter()

  return (
    <View>
      <Text>SeatSelect</Text>
      <Button
        onPress={() => {
          router.push('/booking/checkout')
        }}
      >
        Next
      </Button>
    </View>
  )
}
