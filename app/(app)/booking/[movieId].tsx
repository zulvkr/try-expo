import { Button } from '@/components/Button'
import { Text, View } from '@/components/Themed'
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router'

export default function DateTimeSelect() {
  const router = useRouter()
  const { movieId } = useLocalSearchParams()

  return (
    <View>
      <Text>DateTimeSelect: {movieId}</Text>
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
