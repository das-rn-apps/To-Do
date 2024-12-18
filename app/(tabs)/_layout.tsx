import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { HomeIcon, FriendsIcon } from '@/assets/icons/Icons';


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
          title: 'Home',
          tabBarIcon: HomeIcon,
          // tabBarIcon: ({ color }) => <HomeIcon color="red" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: FriendsIcon,
        }}
      />
    </Tabs>
  );
}
