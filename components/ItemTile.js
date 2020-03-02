import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ItemTile = props => {
    return (
        <View style={{...styles.container}}>
            <TouchableOpacity style={{...styles.card, ...props.style}} onPress={props.onSelect} disabled={props.disabled}>
                {/* <Text>{props.title}</Text> */}
                {props.children}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignContent: "center",
        width: "100%",
        // borderWidth: 2,
        // borderColor: "red",
        padding: 10,
    },
    card: {
        shadowColor: "black",
        shadowOpacity: .25,
        shadowRadius: 5,
        shadowOffset: {width: 0, height: 2},
        elevation: 8,
        borderRadius: 5,
        // height: 150,
        backgroundColor: "white",
        // borderWidth: 2,
        // borderColor: "green",
        // padding: 20,
        overflow: "hidden"
    },
})

export default ItemTile;