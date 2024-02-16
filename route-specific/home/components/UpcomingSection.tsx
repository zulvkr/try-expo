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
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getUpcomings } from '@/api/api'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useState } from 'react'
import CommonStyles from '@/components/CommonStyles'
import { SecondaryText } from '@/components/StyledText'

export const UpcomingSection = () => {
  const dimensions = useWindowDimensions()
  const cardGap = 10
  const cardWidth = (dimensions.width - 40 - cardGap * 2) / 3
  const cardRatio = 7 / 10
  const cardHeight = cardWidth / cardRatio

  const { data, isLoading } = useQuery({
    queryKey: ['upcomings'],
    queryFn: getUpcomings
  })

  const textColor = useThemeColor({}, 'text')
  const tintColor = useThemeColor({}, 'tint')

  return (
    <View style={styles.container}>
      <View style={CommonStyles.sectionHeader}>
        <Text style={CommonStyles.sectionHeaderTitle}>Upcoming</Text>
        <Link href='/' style={[{ color: tintColor }]}>
          View all
        </Link>
      </View>
      {isLoading ? (
        <ActivityIndicator
          color={textColor}
          size='large'
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
            >
              <BookmarkButton />

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
                <SecondaryText
                  numberOfLines={1}
                  style={[styles.cardInfoDescription]}
                >
                  {item.genres.slice(0, 2).join(', ')}
                </SecondaryText>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

const BookmarkButton = () => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  return (
    <Pressable
      onPress={() => setIsBookmarked(prev => !prev)}
      hitSlop={{
        top: 4,
        left: 4,
        bottom: 4,
        right: 4
      }}
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        width: 24,
        height: 24,
        backgroundColor: 'white',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <MaterialIcons
        name={isBookmarked ? 'bookmark' : 'bookmark-border'}
        size={16}
        color={Colors.light.tint}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32
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

  cardInfoDescription: {
    fontSize: 12
  }
})
