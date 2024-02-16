import BottomCard from '@/components/BottomCard'
import { Button } from '@/components/Button'
import ComingSoon from '@/components/ComingSoon'
import { Text, View, useThemeColor } from '@/components/Themed'
import { getShortDay } from '@/utils/formatter'
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router'
import { FlatList, ScrollView, StyleSheet } from 'react-native'

export default function DateTimeSelect() {
  const router = useRouter()
  const { movieId } = useLocalSearchParams()
  const tonalColor = useThemeColor({}, 'tonalButtonColor')
  const tintColor = useThemeColor({}, 'tint')

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <FlatList
          style={{
            borderRadius: 10
          }}
          contentContainerStyle={{
            backgroundColor: tonalColor
          }}
          horizontal
          data={[
            '2024-03-01',
            '2024-03-02',
            '2024-03-03',
            '2024-03-04',
            '2024-03-05',
            '2024-03-06',
            '2024-03-07',
            '2024-03-08',
            '2024-03-09',
            '2024-03-10',
            '2024-03-11',
            '2024-03-12',
            '2024-03-13',
            '2024-03-14'
          ]}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                margin: 5,
                backgroundColor: tonalColor,
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  color: tintColor,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                {item.split('-')[2]}
              </Text>
              <Text
                style={{
                  color: tintColor
                }}
              >
                {getShortDay(item)}
              </Text>
            </View>
          )}
        />
        <FlatList
          style={{
            borderRadius: 10
          }}
          contentContainerStyle={{
            gap: 10
          }}
          horizontal
          data={[
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00'
          ]}
          renderItem={({ item }) => (
            <Button
              variant='outlined'
              style={{
                paddingVertical: 10,
                borderRadius: 8
              }}
            >
              {item}
            </Button>
          )}
        />
        <ComingSoon />
      </ScrollView>
      <BottomCard>
        <Button
          onPress={() => {
            router.push('/booking/seat')
          }}
        >
          Next
        </Button>
      </BottomCard>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    padding: 20,
    gap: 32
  }
})
