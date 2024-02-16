import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, ViewProps } from './Themed'
import { StyleSheet } from 'react-native'

interface BottomCardProps extends ViewProps {
  children: React.ReactNode
}

export default function BottomCard({ children, ...props }: BottomCardProps) {
  const insets = useSafeAreaInsets()

  return (
    <View
      {...props}
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 20
        }
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
