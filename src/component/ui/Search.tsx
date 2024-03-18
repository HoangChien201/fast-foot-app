import { View, StyleSheet, Text, TextInput, TouchableOpacity, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../contanst/color'
import { useNavigation } from '@react-navigation/native'
import { navigationType } from '../navigation/ManageNavigation'

export default function Search({ editable,onChangeText }: { editable: boolean,onChangeText?:any }) {
    const navigation: navigationType = useNavigation()
    function searchOnpress() {
        if (!editable)
            navigation.navigate("SearchScreen")
    }
    return (
        <Pressable style={({pressed})=>pressed && !editable && styles.pressed} onPress={searchOnpress}>
            <View style={styles.container}>
                <Icon style={styles.icon} name='search' color={Color.primary400} size={20} />
                <TextInput placeholder='Search' placeholderTextColor={Color.primary400} editable={editable} onChangeText={onChangeText}/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.6
    },
    container: {
        backgroundColor: Color.primary300,
        width: '100%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    icon: {
        marginHorizontal: 10
    },
})