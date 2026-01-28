import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/src/constants/theme';
import { FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import MaterialDesignIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const iconSize = 24;
  const iconColor = Colors.oakHoneyDark;
  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 72 + insets.bottom,
          backgroundColor: Colors.oakHoney,
          opacity: 0.8,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          marginTop: 16,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: () => (
            <Octicons name="home" size={iconSize} color={iconColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar/index"
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="calendar-outline"
              size={iconSize}
              color={iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="open-capsule/index"
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="capsules" size={iconSize} color={iconColor} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarIcon: () => (
            <MaterialDesignIcons
              name="account"
              size={iconSize}
              color={iconColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}
