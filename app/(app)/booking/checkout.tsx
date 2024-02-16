import BottomCard from '@/components/BottomCard'
import { Button } from '@/components/Button'
import ComingSoon from '@/components/ComingSoon'
import { View } from '@/components/Themed'
import { useRouter } from 'expo-router'

export default function Checkout() {
  const router = useRouter()

  return (
    <View style={{ flex: 1 }}>
      <ComingSoon />

      <BottomCard>
        <Button
          onPress={() => {
            router.navigate('/')
          }}
        >
          Next
        </Button>
      </BottomCard>
    </View>
  )
}
