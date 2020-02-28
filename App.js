import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from './navigation/MainNavigation';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import mealsReducer from './stores/reducers/meals';
import {composeWithDevTools} from 'redux-devtools-extension';

const Reducers = combineReducers({
  meals: mealsReducer
})

const store = createStore(Reducers,composeWithDevTools());

export default function App() {
  return (
    <Provider store={store}>
      <TabNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
