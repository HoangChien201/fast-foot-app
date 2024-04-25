import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from '../LoginScreen';
import SignUpScreen from '../SignUpScreen';
import { Color } from '../../../contanst/color';
import { LOGO_APP } from '../../../contanst/contanst';

interface MyTopTasbBarProp{
    state:any,
    descriptors:any, 
    navigation:any, 
    position:any
}


const MyTopTasbBar : React.FC<MyTopTasbBarProp> =({ state, descriptors, navigation, position }) =>{
    return (
        <View style={styles.headingContainer}>
            <View style={styles.optionContainer}>
                {state.routes.map((route:any, index:number) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            style={styles.separation}
                            key={index}
                        >
                            <View style={[styles.option,isFocused && styles.activeOption]}>
                                <Text style={styles.lableOption}>{label == 'Login'? ' Login' :' Register' }</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Image source={LOGO_APP} style={styles.logo} resizeMode='contain' />

        </View>
    );
}
export default MyTopTasbBar;
const styles = StyleSheet.create({
    headingContainer: {
        height: '34%',
        backgroundColor: "#fff",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

    },
    logo: {
        width: '100%',
        height: "100%"
    },
    optionContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 39,
        flex: 1
    },
    separation: {
        width: '50%',
        alignItems: 'center',
        justifyContent:'center',
    },
    option: {
        width: '60%',
        height: '100%',
        alignItems: 'center',
        justifyContent:'center',
    },
    activeOption: {
        borderBottomWidth: 3,
        borderBottomColor: Color.primary200
    },
    lableOption: {
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
    },
    line: {
        height: 3,
        width: "60%",
        backgroundColor: Color.primary200
    },
    wrapper: {
        flex: 1
    },
})