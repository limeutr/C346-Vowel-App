import React from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { datasource } from './Data.js';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const renderItem = ({ item, index, section, navigation }) => {
    if (!item.key) {
        console.error('Item key is missing:', item);
        return null;
    }

    console.log('Navigating to Edit screen with:', {
        index,
        type: section.title,
        key: item.key
    });

    return (
        <TouchableOpacity
            style={{ borderWidth: 1 }}
            onPress={() => {
                navigation.navigate("Edit", {
                    index: index,
                    type: section.title,
                    key: item.key
                });
            }}
        >
            <Text style={{ fontSize: 15, margin: 10, textAlign: 'left' }}>
                {item.key}
            </Text>
        </TouchableOpacity>
    );
};





const Home = ({ navigation }) => (
    <View>
        <StatusBar />
        <Button title='Add Letter' onPress={() => { navigation.navigate('Add'); }} />
        <SectionList
            sections={datasource}
            renderItem={(props) => renderItem({ ...props, navigation })}
            renderSectionHeader={({ section: { title, bgcolor } }) => (
                <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>{title}</Text>
            )}
        />
        {/*<Button title='Edit' onPress={() => { navigation.navigate('Edit'); }} />*/}
    </View>
);

export default Home;
