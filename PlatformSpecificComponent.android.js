import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const PlatformSpecificComponent = () => {
    return (
        <View>
            { Platform.OS === 'android' && 
                <Text style={styles.text}>@ANDROID dev</Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#C0C0C0',
    },
});

export default PlatformSpecificComponent;
