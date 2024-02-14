import { ImageBackground, StyleSheet } from 'react-native'
import { Text, View, useThemeColor } from '@/components/Themed'
import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface GetStartedLayoutProps {
  image: React.ReactNode
  title: string
  description: string
  action: React.ReactNode
}

export function GetStartedLayout({
  image,
  title,
  description,
  action
}: GetStartedLayoutProps) {
  const backgroundColor = useThemeColor({}, 'background')
  const titleTextColor = useThemeColor({}, 'text')
  const descriptionTextColor = useThemeColor({}, 'textSecondary')

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/get-started-bg.png')}
        resizeMode={'cover'}
        style={styles.backgroundImage}
      >
        {image}
      </ImageBackground>
      <View style={styles.separator}>
        <CurvedSeparator fill={backgroundColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[{ color: titleTextColor }, styles.title]}>{title}</Text>
        <Text style={[{ color: descriptionTextColor }, styles.description]}>
          {description}
        </Text>
      </View>
      {action}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  },
  separator: {
    marginTop: -50,
    backgroundColor: 'transparent'
  },
  textContainer: {
    padding: 20,
    paddingHorizontal: 32
  },
  backgroundImage: {
    height: 450,
    paddingHorizontal: 50
  }
})

function CurvedSeparator({ fill, ...props }: SvgProps) {
  return (
    <Svg width='429' height='83' viewBox='0 0 429 83' fill='none' {...props}>
      <Path
        d='M0.276367 0.294922C0.276367 0.294922 137.313 44.024 218.612 44.024C299.91 44.024 428.276 0.294922 428.276 0.294922V82.5654H0.276367V0.294922Z'
        fill={fill || '#fff'}
      />
    </Svg>
  )
}
