import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native'; // To use navigation
import { datasource } from './Data'; // Ensure 'datasource' is defined

const App = () => {
    const [letter, setLetter] = useState('');
    const [letterType, setLetterType] = useState('Vowels'); // Default value: "Vowels"
    const navigation = useNavigation(); // Access navigation object

    const handleSubmit = () => {
        if (!letter || !/[a-zA-Z]/.test(letter)) {
            Alert.alert('Error', 'Please enter a valid letter.');
            return;
        }

        let item = { key: letter };
        let indexnum = letterType === 'Vowels' ? 0 : 1;

        // Push the new item to the appropriate section in the datasource
        datasource[indexnum]?.data?.push(item);

        // Navigate back to the Home screen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Letter:</Text>
            <TextInput
                style={styles.input}
                value={letter}
                onChangeText={(text) => setLetter(text)}
                maxLength={1} // Restrict input to 1 character
            />

            <Text style={styles.label}>Letter Type:</Text>
            <RNPickerSelect
                onValueChange={(value) => setLetterType(value)}
                items={[
                    { label: 'Vowels', value: 'Vowels' },
                    { label: 'Consonants', value: 'Consonants' },
                ]}
                value={letterType}
                style={{
                    inputAndroid: styles.picker,
                    inputIOS: styles.picker,
                }}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

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
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default App;
