import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import ItemTile from '../components/ItemTile';
import { FlatList } from 'react-native-gesture-handler';
// import { MEALS } from '../data/dummy-data';
import { useSelector } from 'react-redux';

const FavoritesScreen = props => {
    const favorites = useSelector(state => state.meals.favorites);
    // const filters = useSelector(state => state.meals.filters);
    // const filteredFavorites = favorites.filter(meal=> {
    //     return meal.isGluttenFree === filters.gluttenFree && meal.isVegan === filters.vegan && meal.isVegetarian === filters.vegetarian && meal.isLactoseFree === filters.lactoseFree
    // })
    const renderGridItem = itemData => {
        return (
            <ItemTile onSelect={()=> {
                props.navigation.navigate({
                    routeName: "Details",
                    params: {
                        title: itemData.item.title,
                        color: "orange",
                        id: itemData.item.id
                    }
                })
            }}>
                <Text>{itemData.item.title}</Text>
                <Image source={{uri: itemData.item.imageUrl}} style={styles.img}/>
            </ItemTile>
        )
    }
    return (
        <FlatList
            data={favorites}
            renderItem={renderGridItem}
            numColumns={2}
        />
    )
}

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: "Favorites",
        headerTitleStyle: {
            color: "white"
        },
        headerStyle: {
            backgroundColor: "red"
        },
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Menu"
                        iconName="ios-menu"
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                        color="white"
                    />
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: "100%",
        height: 150
    }
})

export default FavoritesScreen;