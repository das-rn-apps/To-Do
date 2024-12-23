import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { HomeIcon, NotificationsIcon } from '@/assets/icons/Icons';


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
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: NotificationsIcon,
        }}
      />
    </Tabs>
  );
}
