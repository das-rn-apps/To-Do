import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

// Reusable icon components for Facebook-like app

// Home
export const HomeIcon = ({ color }: { color: string }) => (
  <Ionicons name="home" size={24} color={color} />
);

// Friends
export const FriendsIcon = ({ color }: { color: string }) => (
  <FontAwesome name="users" size={24} color={color} />
);

// Messages
export const MessagesIcon = ({ color }: { color: string }) => (
  <Ionicons name="chatbubble" size={24} color={color} />
);

// Notifications
export const NotificationsIcon = ({ color }: { color: string }) => (
  <Ionicons name="notifications" size={24} color={color} />
);

// Profile
export const ProfileIcon = ({ color }: { color: string }) => (
  <FontAwesome name="user-circle" size={24} color={color} />
);

// Search
export const SearchIcon = ({ color }: { color: string }) => (
  <Ionicons name="search" size={24} color={color} />
);

// Like (Thumbs up)
export const LikeIcon = ({ color }: { color: string }) => (
  <FontAwesome name="thumbs-up" size={24} color={color} />
);

// Comment
export const CommentIcon = ({ color }: { color: string }) => (
  <FontAwesome name="comment" size={24} color={color} />
);

// Share
export const ShareIcon = ({ color }: { color: string }) => (
  <FontAwesome name="share-alt" size={24} color={color} />
);

// More (Menu)
export const MoreIcon = ({ color }: { color: string }) => (
  <MaterialIcons name="more-horiz" size={24} color={color} />
);

// Logout
export const LogoutIcon = ({ color }: { color: string }) => (
  <AntDesign name="logout" size={24} color={color} />
);

// Add Post (Add Circle)
export const AddPostIcon = ({ color }: { color: string }) => (
  <Ionicons name="add-circle" size={24} color={color} />
);

// Video Call
export const VideoCallIcon = ({ color }: { color: string }) => (
  <Ionicons name="videocam" size={24} color={color} />
);

// Camera
export const CameraIcon = ({ color }: { color: string }) => (
  <Feather name="camera" size={24} color={color} />
);

// Save (Bookmark)
export const SaveIcon = ({ color }: { color: string }) => (
  <FontAwesome name="bookmark" size={24} color={color} />
);

// Group (Users in a circle)
export const GroupIcon = ({ color }: { color: string }) => (
  <FontAwesome name="users" size={24} color={color} />
);

// Calendar
export const CalendarIcon = ({ color }: { color: string }) => (
  <MaterialIcons name="calendar-today" size={24} color={color} />
);

// Event (Clock)
export const EventIcon = ({ color }: { color: string }) => (
  <Ionicons name="time" size={24} color={color} />
);

// Tag
export const TagIcon = ({ color }: { color: string }) => (
  <FontAwesome name="tags" size={24} color={color} />
);

// Trending (Graph)
export const TrendingIcon = ({ color }: { color: string }) => (
  <Ionicons name="trending-up" size={24} color={color} />
);

// Help (Question)
export const HelpIcon = ({ color }: { color: string }) => (
  <Ionicons name="help-circle" size={24} color={color} />
);

// Settings (Gear)
export const SettingsIcon = ({ color }: { color: string }) => (
  <Ionicons name="settings" size={24} color={color} />
);

// Invite
export const InviteIcon = ({ color }: { color: string }) => (
  <FontAwesome name="send" size={24} color={color} />
);

// Business (Store)
export const BusinessIcon = ({ color }: { color: string }) => (
  <MaterialIcons name="storefront" size={24} color={color} />
);

// Bell (Notification)
export const BellIcon = ({ color }: { color: string }) => (
  <FontAwesome name="bell" size={24} color={color} />
);

// Flag (Report)
export const FlagIcon = ({ color }: { color: string }) => (
  <FontAwesome name="flag" size={24} color={color} />
);

// Lock (Privacy)
export const LockIcon = ({ color }: { color: string }) => (
  <FontAwesome name="lock" size={24} color={color} />
);
