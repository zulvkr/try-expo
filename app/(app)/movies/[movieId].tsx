import { Text, View, useThemeColor } from '@/components/Themed'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getMovie } from '@/api/api'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  useColorScheme
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { gray950rgba } from '@/constants/Colors'
import { useMemo, useState } from 'react'
import { formatDuration } from '@/utils/formatter'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { Button } from '@/components/Button'
import CommonStyles from '@/components/CommonStyles'
import { Cast } from '@/api/types'
import { SecondaryText } from '@/components/StyledText'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MovieDetail() {
  const { movieId } = useLocalSearchParams()

  const { data, isLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: ({ queryKey: [_, movieId] }) => getMovie(movieId as string)
  })

  const textSecondaryColor = useThemeColor({}, 'textSecondary')
  const textColor = useThemeColor({}, 'text')

  const colorScheme = useColorScheme()
  const gradientColors = useMemo(() => {
    const isDark = colorScheme === 'dark'
    const darkBg = gray950rgba
    return isDark
      ? [
          'transparent',
          `rgba(${darkBg[0]},${darkBg[1]},${darkBg[2]},0)`,
          `rgba(${darkBg[0]},${darkBg[1]},${darkBg[2]},1)`
        ]
      : ['transparent', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)']
  }, [colorScheme])

  const [showRestSynopsis, setShowRestSynopsis] = useState(false)
  const tint = useThemeColor({}, 'tint')
  const insets = useSafeAreaInsets()

  return (
    <>
      <StatusBar style='light' backgroundColor='transparent' translucent />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={{
          marginTop: -insets.top
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            style={{ height: 400 }}
            size='large'
            color={textColor}
          />
        ) : (
          <>
            <View style={styles.background}>
              <ImageBackground
                source={{ uri: data?.image }}
                resizeMode='cover'
                style={styles.bgImage}
              />
              <LinearGradient
                colors={gradientColors}
                style={styles.bgGradient}
                locations={[0, 0.5, 0.9]}
              />
            </View>
            <View style={styles.headerCardSection}>
              <Text style={styles.movieTitle}>{data?.title}</Text>
              <View style={styles.headerCardRow2}>
                {Number.isInteger(data?.duration) && (
                  <View style={styles.headerCardInfoContainer}>
                    <MaterialCommunityIcons
                      name='account-outline'
                      size={20}
                      color={textSecondaryColor}
                    />
                    <SecondaryText style={styles.secondaryStyleText}>
                      Duration: {formatDuration(data?.duration as number)}
                    </SecondaryText>
                  </View>
                )}
                <View style={styles.headerCardInfoContainer}>
                  <MaterialCommunityIcons
                    name='clock-outline'
                    size={20}
                    color={textSecondaryColor}
                  />
                  <SecondaryText style={styles.secondaryStyleText}>
                    Director: {data?.director}
                  </SecondaryText>
                </View>
              </View>
              <View
                style={[styles.headerCardRow3, styles.headerCardInfoContainer]}
              >
                <FontAwesome name='film' size={18} color={textSecondaryColor} />
                <SecondaryText style={styles.secondaryStyleText}>
                  Genre: {data?.genres.join(', ')}
                </SecondaryText>
              </View>
              <View style={styles.headerCardRow4}>
                <View style={styles.directorAvatarLayout}>
                  <Image
                    source={{ uri: data?.directorAvatar }}
                    style={styles.directorAvatar}
                  />
                  <View style={{ flex: 1 }}>
                    <SecondaryText style={styles.secondaryStyleText}>
                      Director
                    </SecondaryText>
                    <Text style={{ fontWeight: 'bold' }}>{data?.director}</Text>
                  </View>
                </View>
                <View style={styles.trailerButtonContainer}>
                  <Button
                    onPress={() => {}}
                    style={styles.trailerButton}
                    renderLeft={() => (
                      <MaterialCommunityIcons
                        name='play'
                        size={20}
                        color='white'
                        style={{ marginRight: 4 }}
                      />
                    )}
                  >
                    Trailer
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.synopsisSection}>
              <View style={CommonStyles.sectionHeader}>
                <Text style={CommonStyles.sectionHeaderTitle}>Synopsis</Text>
              </View>
              <Text
                numberOfLines={showRestSynopsis ? undefined : 4}
                style={styles.synopsisText}
              >
                {data?.synopsis}
              </Text>
              <View style={styles.showMoreSynopsisContainer}>
                <Text
                  style={{
                    color: tint,
                    fontWeight: 'bold'
                  }}
                  onPress={() => setShowRestSynopsis(!showRestSynopsis)}
                >
                  {showRestSynopsis ? 'Less' : 'More'}
                </Text>
              </View>
            </View>
            <View style={styles.castsSection}>
              <View style={CommonStyles.sectionHeader}>
                <Text style={CommonStyles.sectionHeaderTitle}>Casts</Text>
                <Text style={{ color: tint }}>View All</Text>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data?.casts || mockCasts}
                contentContainerStyle={styles.castListContainer}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: 64
                    }}
                  >
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.castAvatar}
                    />
                    <Text numberOfLines={2} style={styles.castName}>
                      {item.name}
                    </Text>
                    <SecondaryText numberOfLines={1} style={styles.castRole}>
                      {item.role}
                    </SecondaryText>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </>
        )}
      </ScrollView>
      {isLoading ? null : (
        <View
          style={[
            styles.bookButtonContainer,
            {
              paddingBottom: insets.bottom + 20
            }
          ]}
        >
          <Button onPress={() => {}}>Book Now</Button>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    height: 300
  },
  bgGradient: {
    position: 'absolute',
    width: '100%',
    height: 300
  },
  background: {
    marginHorizontal: -20
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 150
  },
  headerCardSection: {
    marginTop: -180,
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    // ios shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  },
  headerCardRow2: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20
  },
  headerCardRow3: {
    marginTop: 20
  },
  headerCardRow4: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20
  },
  directorAvatarLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1
  },
  directorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  headerCardInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10
  },
  secondaryStyleText: {
    fontSize: 12
  },
  trailerButton: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  trailerButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32
  },
  synopsisSection: {
    marginTop: 10,
    paddingVertical: 20
  },
  synopsisText: {
    lineHeight: 22
  },
  showMoreSynopsisContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  castsSection: {
    marginTop: 20
  },
  castListContainer: {
    gap: 20
  },
  castItem: {
    width: 64
  },
  castAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  castName: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12
  },
  castRole: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: 8
  },
  bookButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    elevation: 5,
    // ios shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  }
})

