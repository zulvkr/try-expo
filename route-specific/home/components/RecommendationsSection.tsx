import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native'
import { Text, View, useThemeColor } from '@/components/Themed'
import { Link, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getRecommendations } from '@/api/api'
import { Button } from '@/components/Button'

export const RecommendationsSection = () => {
  const dimensions = useWindowDimensions()
  const cardGap = 10
  const cardWidth = (dimensions.width - 40 - cardGap * 2) / 3
  const cardRatio = 7 / 10
  const cardHeight = cardWidth / cardRatio
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: getRecommendations
  })

  const textColor = useThemeColor({}, 'text')
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
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: cardWidth
              }}
              onPress={() => {
                router.navigate({
                  pathname: '/(app)/movies/[movieId]',
                  params: { movieId: item.id }
                })
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
                  secondary
                  numberOfLines={1}
                  style={[styles.cardInfoDescription]}
                >
                  {item.genres.slice(0, 2).join(', ')}
                </Text>
              </View>
              <Link
                style={styles.cardInfoButton}
                href={{
                  pathname: '/(app)/movies/[movieId]',
                  params: { movieId: item.id }
                }}
                asChild
              >
                <Button variant='outlined'>Book</Button>
              </Link>
            </TouchableOpacity>
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
    gap: 10,
    height: 64
  },
  cardInfoTitle: {},
  cardInfoButton: {
    marginTop: 10
  },
  cardInfoDescription: {
    fontSize: 12
  }
})
