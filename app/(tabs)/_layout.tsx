import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0D1B2A', borderTopColor: '#1E3350' },
        tabBarActiveTintColor: '#B08A55',
        tabBarInactiveTintColor: '#506886',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Panel' }}
      />
    </Tabs>
  );
}
