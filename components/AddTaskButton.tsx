import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AddPostIcon } from '@/assets/icons/Icons';
import { Colors } from '@/constants/Colors';
import AddTaskModal from '@/components/AddTaskModal';

const AddTaskButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <>
            <AddTaskModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                <AddPostIcon color={Colors.facebookBlue} size={45} />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    addButton: {
        padding: 10,
        borderRadius: 50,
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 1,
    },
});

export default AddTaskButton;
