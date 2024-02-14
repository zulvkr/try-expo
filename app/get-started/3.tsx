import { Image, StyleSheet } from 'react-native'

import { GetStartedLayout } from '@/route-specific/get-started'
import { View } from '@/components/Themed'
import { Button } from '@/components/Button'
import { Link } from 'expo-router'

export default function GetStartedScreen() {
  return (
    <GetStartedLayout
      image={
        <Image
          source={require('@/assets/images/get-started-illustration-3.png')}
          style={{ width: '100%', height: 450 }}
          resizeMode={'contain'}
        />
      }
      title='Get Started Immedately to Take the Next Step'
      description='The advantage of Iqlix to order tickets easliy for youer excitement in watching your favorite movie'
      action={
        <>
          <View style={styles.actionRow}>
            <Link href='/login' asChild>
              <Button style={styles.button}>Get Started</Button>
            </Link>
          </View>
        </>
      }
    />
  )
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 16,
    paddingHorizontal: 20
  },
  button: {
    flex: 1
  }
})
