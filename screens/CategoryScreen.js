import React, { useEffect } from 'react';
import {View, StyleSheet, Text, FlatList, Image, ImageBackground} from 'react-native';
import ItemTile from '../components/ItemTile';
// import { MEALS } from '../data/dummy-data';
import { useSelector } from 'react-redux';


const CategoryScreen = props => {
    const id = props.navigation.getParam("id");
    const meals = useSelector(state=>state.meals.filteredMeals);
    // const filters = useSelector(state=>state.meals.filters);
    // let theFilteredMeals = meals.filter(meal=> {
    //     return meal.isGluttenFree === filters.gluttenFree && meal.isVegan === filters.vegan && meal.isVegetarian === filters.vegetarian && meal.isLactoseFree === filters.lactoseFree
    // })

    const theMeals = meals.filter(meal => {
        const result = meal.categoryIds.findIndex(item=> item === id);
        return result !== -1
    })
    const renderItem = itemData => {
        return (
            <ItemTile onSelect={()=>{
                props.navigation.navigate({
                    routeName: "Details",
                    params: {
                        title: itemData.item.title,
                        color: "red",
                        id: itemData.item.id
                    }
                })
            }}    
            >
                <ImageBackground source={{uri: itemData.item.imageUrl}} style={styles.img}>
                    <Text style={styles.txt}>{itemData.item.title}</Text>
                </ImageBackground>
                {/* <Image source={{uri: itemData.item.imageUrl}} style={styles.img}/> */}
            </ItemTile>
        )
    }
    return (
        <FlatList
            data={theMeals}
            renderItem={renderItem}
        />
    )
}

CategoryScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam("title"),
        headerTitleStyle: {
            color: "white"
        },
        headerTintColor: "white",
        headerStyle: {
            backgroundColor: "red",
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
        height: 150,
        // padding: 20
    },
    txt: {
        margin: 20,
        color: "white",
        fontSize: 30
    }
})

export default CategoryScreen;