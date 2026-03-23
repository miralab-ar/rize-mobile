import React from 'react';
import { useTranslation } from '@/lib/i18n';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarStyle: { backgroundColor: Colors.surface },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color }) => <Ionicons name="calendar-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: t('tabs.workouts'),
          tabBarIcon: ({ color }) => <Ionicons name="barbell-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: t('tabs.exercises'),
          tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
