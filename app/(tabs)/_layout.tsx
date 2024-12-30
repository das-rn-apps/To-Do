import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { CalendarIcon, EventIcon, ProfileIcon } from '@/assets/icons/Icons';


export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: EventIcon,
        }}
      />
      <Tabs.Screen
        name="all"
        options={{
          title: 'Overall',
          tabBarIcon: CalendarIcon,
          // tabBarIcon: ({ color }) => <HomeIcon color="red" />,
        }}
      />
      <Tabs.Screen
        name="performance"
        options={{
          title: 'Performance',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tabs>
  );
}
