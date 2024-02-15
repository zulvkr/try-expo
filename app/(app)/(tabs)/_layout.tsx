import React from 'react'
import { Link, Tabs } from 'expo-router'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { Image } from 'react-native'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
}) {
  return (
    <MaterialCommunityIcons size={24} style={{ marginBottom: -3 }} {...props} />
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true)
        headerShown: false,
        tabBarStyle: {
          paddingBottom: insets.bottom + 12,
          paddingTop: 12,
          height: 64
        }
      }}
      sceneContainerStyle={{
        paddingTop: insets.top
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='cinemas'
        options={{
          title: 'Cinemas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'movie' : 'movie-outline'}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='my-tickets'
        options={{
          title: 'My Tickets',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='ticket-confirmation-outline' color={color} />
          ),
          tabBarButton(props) {
            return (
              <Pressable
                onPress={props.onPress}
                style={{
                  bottom: 40,
                  width: 64,
                  height: 64,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image
                  source={require('@/assets/images/my-ticket-button.png')}
                  style={{
                    width: 64,
                    height: 64
                  }}
                />
              </Pressable>
            )
          }
        }}
      />
      <Tabs.Screen
        name='food-order'
        options={{
          title: 'Food Order',
          tabBarIcon: ({ color }) => <TabBarIcon name='popcorn' color={color} />
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'account' : 'account-outline'}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}
