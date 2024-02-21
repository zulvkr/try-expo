import {
  ScrollView,
  StyleSheet,
  Image,
  useWindowDimensions
} from 'react-native'

import { Text, View } from '@/components/Themed'
import { authStore } from '@/stores/authStore'
import { observer } from 'mobx-react-lite'
import { MaterialIcons } from '@expo/vector-icons'
import { IconButton } from '@/components/Button'
import { RecommendationsSection } from '@/features/home'
import { UpcomingSection } from '@/features/home/components/UpcomingSection'

export default observer(function TabOneScreen() {
  const dimensions = useWindowDimensions()
  const heroWidth = dimensions.width - 40
  const heroRatio = 1.8
  const heroHeight = heroWidth / heroRatio

  return (
    <ScrollView contentContainerStyle={styles.root.container}>
      <View style={styles.sections.userInfo.container}>
        <View style={styles.sections.userInfo.userInfoContainer}>
          <Image
            source={{ uri: authStore.user?.avatar }}
            style={styles.sections.userInfo.avatar}
          />
          <View style={styles.sections.userInfo.userInfo}>
            <Text style={styles.sections.userInfo.userInfoGreetings}>
              Hi, {authStore.user?.name?.split(' ')[0]}! 👋
            </Text>
            <Text style={styles.sections.userInfo.userInfoGreetingsSub}>
              Good to see you again!
            </Text>
          </View>
        </View>
        <IconButton>
          <MaterialIcons name='notifications-none' size={28} />
        </IconButton>
      </View>
      <View style={styles.sections.hero.container}>
        <Image
          resizeMode='contain'
          style={[
            styles.sections.hero.image,
            {
              width: heroWidth,
              height: heroHeight
            }
          ]}
          source={require('@/assets/images/hero-image-1.png')}
        />
      </View>
      <RecommendationsSection />
      <UpcomingSection />
    </ScrollView>
  )
})

const stylesRoot = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40
  }
})

const userInfoSectionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center'
  },
  userInfoContainer: {
    flexDirection: 'row'
  },
  userInfo: {
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  userInfoGreetings: {
    fontSize: 16
  },
  userInfoGreetingsSub: {
    fontSize: 12
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffffff'
  }
})

const heroSectionStyles = StyleSheet.create({
  container: {},
  image: {
    marginTop: -12
  }
})

export const styles = {
  root: stylesRoot,
  sections: {
    userInfo: userInfoSectionStyles,
    hero: heroSectionStyles
  }
}
