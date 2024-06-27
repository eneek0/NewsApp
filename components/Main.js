import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { gStyle } from '../styles/style';
import ThemeContext from '../ThemeContext';
import loadDataToStorage from '../loadDataToStorage';
import cleanStorage from '../cleanStorage';
import getDataFromStorage from '../getDataFromStorage';
import response from '../responce';

export default function Main({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    (async function () {
        await loadDataToStorage(response);
        await setNewsFromStorage()
    })();
    return () => {
        (async function () {
            await cleanStorage()
        })()
    }
}, [])

const setNewsFromStorage = async () => {
  const parsedData = await getDataFromStorage();
      setNews(parsedData)
}

  const styles = theme === 'светлая' ? lightStyles : darkStyles;
  return (
    <View style={[gStyle.main, styles.container]}>
      <Text style={[styles.maintitle]}>Последние новости</Text>
      <FlatList data={news} renderItem={({item}) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('FullInfo', item)}>
          <Image source={{
            width: '100%',
            height: 270,
            uri: item.img
          }}/>
          <Text style={styles.title}>{ item.name }</Text>
        </TouchableOpacity>
      )}/>
    </View>
  );
}
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginBottom: 30,
    borderWidth: 0.5,
    borderColor: '#c9c9c9',
  },
  title: {
    color: '#333333',
    fontFamily: 'text-b',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  maintitle: {
    fontFamily: 'text-b',
    color: '#333333',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
  }
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginBottom: 30,
    borderWidth: 0.5,
    borderColor: '#666',
  },
  title: {
    color: '#fdfdfd',
    fontFamily: 'text-b',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  maintitle: {
    fontFamily: 'text-b',
    color: '#fdfdfd',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginBottom: 30,
    borderWidth: 0.5,
    borderColor: '#c9c9c9',
  },
  title: {
    fontFamily: 'text-b',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#333333',
    marginBottom: 15,
  }
});
