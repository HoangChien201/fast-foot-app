import { StyleSheet, Text, View, Image, Pressable, StyleProp, ImageProps } from 'react-native'
import React from 'react'

interface ButtonImageInterface {
    children?: string,
    source: ImageProps | string,
    style: any,
    textColor?: string,
    onPress?:any
}

const ButtonImage: React.FC<ButtonImageInterface> = ({ children, source, style, textColor,onPress }) => {
    return (
        <Pressable style={({ pressed }) => pressed && onPress && styles.pressed}>
            <View style={[styles.container, style]}>
                <Image
                    style={styles.image}
                    source={typeof(source) === 'string' ? {uri:source} : source}
                    resizeMode='contain' />
                {
                    children &&
                    <Text style={[styles.children, { color: textColor ? textColor : '#000' }]}>{children}</Text>
                }
            </View>
        </Pressable>
    )
}

export default ButtonImage

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.6
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'

    },
    children: {
        color: "#667080",
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.12,
        fontFamily: 'poppins',
        lineHeight: 24,
        marginLeft: 10

    },
    image: {
        width: 18,
        height: 18,
    }
})