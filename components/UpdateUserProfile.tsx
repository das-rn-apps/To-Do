import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { SettingsIcon } from '@/assets/icons/Icons';
import { Colors } from '@/constants/Colors';
import AddUserModal from './AddUserModal';

const UpdateUserProfile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <>
            <AddUserModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <SettingsIcon color={Colors.facebookBlue} size={30} />
            </TouchableOpacity>
        </>
    );
};


export default UpdateUserProfile;
