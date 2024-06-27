// Settings.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import ThemeContext from '../ThemeContext';
import { gStyle } from '../styles/style';
import PlatformSpecificComponent from '../PlatformSpecificComponent.android';

// Основной компонент настроек
const SettingsScreen = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [fontSize, setFontSize] = useState('средний');

    const switchRef = useRef(null);

    useEffect(() => {
        const loadSettings = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setTheme('темная');
            setFontSize('большой');
        };

        loadSettings();

        if (switchRef.current) {
            switchRef.current.focus();
        }
    }, []);

    // Получение стилей в зависимости от темы
    const styles = theme === 'светлая' ? lightStyles : darkStyles;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Настройки</Text>
            <Text style={styles.item}>Размер шрифта: {fontSize}</Text>
            <Switch
                style={styles.item}
                value={fontSize === 'большой'}
                onValueChange={() => setFontSize(prevSize => (prevSize === 'средний' ? 'большой' : 'средний'))}
            />
            <Text style={styles.item}>Тема: {theme}</Text>
            <Switch
                style={styles.item}
                ref={switchRef}
                value={theme === 'темная'}
                onValueChange={() => setTheme(prevTheme => (prevTheme === 'светлая' ? 'темная' : 'светлая'))}
            />
            <ThemedText />
            <PlatformSpecificComponent />
        </View>
    );
};

// Компонент с текстом, зависящим от темы
const ThemedText = () => {
    const { theme } = useContext(ThemeContext);
    const styles = theme === 'светлая' ? lightStyles : darkStyles;

    return (
        <View>
            <Text style={styles.text}>
                Проверка цвета текста
            </Text>
        </View>
    );
};

// Стили для светлой темы
const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 16,
    },
    item: {
        marginBottom: 10,
        marginTop: 10,
        color: '#000',
    },
    title: {
        fontFamily: 'text-b',
        textAlign: 'center',
        marginTop: 20,
        color: '#333333',
        fontSize: 20,
        marginBottom: 16,
    },
    text: {
        color: 'black',
    }
});

// Стили для темной темы
const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        padding: 16,
    },
    item: {
        marginBottom: 10,
        marginTop: 10,
        color: '#fff',
    },
    title: {
        fontFamily: 'text-b',
        textAlign: 'center',
        marginTop: 20,
        color: '#fff',
        fontSize: 20,
        marginBottom: 16,
    },
    text: {
        color: 'white',
    }
});

export default SettingsScreen;
