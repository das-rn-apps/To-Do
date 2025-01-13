import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, TouchableHighlight, Alert, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Gender } from '@/types';
import { useUserContext } from '@/Context/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, Photo } from '@/assets/icons/Icons';
import { updateUserInDB } from '@/utils/userDB';

interface AddUserModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isVisible, onClose }) => {
    const { user, addUser, updateUser } = useUserContext();

    const [formState, setFormState] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone_number || '',
        profilePicture: user?.profile_picture || '',
        bio: user?.bio || '',
        gender: user?.gender || undefined,
        location: user?.location || '',
    });

    const [isEditMode, setIsEditMode] = useState(Boolean(user?.name));

    const translateY = useRef(new Animated.Value(-Dimensions.get('window').height)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: isVisible ? 0 : -Dimensions.get('window').height,
            duration: isVisible ? 700 : 600,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    const handleChange = (key: keyof typeof formState, value: string) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    const handleSaveUser = () => {
        const { name, email, phone, profilePicture, bio, gender, location } = formState;
        if (!name.trim() || !email.trim()) return Alert.alert('Error', 'Name and Email are required.');

        const userData = {
            id: user?.id || Date.now().toString(),
            name, email, phone, profile_picture: profilePicture, bio, gender, location,
            account_created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
            session_activity: '',
        };

        isEditMode ? updateUser(userData) : addUser(userData);
        onClose();
    };

    const handleImagePick = async (type: 'library' | 'camera') => {
        const permissionStatus = await (type === 'library'
            ? ImagePicker.requestMediaLibraryPermissionsAsync()
            : ImagePicker.requestCameraPermissionsAsync());

        if (permissionStatus.status !== 'granted') {
            return Alert.alert('Permission required', `We need permission to access your ${type === 'library' ? 'photos' : 'camera'}.`);
        }

        const pickerResult = type === 'library'
            ? await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1 })
            : await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });

        if (!pickerResult.canceled) setFormState((prev) => ({ ...prev, profilePicture: pickerResult.assets[0].uri }));
    };

    return (
        <Modal transparent visible={isVisible} animationType="none">
            <View style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {['name', 'email', 'phone', 'bio', 'location'].map((field, idx) => (
                            <View key={idx}>
                                <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                                <TextInput
                                    style={field === 'bio' ? [styles.input, styles.textArea] : styles.input}
                                    placeholder={`Enter ${field}`}
                                    value={formState[field as keyof typeof formState]}
                                    onChangeText={(text) => handleChange(field as keyof typeof formState, text)}
                                    placeholderTextColor={Colors.text}
                                    keyboardType={field === 'phone' ? 'phone-pad' : 'default'}
                                    multiline={field === 'bio'}
                                />
                            </View>
                        ))}

                        <Text style={styles.label}>Profile Picture</Text>
                        <View style={styles.imagePickerContainer}>
                            {formState.profilePicture && <Image source={{ uri: formState.profilePicture }} style={styles.profileImage} />}
                            <TouchableOpacity style={styles.imagePickerButton} onPress={() => handleImagePick('library')}>
                                <Photo />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imagePickerButton} onPress={() => handleImagePick('camera')}>
                                <CameraIcon />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Gender</Text>
                        <View style={styles.priorityContainer}>
                            {Object.values(Gender).map((gender) => (
                                <TouchableOpacity
                                    key={gender}
                                    style={[styles.priorityButton, formState.gender === gender && styles.prioritySelected]}
                                    onPress={() => handleChange('gender', gender)}>
                                    <Text style={[styles.priorityText, formState.gender === gender && styles.priorityTextSelected]}>{gender.toUpperCase()}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableHighlight style={styles.addButton} onPress={handleSaveUser} underlayColor={Colors.primaryButtonColor}>
                            <Text style={styles.addButtonText}>{isEditMode ? 'Update User' : 'Add User'}</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.closeModalButton} onPress={onClose} underlayColor={Colors.primaryButtonColor}>
                            <Text style={styles.addButtonText}>Close</Text>
                        </TouchableHighlight>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '90%', borderRadius: 20, padding: 20, backgroundColor: Colors.background, elevation: 15 },
    scrollViewContent: { paddingBottom: 20 },
    label: { fontSize: 10, fontWeight: 'bold', color: Colors.instagramLightPurple },
    input: { backgroundColor: Colors.facebookLightGray, borderRadius: 10, padding: 12, fontSize: 14, marginBottom: 10 },
    textArea: { height: 100 },
    priorityContainer: { flexDirection: 'row', marginVertical: 10 },
    priorityButton: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 20, borderWidth: 0.7, marginRight: 5, borderColor: Colors.facebookBlue },
    prioritySelected: { backgroundColor: Colors.primaryButtonColor },
    priorityText: { color: Colors.facebookBlue, fontSize: 12 },
    priorityTextSelected: { color: Colors.facebookLightGray },
    addButton: { paddingVertical: 15, borderRadius: 10, backgroundColor: Colors.primaryButtonColor, marginTop: 20 },
    closeModalButton: { paddingVertical: 13, backgroundColor: Colors.facebookDarkGray, borderRadius: 10, marginTop: 10, alignItems: 'center' },
    addButtonText: { textAlign: 'center', fontSize: 16, fontWeight: '600', color: Colors.facebookLightGray },
    imagePickerContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 5 },
    imagePickerButton: { padding: 5, borderRadius: 5, alignItems: 'center' },
    profileImage: { width: 40, height: 40, alignSelf: 'center' },

});

export default AddUserModal;
