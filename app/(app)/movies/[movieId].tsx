import { Text, View, useThemeColor } from '@/components/Themed'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getMovie } from '@/api/api'
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  useColorScheme
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { gray950rgba } from '@/constants/Colors'
import { useMemo } from 'react'
import { formatDuration } from '@/utils/formatter'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { Button } from '@/components/Button'

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

  return (
    <>
      <StatusBar style='light' />
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View>
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
            <View style={styles.movieHeaderCard}>
              <Text style={styles.movieTitle}>{data?.title}</Text>
              <View style={styles.movieHeaderCardRow2}>
                {Number.isInteger(data?.duration) && (
                  <View style={styles.movieInfoSecondaryStyle}>
                    <MaterialCommunityIcons
                      name='account-outline'
                      size={20}
                      color={textSecondaryColor}
                    />
                    <Text secondary style={styles.secondaryStyleText}>
                      Duration: {formatDuration(data?.duration as number)}
                    </Text>
                  </View>
                )}
                <View style={styles.movieInfoSecondaryStyle}>
                  <MaterialCommunityIcons
                    name='clock-outline'
                    size={20}
                    color={textSecondaryColor}
                  />
                  <Text secondary style={styles.secondaryStyleText}>
                    Director: {data?.director}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.movieHeaderCardRow3,
                  styles.movieInfoSecondaryStyle
                ]}
              >
                <FontAwesome name='film' size={18} color={textSecondaryColor} />
                <Text secondary style={styles.secondaryStyleText}>
                  Genre: {data?.genres.join(', ')}
                </Text>
              </View>
              <View style={styles.movieHeaderCardRow4}>
                <View style={styles.movieHeaderDirectorAvatarLayout}>
                  <Image
                    source={{ uri: data?.directorAvatar }}
                    style={styles.movieHeaderAvatar}
                  />
                  <View style={{ flex: 1 }}>
                    <Text secondary style={styles.secondaryStyleText}>
                      Director
                    </Text>
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
                        color={textColor}
                        style={{ marginRight: 4 }}
                      />
                    )}
                  >
                    Trailer
                  </Button>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
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
  movieHeaderCard: {
    marginTop: -180,
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    elevation: 4,
    // ios shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  },
  movieHeaderCardRow2: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20
  },
  movieHeaderCardRow3: {
    marginTop: 20
  },
  movieHeaderCardRow4: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20
  },
  movieHeaderDirectorAvatarLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1
  },
  movieHeaderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  movieInfoSecondaryStyle: {
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
  }
})
