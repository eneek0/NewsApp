import React, { useReducer, createContext, useContext, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { gStyle } from '../styles/style';

const ActionTypes = {
  INCREMENT: 'INCREMENT',
};

const ShareCounterContext = createContext();

const shareCounterReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const formatPublishTime = (timestamp) => {
  return `Published on: ${new Date(timestamp).toLocaleString()}`;
};

export default function FullItem({ route }) {
  const [state, dispatch] = useReducer(shareCounterReducer, { count: 0 });

  const handleShare = useCallback(() => {
    dispatch({ type: ActionTypes.INCREMENT });
  }, []);

  const PublishTime = new Date(2024, 0, 8, 19, 0).getTime();
  const formattedPublishTime = useMemo(() => {
    return formatPublishTime(PublishTime);
  }, [PublishTime]);

  return (
    <ShareCounterContext.Provider value={{ shareCounterState: state, shareCounterDispatch: dispatch }}>
      <View style={gStyle.main}>
        <Image source={{
          width: '100%',
          height: 270,
          uri: route.params.img
        }}/>
        <Text style={[gStyle.title, styles.title]}>{route.params.name}</Text>
        <Text style={gStyle.text}>{route.params.full}</Text>
        <View style={styles.publishTimeContainer}>
          <Text>{formattedPublishTime}</Text>
        </View>
        <View style={styles.shareContainer}>
          <Button
            title="Share"
            onPress={handleShare}
          />
          <Text>Shares: {state.count}</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </ShareCounterContext.Provider>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
    paddingBottom: 5, 
  },
  publishTimeContainer: {
    marginTop: 10,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
