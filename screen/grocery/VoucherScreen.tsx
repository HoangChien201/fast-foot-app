import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import ButtonCustom from '../../component/ui/ButtonCustom'
import Animated,{ useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { PanGestureHandler, PanGestureHandlerGestureEvent,GestureHandlerRootView } from 'react-native-gesture-handler';

const VoucherScreen = () => {
  const width = useSharedValue(100);
  const translateX=useSharedValue(0)

  const {width:SCREEN_WIDTH} = Dimensions.get('window')
  
  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  const panGestureHandler=useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
    {
      onActive:(event)=>{
        translateX.value=withSpring(event.translationX);
        console.log(event.translationX);
        
      },
      onEnd:()=>{
        if(translateX.value < -25 && translateX.value > -300){
            translateX.value=-50
        }
        if(translateX.value >-25){
          translateX.value=0
        }
        if(translateX.value < -300){
          translateX.value=-SCREEN_WIDTH
      }
      }
    }
  )

  const rStyle=useAnimatedStyle(()=>({
    transform:[
      {
        translateX:translateX.value
      }
    ]
  }))

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.taskContainer}>
          <TouchableOpacity style={styles.button}>
            <IconAntDesign name='delete' size={24} color='red' />
          </TouchableOpacity>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[rStyle,styles.title]}>
            <Text>Kéo qua trái để qua</Text>
          </Animated.View>

        </PanGestureHandler>
      </View>
    </View>
  )
}

export default VoucherScreen;
const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    elevation: 6,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
    padding: 10
  },
  title: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    justifyContent: 'center',
    alignItems: "center",
    position: 'absolute',
    right: 20
  }
})