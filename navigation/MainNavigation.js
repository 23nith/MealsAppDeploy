import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React from 'react';

import MainScreen from '../screens/MainScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CategoryScreen from '../screens/CategoryScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FiltersScreen from '../screens/FiltersScreen';


const MainNavigation = createStackNavigator({
    Main: {
        screen: MainScreen
    },
    Category: {
        screen: CategoryScreen
    },
    Details: {
        screen: DetailsScreen
    }
},)

const FavoriteStack = createStackNavigator({
    Favorite: {
        screen: FavoritesScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: "orange"
            }
        }
    },
    Details: {
        screen: DetailsScreen,
    }
})

const tabConfig = {
    All: {
        screen: MainNavigation,
        navigationOptions: {
            tabBarColor: "red",
            tabBarIcon: tabInfo => {
                return(
                    <Ionicons
                        name="ios-restaurant"
                        size={23}
                        color={tabInfo.tintColor}
                    />
                )
            }
        }
    },
    Favorites: {
        screen: FavoriteStack,
        navigationOptions: {
            tabBarColor: "orange",
            tabBarIcon: tabInfo => {
                return(
                    <Ionicons
                        name="md-restaurant"
                        size={23}
                        color={tabInfo.tintColor}
                    />
                )
            }
        }
    }
}

const TabNavigation = Platform.OS !== 'android' ? createBottomTabNavigator(
    tabConfig, {
        tabBarOptions: {
            activeTintColor: "orange",
        }
    }
) : createMaterialBottomTabNavigator(tabConfig, {
    activeTintColor: "orange",
    shifting: true
})

const filterStack = createStackNavigator({
    filter: {
        screen: FiltersScreen
    }
})

const DrawerNavigation = createDrawerNavigator({
    All: {
        screen: TabNavigation
    },
    Filter: {
        screen: filterStack
    }
})

export default createAppContainer(DrawerNavigation);