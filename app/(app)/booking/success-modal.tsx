import { Button } from '@/components/Button'
import { Text, View } from '@/components/Themed'
import { useRouter } from 'expo-router'

export default function SuccessModal() {
  const router = useRouter()

  return (
    <View>
      <Text>SuccessModal</Text>
      <Button
        onPress={() => {
          router.push('/booking/seat')
        }}
      >
        Next
      </Button>
    </View>
  )
}
