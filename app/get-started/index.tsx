import { Image, StyleSheet } from 'react-native'

import { GetStartedLayout } from '@/features/get-started'
import { View } from '@/components/Themed'
import { Button } from '@/components/Button'
import { Link } from 'expo-router'

export default function GetStartedScreen() {
  return (
    <GetStartedLayout
      image={
        <Image
          source={require('@/assets/images/get-started-illustration-1.png')}
          style={{ width: '100%', height: 450 }}
          resizeMode={'contain'}
        />
      }
      title='Iqlix Ready to Fulfill Your Excitement'
      description='Iqlix is a platform that provides a variety of exciting and interesting games that you can play anytime and anywhere.'
      action={
        <>
          <View style={styles.actionRow}>
            <Link href='/login' asChild>
              <Button variant='tonal' style={styles.button}>
                Skip
              </Button>
            </Link>

            <Link href='/get-started/2' asChild>
              <Button style={styles.button}>Next</Button>
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
