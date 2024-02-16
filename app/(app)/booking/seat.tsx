import BottomCard from '@/components/BottomCard'
import { Button } from '@/components/Button'
import ComingSoon from '@/components/ComingSoon'
import { Text, View } from '@/components/Themed'
import { useRouter } from 'expo-router'

export default function SeatSelect() {
  const router = useRouter()

  return (
    <View style={{ flex: 1 }}>
      <ComingSoon />

      <BottomCard>
        <Button
          onPress={() => {
            router.push('/booking/checkout')
          }}
        >
          Next
        </Button>
      </BottomCard>
    </View>
  )
}
