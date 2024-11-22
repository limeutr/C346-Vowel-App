import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { datasource } from './Data'; // Import datasource

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const Edit = ({ navigation, route }) => {
    const { key, type, index } = route.params || {}; // Default to empty object if route.params is undefined

    // Log received parameters to verify their values
    console.log('Received parameters:', { key, type, index });

    if (!key || !type || index === undefined) {
        Alert.alert("Error", "Invalid parameters passed to Edit screen.");
        return null; // You can also render an error UI here
    }

    const [letter, setLetter] = useState(key);

    const handleSave = () => {
        if (!letter || !/[a-zA-Z]/.test(letter)) {
            Alert.alert('Error', 'Please enter a valid letter.');
            return;
        }

        const indexnum = type === 'Vowels' ? 0 : 1;

        // Update the letter in the datasource
        datasource[indexnum].data[index].key = letter;

        Alert.alert('Success', 'Letter updated successfully.');
        navigation.navigate('Home');
    };

    const handleDelete = () => {
        const indexnum = type === 'Vowels' ? 0 : 1;
        datasource[indexnum].data.splice(index, 1);
        Alert.alert('Success', 'Letter deleted successfully.');
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Letter:</Text>
            <TextInput
                style={styles.input}
                value={letter}
                onChangeText={(text) => setLetter(text.trim())} // Trim input for clean letters
                maxLength={1} // Restrict input to 1 character
            />

            <View style={styles.buttonRow}>
                <Button title="Save" onPress={handleSave} />
                <View style={{ width: 10 }} />
                <Button title="Delete" onPress={handleDelete} color="red" />
            </View>
        </View>
    );
};


export default Edit;
