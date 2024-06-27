// export default TopicsSelectionPage;
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'; 
import { gStyle } from '../styles/style';
import ThemeContext from '../ThemeContext';

const TopicsSelectionPage = () => {
    const { theme } = useContext(ThemeContext);
    const [selectedTopics, setSelectedTopics] = useState([]);

    const toggleTopic = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((selected) => selected !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const topics = [
        { id: 1, name: 'Спорт' },
        { id: 2, name: 'Развлечения' },
        { id: 3, name: 'Технологии' },
        { id: 4, name: 'Политика' },
        { id: 5, name: 'Наука' },
    ];

    const styles = theme === 'светлая' ? lightStyles : darkStyles;

    return (
        <View style={styles.container}>
            <Text style={[gStyle.title, styles.title]}>Выберите интересующие вас темы</Text>
            {topics.map((topic) => (
                <TouchableOpacity key={topic.id} onPress={() => toggleTopic(topic.name)}>
                    <View style={styles.topicContainer}>
                        <CheckBox
                            checked={selectedTopics.includes(topic.name)}
                            onPress={() => toggleTopic(topic.name)}
                        />
                        <Text style={styles.topicText}>{topic.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    topicContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    topicText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#333',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fdfdfd',
    },
    topicContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    topicText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#fdfdfd',
    },
});

export default TopicsSelectionPage;