const mockCasts: Cast[] = [
  {
    id: 1,
    name: 'Emile Hirsch',
    avatar: 'https://i.pravatar.cc/150?u=emileh',
    role: 'Christopher McCandless'
  },
  {
    id: 2,
    name: 'Kristen Stewart',
    avatar: 'https://i.pravatar.cc/150?u=kstewart',
    role: 'Tracy Tatro'
  },
  {
    id: 3,
    name: 'Vince Vaughn',
    avatar: 'https://i.pravatar.cc/150?u=vincev',
    role: 'Wayne Westerberg'
  },
  {
    id: 4,
    name: 'Catherine Keener',
    avatar: 'https://i.pravatar.cc/150?u=ckeener',
    role: 'Jan Burres'
  },
  {
    id: 5,
    name: 'Hal Holbrook',
    avatar: 'https://i.pravatar.cc/150?u=hh',
    role: 'Ron Franz'
  },
  {
    id: 6,
    name: 'Jena Malone',
    avatar: 'https://i.pravatar.cc/150?u=jmalone',
    role: 'Carine McCandless'
  },
  {
    id: 7,
    name: 'Brian Dierker',
    avatar: 'https://i.pravatar.cc/150?u=bdierker',
    role: 'Rainey'
  },
  {
    id: 8,
    name: 'Zach Galifianakis',
    avatar: 'https://i.pravatar.cc/150?u=zgalifianakis',
    role: 'Kevin'
  },
  {
    id: 9,
    name: 'Marcia Gay Harden',
    avatar: 'https://i.pravatar.cc/150?u=mgayharden',
    role: 'Billie McCandless'
  },
  {
    id: 10,
    name: 'William Hurt',
    avatar: 'https://i.pravatar.cc/150?u=whurt',
    role: 'Walt McCandless'
  }
]
