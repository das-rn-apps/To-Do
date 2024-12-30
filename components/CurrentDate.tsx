import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';

interface DateDisplayProps {
    date?: string | Date;
    username?: string;
    profilePicUrl?: string; // Optional prop for profile picture URL
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date, username, profilePicUrl }) => {
    const formatDate = (inputDate: string | Date) => {
        const parsedDate = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;
        return parsedDate.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const displayDate = date ? formatDate(date) : formatDate(new Date());

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: profilePicUrl || "https://picsum.photos/100" }}
                    style={styles.profilePic}
                />
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>
                        Hey {username || "User"}, Good {getTimeOfDay()}!
                    </Text>
                    <Text style={styles.dateText}>{displayDate}</Text>
                </View>
            </View>
        </View>
    );
};

const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'morning';
    } else if (hour < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    greetingContainer: {
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: Colors.facebookDarkBlue,
    },
    dateText: {
        fontSize: 10,
        fontWeight: '500',
        color: Colors.successGreen,
    },
});

export default DateDisplay;
