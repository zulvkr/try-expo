import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions
} from 'react-native'
import { Text, View, useThemeColor } from '@/components/Themed'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRecommendations } from '@/api/api'
import { Button } from '@/components/Button'

export const RecommendationsSection = () => {
  const dimensions = useWindowDimensions()
  const cardGap = 10
  const cardWidth = (dimensions.width - 40 - cardGap * 2) / 3
  const cardRatio = 7 / 10
  const cardHeight = cardWidth / cardRatio

  const { data, isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: getRecommendations
  })

  const textColor = useThemeColor({}, 'text')
  const textColorSecondary = useThemeColor({}, 'textSecondary')
  const tintColor = useThemeColor({}, 'tint')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recommendation</Text>
        <Link href='/' style={[{ color: tintColor }]}>
          View all
        </Link>
      </View>
      {isLoading ? (
        <ActivityIndicator
          color={textColor}
          size={32}
          style={{
            height: cardHeight
          }}
        />
      ) : (
        <FlatList
          style={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          contentContainerStyle={styles.horizontalListInnerContainer}
          renderItem={({ item }) => (
            <View
              style={{
                width: cardWidth
              }}
            >
              <Image
                source={{ uri: item.image }}
                resizeMode='cover'
                style={{
                  height: cardHeight,
                  borderRadius: 12
                }}
              />
              <View style={styles.cardInfo}>
                <Text numberOfLines={2} style={styles.cardInfoTitle}>
                  {item.title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    { color: textColorSecondary },
                    styles.cardInfoDescription
                  ]}
                >
                  {item.genres.slice(0, 2).join(', ')}
                </Text>
                <Link href='/' asChild>
                  <Button variant='outlined'>Book</Button>
                </Link>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  horizontalList: {
    marginHorizontal: -20
  },
  horizontalListInnerContainer: {
    paddingHorizontal: 20,
    gap: 10
  },
  viewAll: {
    // color: '#007BFF'
  },
  cardInfo: {
    marginTop: 10,
    gap: 10
  },
  cardInfoTitle: {
    height: 36
  },
  cardInfoDescription: {
    fontSize: 12
  }
})
