import { Text, View } from './Themed'

export default function ComingSoon() {
  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
        // width: '100%'
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Coming Soon</Text>
    </View>
  )
}
