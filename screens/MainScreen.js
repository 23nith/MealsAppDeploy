import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import ItemTile from '../components/ItemTile';
import { CATEGORIES } from '../data/dummy-data';


const MainScreen = props => {
    const renderGridItem = itemData => {
        return (
            <ItemTile title={itemData.item.title} 
                onSelect={()=> {
                        props.navigation.navigate({
                            routeName: "Category",
                            params: {
                                title: itemData.item.title,
                                id: itemData.item.id
                            }
                        })
                    }
                }
                style={{backgroundColor: itemData.item.color, ...styles.tile}}
            >
                <Text style={styles.txt}>
                    {itemData.item.title}
                </Text>
            </ItemTile>
        )
    }
    return (
            <FlatList
                data={CATEGORIES}
                renderItem={renderGridItem}
                numColumns={2}
            />
    )
}

MainScreen.navigationOptions = navData => {
    return {
        headerTitleStyle: {
          color: "white"
        },
        headerStyle: {
            backgroundColor: "red",
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
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "blue",
        width: "100%"
    },
    tile: {
        // width: "50%",
        // marginVertical: 20,
        padding: 20,
        height: 150
    },
    txt: {
        fontSize: 23,
        color: "white"
    }
})

export default MainScreen;