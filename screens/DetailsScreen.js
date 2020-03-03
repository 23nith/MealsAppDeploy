import React, {useState, useEffect, useCallback } from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, ScrollView} from 'react-native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../stores/actions/meals';
import ItemTile from '../components/ItemTile';

const DetailsScreen = props => {
    const id = props.navigation.getParam("id");
    const meals = useSelector(state => state.meals.meals);
    const meal = meals.find(item => item.id === id);
    const favorites = useSelector(state => state.meals.favorites);
    const favorited = favorites.findIndex(item => item.id === id);
   
    const ingredients = meal.ingredients.map(item => {
        return <Text style={styles.txt}>  {item}</Text>
    })
    const steps = meal.steps.map((item, index) => {
        return <Text style={styles.txt}>{index + 1}) {item}</Text>
    })
    // set initial favorite state
    const [fav, setFav] = useState(favorited !== -1 ? true : false);
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
            {/* <Image source={{uri: meal.imageUrl}} style={styles.img}/> */}
            <ImageBackground source={{uri: meal.imageUrl}} style={styles.img}>
                <View style={styles.container2}>
                    <Text style={{...styles.headerTxt, fontSize: 25, fontWeight: "bold"}}>
                        {meal.title}
                    </Text>
                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                        <View style={{margin: 10}}>
                            <Text style={styles.headerTxt}>Vegan: {meal.isVegan?"Yes": "No"}</Text>
                            <Text style={styles.headerTxt}>Vegetarian: {meal.isVegetarian?"Yes": "No"}</Text>
                            <Text style={styles.headerTxt}>Lactose-free: {meal.isLactoseFree?"Yes": "No"}</Text>
                            <Text style={styles.headerTxt}>Gluten-free: {meal.isGlutenFree?"Yes": "No"}</Text>
                        </View>
                        <View style={{margin: 10}}>
                            <Text style={styles.headerTxt}>Affordability: {meal.affordability}</Text>
                            <Text style={styles.headerTxt}>Complexity: {meal.complexity}</Text>
                            <Text style={styles.headerTxt}>Duration: {meal.duration} min</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <ItemTile style={styles.tile} disabled="true">
                        <Text style={styles.txt}>Ingredients:</Text>
                            {ingredients}
                        <View style={{width: "100%"}}></View>
                    </ItemTile>
                    <ItemTile style={styles.tile} disabled="true">
                        <Text style={styles.txt}>Steps:</Text>
                            {steps}
                    </ItemTile>
                </ScrollView>
        </View>
    )
}

DetailsScreen.navigationOptions = navData => {
    const favoriteButton = navData.navigation.getParam("toggleFav");
    const favState = navData.navigation.getParam("favState");
    return {
        headerTitle: navData.navigation.getParam("title"),
        headerTitleStyle: {
            color: "white"
        },
        headerTintColor: "white",
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
        alignItems: "flex-start",
        width: "100%"
    },
    container2: {
        padding: 10
    },
    img: {
        width: "100%",
        height: 200,
        // padding: 10
    },
    scroll: {
        marginVertical: 10, 
        flexGrow: 1,
        width: "100%",
    },
    tile: {
        padding: 5
    },
    txt: {
        fontSize: 20,
        margin: 5
    },
    headerTxt: {
        fontSize: 20,
        color: "white"
    }
})

export default DetailsScreen;