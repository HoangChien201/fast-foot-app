import {View,StyleSheet,Text,TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../contanst/color'

export default function Search(){
    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name='search' color={Color.primary400} size={20}/>
            <TextInput placeholder='Search' placeholderTextColor={Color.primary400} />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:Color.primary300,
        width:'100%',
        height:50,
        borderRadius:10,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:10
    },
    icon:{
        marginHorizontal:10
    },
})