import React, {useState, useEffect, useCallback } from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../stores/actions/meals';

const DetailsScreen = props => {
    const id = props.navigation.getParam("id");
    const meals = useSelector(state => state.meals.meals);
    const meal = meals.find(item => item.id === id);
    const favorites = useSelector(state => state.meals.favorites);
    const favorited = favorites.findIndex(item => item.id === id);
    // set initial favorite state
    const [fav, setFav] = useState(favorited !== -1 ? true : false);
    const title = props.navigation.getParam("title");
    const dispatch = useDispatch();

    const favoriteToggleHandler = useCallback(() => {
        setFav(!fav);
        dispatch(addToFavorites(id))
    },[fav, setFav, id])

    useEffect(()=> {
        props.navigation.setParams({
            toggleFav: favoriteToggleHandler,
            favState: fav
        })
    }, [favoriteToggleHandler, fav])

    return (
        <View style={styles.container}>
            <Image source={{uri: meal.imageUrl}} style={styles.img}/>
            <Text>
                {meal.title}
            </Text>
            <Text>
                {meal.ingredients}
            </Text>
            <View style={{marginVertical: 10}}>
                <Text style={styles.txt}>Gluten-free: {meal.isGlutenFree?"Yes": "No"}</Text>
                <Text style={styles.txt}>Vegan: {meal.isVegan?"Yes": "No"}</Text>
                <Text style={styles.txt}>Vegetarian: {meal.isVegetarian?"Yes": "No"}</Text>
                <Text style={styles.txt}>Lactose-free: {meal.isLactoseFree?"Yes": "No"}</Text>
            </View>
        </View>
    )
}

DetailsScreen.navigationOptions = navData => {
    const favoriteButton = navData.navigation.getParam("toggleFav");
    const favState = navData.navigation.getParam("favState");
    return {
        headerTitle: navData.navigation.getParam("title"),
        headerStyle: {
            backgroundColor: navData.navigation.getParam("color")
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Favorite"
                        iconName={favState === true ? "ios-star" : "ios-star-outline"}
                        onPress={() => {
                            console.log("Marked as favorite");
                            favoriteButton();
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
        justifyContent: "flex-start",
        alignItems: "center"
    },
    img: {
        width: "100%",
        height: 150
    },
    txt: {
        fontSize: 20
    }
})

export default DetailsScreen;