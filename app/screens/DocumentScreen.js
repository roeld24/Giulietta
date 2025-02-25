import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parse } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import Toolbar from '../components/Toolbar';
import email from 'react-native-email';

const DocumentScreen = ({ route }) => {
    const { timeData } = route.params || {};

    const [workSessions, setWorkSessions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Initialize to current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initialize to current year
    const [recipientEmail, setRecipientEmail] = useState('roeldhoxha240103@gmail.com'); // State for recipient email

    useEffect(() => {
        loadSessions();
    }, []);

    const sendEmail = async () => {
        if (!recipientEmail) {
            Alert.alert('Error', 'Please enter a recipient email.');
            return;
        }
    
        if (!filteredSessions || filteredSessions.length === 0) {
            Alert.alert('Error', 'No work sessions available for the selected month.\n');
            return;
        }
    
        // Set fixed widths for each column (adjust as needed for proper spacing)
        const columnWidths = {
            date: 15,   // Left-aligned Date column
            start: 15,  // Right-aligned Start column
            end: 15,    // Right-aligned End column
            hours: 20   // Right-aligned Hours Worked column
        };
    
        // Helper function to format each row with appropriate padding
        const formatRow = (date, start, end, hours) => {
            return `${date.padEnd(columnWidths.date)}${start.padStart(columnWidths.start)}${end.padStart(columnWidths.end)}${hours.padStart(columnWidths.hours)}`;
        };
    
        // Array to map selectedMonth number to its name
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
    
        const selectedMonthName = monthNames[selectedMonth]; // Get the name of the selected month
    
        // Format the header and data rows
        const header = formatRow('Data:', 'Inizio:', 'Fine:', 'Totale:');
        const separator = `${'-'.repeat(90)}\n`; // Separator line for the table
    
        // Format the work session rows
        const rows = filteredSessions.map(session => 
            formatRow(session.date, session.start, session.end, session.hours)
        ).join('\n');
    
        // Calculate total hours worked
        const totalHoursWorkedInSeconds = filteredSessions.reduce((total, session) => {
            const [hours, minutes, seconds] = session.hours.split(':').map(Number);
            return total + hours * 3600 + minutes * 60 + seconds;
        }, 0);
    
        const totalHours = Math.floor(totalHoursWorkedInSeconds / 3600);
        const totalMinutes = Math.floor((totalHoursWorkedInSeconds % 3600) / 60);
        const totalSeconds = totalHoursWorkedInSeconds % 60;
    
        const formattedTotalTime = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
    
        // Create the email body with the selected month and year displayed
        const emailBody = `
    Work Sessions for ${selectedMonthName} ${selectedYear}:
    
        ${header}
    ${separator}${rows}
    ${separator}
    Total Hours Worked: ${formattedTotalTime}
        `;
    
        try {
            await email([recipientEmail], {
                subject: `Work Sessions Report for ${selectedMonthName} ${selectedYear}`,
                body: emailBody, // Plain text body
            });
    
            Alert.alert('Success', 'Email sent successfully');
        } catch (error) {
            console.error('Error sending email', error);
            Alert.alert('Error', 'Could not send the email.');
        }
    };
    
    const loadSessions = async () => {
        try {
            const savedSessions = await AsyncStorage.getItem('workSessions');
            if (savedSessions) {
                const parsedSessions = JSON.parse(savedSessions);
                console.log("Loaded sessions from AsyncStorage: ", parsedSessions);
                setWorkSessions(parsedSessions);
            } else {
                console.log("No sessions found in AsyncStorage.");
            }
        } catch (error) {
            console.error('Error loading sessions', error);
        }
    };

    useEffect(() => {
        const saveSession = async () => {
            if (timeData && timeData.date) {
                try {
                    const formattedDate = format(parse(timeData.date, 'd/M/yyyy', new Date()), 'yyyy-MM-dd');
                    const newSession = {
                        ...timeData,
                        date: formattedDate,
                        id: Date.now().toString(),
                        hours: timeData.hours, // No need to convert if it's already formatted
                    };
    
                    console.log("New session to save: ", newSession); // Log session data
    
                    const savedSessions = await AsyncStorage.getItem('workSessions');
                    const updatedSessions = savedSessions ? [...JSON.parse(savedSessions), newSession] : [newSession];
    
                    console.log("Updated session list: ", updatedSessions);
                    await AsyncStorage.setItem('workSessions', JSON.stringify(updatedSessions));
                    console.log("Session saved successfully");
                    Alert.alert('Success', 'Session saved!');
                    setWorkSessions(updatedSessions);
                } catch (error) {
                    console.error('Error processing date or saving session', error);
                    Alert.alert('Error', 'Invalid date format or other issue.');
                }
            }
        };
    
        saveSession();
    }, [timeData]);
    
    // Months array for Picker
    const months = [
        { label: 'January', value: 0 },
        { label: 'February', value: 1 },
        { label: 'March', value: 2 },
        { label: 'April', value: 3 },
        { label: 'May', value: 4 },
        { label: 'June', value: 5 },
        { label: 'July', value: 6 },
        { label: 'August', value: 7 },
        { label: 'September', value: 8 },
        { label: 'October', value: 9 },
        { label: 'November', value: 10 },
        { label: 'December', value: 11 },
    ];

    const years = Array.from({ length: 5 }, (_, i) => ({
        label: `${new Date().getFullYear() - i}`,
        value: new Date().getFullYear() - i,
    }));

    const filteredSessions = workSessions.filter(session => {
        const sessionDate = new Date(session.date);
        const isSameMonth = selectedMonth !== undefined && sessionDate.getMonth() === selectedMonth;
        const isSameYear = selectedYear !== undefined && sessionDate.getFullYear() === selectedYear;
        return isSameMonth && isSameYear;
    });

    const totalHoursWorkedInSeconds = filteredSessions.reduce((total, session) => {
        const [hours, minutes, seconds] = session.hours.split(':').map(Number);
        return total + hours * 3600 + minutes * 60 + seconds; // Convert time to total seconds
    }, 0);

    // Convert total seconds into HH:MM:SS format
    const totalHours = Math.floor(totalHoursWorkedInSeconds / 3600);
    const totalMinutes = Math.floor((totalHoursWorkedInSeconds % 3600) / 60);
    const totalSeconds = totalHoursWorkedInSeconds % 60;

    const formattedTotalTime = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;

    const renderSession = ({ item }) => (
        <View style={styles.entry}>
            <Text style={styles.entryText}>Date: {item.date}</Text>
            <Text style={styles.entryText}>Start: {item.start}</Text>
            <Text style={styles.entryText}>End: {item.end}</Text>
            <Text style={styles.entryText}>Hours Worked: {item.hours || '00:00:00'} hours</Text>
        </View>
    );
    
    const deleteAllSessions = async () => {
        try {
            await AsyncStorage.removeItem('workSessions');
            setWorkSessions([]);
            Alert.alert('Success', 'All sessions deleted!');
        } catch (error) {
            console.error('Error deleting sessions', error);
            Alert.alert('Error', 'Could not delete sessions.');
        }
    };

    const handleDeleteAllSessions = () => {
        Alert.alert(
            'Delete All Sessions',
            'Are you sure you want to delete all work sessions? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: deleteAllSessions },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={selectedMonth}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                >
                    {months.map(month => (
                        <Picker.Item key={month.value} label={month.label} value={month.value} />
                    ))}
                </Picker>
                
                <Picker
                    selectedValue={selectedYear}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                >
                    {years.map(year => (
                        <Picker.Item key={year.value} label={year.label} value={year.value} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.totalText}>Total Hours Worked: {formattedTotalTime}</Text>

            <FlatList
                data={filteredSessions}
                keyExtractor={(item) => item.id}
                renderItem={renderSession}
                ListEmptyComponent={() => (
                    <Text style={styles.entryText}>No work sessions recorded yet.</Text>
                )}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter recipient email"
                onChangeText={setRecipientEmail}
                value={recipientEmail}
            />

            <Button title="Send Email" onPress={() => sendEmail(filteredSessions)} />

            <Button
                title="Delete All Sessions"
                onPress={handleDeleteAllSessions}
                color="#ff6347" // Tomato color for the button
            />


                <Toolbar screen="DocumentScreen" />  
        </SafeAreaView> 
        
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4E0B5',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    entry: {
        backgroundColor: '#C98F60',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: 30,
    },
    entryText: {
        color: '#F4E0B5',
        fontSize: 16,
    },
    totalText: {
        color: '#C98F60',
        fontSize: 18,
        marginVertical: 10,
        marginLeft:10,
    },
    picker: {
        height: 50,
        width: 150,
        color: '#1E1E1E',
        backgroundColor: '#C98F60',
        borderColor: '#00FFFF',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        color: '#C98F60',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default DocumentScreen;