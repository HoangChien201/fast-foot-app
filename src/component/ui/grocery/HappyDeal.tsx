import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
const HappyDeal = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FF0000', '#C8102E', '#C8102E']}
                style={styles.wrapper_full}
            >
                <View style={{ width: '50%' }}>
                    <Text style={[styles.heading, { color: "#fff" }]}>Christmas</Text>
                    <Text style={[styles.description, { color: '#fff' }]} >Welcome the festive season with special dishes available during the Christmas season. Order now to experience the unique and classy fragrance.</Text>
                </View>
                <Image source={require('../../../assets/images/advertisement/chirstmas.png')} />
            </LinearGradient>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                <View style={styles.wrapper_half}>
                    <Image
                        source={require('../../../assets/images/advertisement/large-discount.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode='stretch'
                    />
                </View>
                <View style={styles.wrapper_half}>
                    <Image
                        source={require('../../../assets/images/advertisement/try-new.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode='stretch'
                    />
                </View>
            </View>
        </View>

    )
}

export default HappyDeal

const styles = StyleSheet.create({
    container: {
        height: 350,
        justifyContent:'space-around'
    },
    headingContainer: {

    },
    heading: {
        fontSize: 24,
        fontFamily: 'poppins',
        letterSpacing: 0.67,
        fontWeight: '700',
        color:'#000'
    },
    description: {
        fontSize: 15,
        fontFamily: "roboto"
    },
    wrapper_full: {
        height: 180,
        backgroundColor: 'rgba(252, 163, 132, 1)',
        borderRadius: 13,
        padding: 16,
        flexDirection: 'row',
        justifyContent: "space-between"

    },
    wrapper_half: {
        width: '48%',
        height: 150,
        overflow: 'hidden',
        borderRadius: 13
    },
})