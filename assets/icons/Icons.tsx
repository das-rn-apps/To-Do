import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const defaultColor = '#000';
const defaultSize = 24;

export const HomeIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="home" size={size || defaultSize} color={color || defaultColor} />;
export const FriendsIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="users" size={size || defaultSize} color={color || defaultColor} />;
export const MessagesIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="chatbubble" size={size || defaultSize} color={color || defaultColor} />;
export const NotificationsIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="notifications" size={size || defaultSize} color={color || defaultColor} />;
export const ProfileIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="user-circle" size={size || defaultSize} color={color || defaultColor} />;
export const SearchIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="search" size={size || defaultSize} color={color || defaultColor} />;
export const LikeIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="thumbs-up" size={size || defaultSize} color={color || defaultColor} />;
export const CommentIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="comment" size={size || defaultSize} color={color || defaultColor} />;
export const ShareIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="share-alt" size={size || defaultSize} color={color || defaultColor} />;
export const MoreIcon = ({ color, size }: { color?: string; size?: number }) => <MaterialIcons name="more-horiz" size={size || defaultSize} color={color || defaultColor} />;
export const LogoutIcon = ({ color, size }: { color?: string; size?: number }) => <AntDesign name="logout" size={size || defaultSize} color={color || defaultColor} />;
export const AddPostIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="add-circle" size={size || defaultSize} color={color || defaultColor} />;
export const VideoCallIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="videocam" size={size || defaultSize} color={color || defaultColor} />;
export const CameraIcon = ({ color, size }: { color?: string; size?: number }) => <Feather name="camera" size={size || defaultSize} color={color || defaultColor} />;
export const SaveIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="bookmark" size={size || defaultSize} color={color || defaultColor} />;
export const GroupIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="users" size={size || defaultSize} color={color || defaultColor} />;
export const CalendarIcon = ({ color, size }: { color?: string; size?: number }) => <MaterialIcons name="calendar-today" size={size || defaultSize} color={color || defaultColor} />;
export const EventIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="time" size={size || defaultSize} color={color || defaultColor} />;
export const TagIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="tags" size={size || defaultSize} color={color || defaultColor} />;
export const TrendingIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="trending-up" size={size || defaultSize} color={color || defaultColor} />;
export const HelpIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="help-circle" size={size || defaultSize} color={color || defaultColor} />;
export const SettingsIcon = ({ color, size }: { color?: string; size?: number }) => <Ionicons name="settings" size={size || defaultSize} color={color || defaultColor} />;
export const InviteIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="send" size={size || defaultSize} color={color || defaultColor} />;
export const BusinessIcon = ({ color, size }: { color?: string; size?: number }) => <MaterialIcons name="storefront" size={size || defaultSize} color={color || defaultColor} />;
export const BellIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="bell" size={size || defaultSize} color={color || defaultColor} />;
export const FlagIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="flag" size={size || defaultSize} color={color || defaultColor} />;
export const LockIcon = ({ color, size }: { color?: string; size?: number }) => <FontAwesome name="lock" size={size || defaultSize} color={color || defaultColor} />;
