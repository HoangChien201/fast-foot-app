import { Image, 
    StyleSheet, 
    Text, 
    View,
    Pressable 
} from "react-native";
import { Color } from "../../contanst/color";

export default function OurMenuItem({active,name,image}:{active:boolean,name:string,image:any}){
    return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri:image}} resizeMode="contain"/>
                <Text style={[styles.name,{ color: !active ? '#000' : Color.primary200 }]}>{name}</Text>
            </View>

    )
}

const styles=StyleSheet.create({
    pressed:{
        opacity:0.7
    },
    container:{
        alignItems:'center',
    },
    image:{
        width:'80%',
        height:'75%'
    },
    name:{
        color:'#000',
        fontWeight:'bold'
    }
})
