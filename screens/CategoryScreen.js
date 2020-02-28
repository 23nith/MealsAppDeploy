import React, { useEffect } from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
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
                style={{backgroundColor: itemData.item.color}}
            >
                <Text>{itemData.item.title}</Text>
                <Image source={{uri: itemData.item.imageUrl}} style={styles.img}/>
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
        headerStyle: {
            backgroundColor: "red"
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

export default CategoryScreen;