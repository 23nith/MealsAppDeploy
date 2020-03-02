import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../stores/actions/meals';

const FiltersScreen = props => {
    // const filters = useSelector(state => state.meals.filters);
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const dispatch = useDispatch();
    
    const saveFilterHandler = useCallback(() => {
        const filters = {
            glutenFree: isGlutenFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
            lactoseFree: isLactoseFree
        }
        dispatch(setFilter(filters))
    }, [dispatch, isGlutenFree, isVegan, isVegetarian, isLactoseFree])

    useEffect(()=>{
        props.navigation.setParams({saveFilter: saveFilterHandler})
        console.log("useeffect triggered")
    }, [saveFilterHandler])

    // useEffect(()=>{
    //     const filters = {
    //         glutenFree: isGlutenFree,
    //         vegan: isVegan,
    //         vegetarian: isVegetarian,
    //         lactoseFree: isLactoseFree
    //     }
    //     dispatch(setFilter(filters))
    // },[dispatch, isGlutenFree, isVegan, isVegetarian, isLactoseFree])

    return (
        <View style={styles.container}>
            <Text style={styles.headtxt}>
                Set Filters
            </Text>
            <View style={styles.row}>
                <Text style={styles.txt}>Gluten-Free</Text>
                <Switch 
                    value={isGlutenFree}
                    onValueChange={()=>{setIsGlutenFree(!isGlutenFree)}}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.txt}>Vegan</Text>
                <Switch
                    value={isVegan}
                    onValueChange={()=>{setIsVegan(!isVegan)}}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.txt}>Vegetarian</Text>
                <Switch
                    value={isVegetarian}
                    onValueChange={()=>{setIsVegetarian(!isVegetarian)}}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.txt}>Lactose-Free</Text>
                <Switch
                    value={isLactoseFree}
                    onValueChange={()=>{setIsLactoseFree(!isLactoseFree)}}
                />
            </View>
            <Text style={{marginTop: 15}}>Hit save to apply filters.</Text>
        </View>
    )
}

FiltersScreen.navigationOptions = navData => {
    const saveFilter = navData.navigation.getParam("saveFilter");
    return {
        headerTitle: "Set Filters",
        headerTitleStyle: {
            color: "white"
        },
        headerStyle: {
            backgroundColor: "blue"
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
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Save"
                        iconName="ios-save"
                        onPress={() => {
                            console.log("Saving filters")
                            saveFilter();
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
        alignItems: "center",
        paddingTop: 30
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        // borderColor: "red",
        // borderWidth: 2,
        width: "60%",
        marginVertical: 10
    },
    txt: {
        fontSize: 20
    },
    headtxt: {
        fontSize: 25,
        marginBottom: 10
    }
})

export default FiltersScreen;