import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Platform,
    ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '@/constants/Colors';
import { Priority, TaskStatus } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';

interface FilterComponentProps {
    onFilter: (filters: {
        date?: string;
        startDate?: string;
        endDate?: string;
        status?: TaskStatus;
        priority?: Priority;
        text?: string;
    }) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilter }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | undefined>();
    const [selectedStartDate, setSelectedStartDate] = useState<string | undefined>();
    const [selectedEndDate, setSelectedEndDate] = useState<string | undefined>();
    const [selectedStatus, setSelectedStatus] = useState<TaskStatus | undefined>();
    const [selectedPriority, setSelectedPriority] = useState<Priority | undefined>();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerMode, setDatePickerMode] = useState<'date' | 'startDate' | 'endDate'>('date');
    const [modalVisible, setModalVisible] = useState(false);

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            if (datePickerMode === 'date') setSelectedDate(formattedDate);
            else if (datePickerMode === 'startDate') setSelectedStartDate(formattedDate);
            else if (datePickerMode === 'endDate') setSelectedEndDate(formattedDate);
        }
        setShowDatePicker(false);
    };

    const handleFilter = () => {
        const filters = {
            ...(selectedDate && { date: selectedDate }),
            ...(selectedStartDate && { startDate: selectedStartDate }),
            ...(selectedEndDate && { endDate: selectedEndDate }),
            ...(selectedStatus && { status: selectedStatus }),
            ...(selectedPriority && { priority: selectedPriority }),
            ...(searchText.trim() && { text: searchText.trim() }),
        };
        onFilter(filters);
        setModalVisible(false);
    };

    const clearAll = () => {
        setSearchText('');
        setSelectedDate(undefined);
        setSelectedStartDate(undefined);
        setSelectedEndDate(undefined);
        setSelectedStatus(undefined);
        setSelectedPriority(undefined);
        onFilter({});
    };

    return (
        <View style={styles.container}>
            {/* Search and Filter Section */}
            <View style={styles.filterSearch}>
                <TextInput
                    style={styles.inputBox}
                    value={searchText}
                    onChangeText={(text) => {
                        setSearchText(text);
                        onFilter({ text: text.trim() });
                    }}
                    placeholder="Search tasks..."
                />
                <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="filter-list" size={30} color={Colors.primaryButtonColor} />
                </TouchableOpacity>
            </View>

            {/* Modal for Filters */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <ScrollView contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Apply Filters</Text>

                        {/* Date Picker */}
                        <Text style={styles.label}>Filter by Date</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowDatePicker(true);
                                setDatePickerMode('date');
                            }}
                            style={styles.input}
                        >
                            <Text style={styles.dateText}>
                                {selectedDate ? `Date: ${selectedDate}` : 'Select Date'}
                            </Text>
                        </TouchableOpacity>

                        {/* Date Range Picker */}
                        <Text style={styles.label}>Filter by Date Range</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowDatePicker(true);
                                setDatePickerMode('startDate');
                            }}
                            style={styles.input}
                        >
                            <Text style={styles.dateText}>
                                {selectedStartDate ? `Start Date: ${selectedStartDate}` : 'Select Start Date'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setShowDatePicker(true);
                                setDatePickerMode('endDate');
                            }}
                            style={styles.input}
                        >
                            <Text style={styles.dateText}>
                                {selectedEndDate ? `End Date: ${selectedEndDate}` : 'Select End Date'}
                            </Text>
                        </TouchableOpacity>

                        {/* Status and Priority Filters */}
                        {['Status', 'Priority'].map((label) => (
                            <View key={label}>
                                <Text style={styles.label}>Filter by {label}</Text>
                                <View style={styles.priorityContainer}>
                                    {(label === 'Status' ? Object.values(TaskStatus) : Object.values(Priority)).map(
                                        (option) => (
                                            <TouchableOpacity
                                                key={option}
                                                style={[
                                                    styles.priorityButton,
                                                    (label === 'Status' ? selectedStatus : selectedPriority) === option &&
                                                    styles.prioritySelected,
                                                ]}
                                                onPress={() =>
                                                    label === 'Status'
                                                        ? setSelectedStatus(option as TaskStatus)
                                                        : setSelectedPriority(option as Priority)
                                                }
                                            >
                                                <Text
                                                    style={[
                                                        styles.priorityText,
                                                        (label === 'Status' ? selectedStatus : selectedPriority) ===
                                                        option && styles.priorityTextSelected,
                                                    ]}
                                                >
                                                    {option.toUpperCase()}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    )}
                                </View>
                            </View>
                        ))}

                        {/* Action Buttons */}
                        <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
                            <Text style={styles.filterButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeModalButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeModalButton} onPress={clearAll}>
                            <Text style={styles.closeModalButtonText}>Clear All</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>

            {/* DateTime Picker */}
            {showDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 5, backgroundColor: Colors.background, borderRadius: 10 },
    filterSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: Colors.background,
        borderRadius: 10,
    },
    iconButton: { paddingHorizontal: 8 },
    inputBox: {
        flex: 1,
        backgroundColor: Colors.facebookLightGray,
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
    },
    modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalContainer: {
        backgroundColor: Colors.background,
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.facebookBlue,
        textAlign: 'center',
    },
    label: { fontSize: 10, fontWeight: 'bold', color: Colors.instagramLightPurple, marginBottom: 5 },
    input: {
        backgroundColor: Colors.facebookLightGray,
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        marginBottom: 10,
    },
    dateText: { fontSize: 14, color: Colors.text },
    priorityContainer: { flexDirection: 'row', marginVertical: 10 },
    priorityButton: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 0.7,
        marginRight: 5,
        borderColor: Colors.facebookBlue,
    },
    prioritySelected: { backgroundColor: Colors.primaryButtonColor },
    priorityText: { color: Colors.facebookBlue },
    priorityTextSelected: { color: Colors.facebookLightGray },
    filterButton: {
        paddingVertical: 12,
        backgroundColor: Colors.primaryButtonColor,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    filterButtonText: { color: Colors.facebookLightGray, fontSize: 16, fontWeight: '600' },
    closeModalButton: {
        paddingVertical: 13,
        backgroundColor: Colors.facebookDarkGray,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    closeModalButtonText: { color: Colors.facebookLightGray, fontSize: 16, fontWeight: '600' },
});

export default FilterComponent;
