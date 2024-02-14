import { Theme } from '@react-navigation/native'
import Colors from './Colors'

const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.light.tint,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: 'rgb(224, 224, 224)',
    notification: 'rgb(255, 69, 58)'
  }
}

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.dark.tint,
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)'
  }
}

export { LightTheme, DarkTheme }
