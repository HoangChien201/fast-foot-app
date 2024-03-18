import { StyleSheet, Text, View, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color } from '../../../contanst/color'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import ModalCalendar from '../ModalCalendar'
import { FormarDate } from '../../../contanst/FormatDate'
type timeSlotType={
    id:string,
    time:string
}

const timeSlots:timeSlotType[] = [
    {
        id: '1',
        time:'8 AM -11 AM'
    },
    {
        id: '2',
        time:'11 AM - 13 PM'
    },
    {
        id: '3',
        time:'13 PM - 15 PM'
    },
    {
        id: '4',
        time:'15 PM - 17 PM'
    },
    {
        id: '5',
        time:'17 PM - 19 PM'
    },
    {
        id: '6',
        time:'19 PM - 21 PM'
    },
]
const ExpectedTime = ({updateValuePayment}:{updateValuePayment:any}) => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false)
    const [valueCalendar,setValueCalendar]=useState('Select Date')
    const [valueTime,setValueTime]=useState('')

    function TimeSlotComponent({time }: { time: timeSlotType}) {
        let active=false;
        if(valueTime === time.id){
            active=true
        } 
            
        return (
            <TouchableOpacity onPress={()=>setValueTime(time.id)}>
                <View style={[styles.timeSlotContainer,active && styles.active]}>
                    <Text style={[styles.time,{ color: active ? Color.primary200 : Color.textBrown }]}>{time.time}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    function OnSubmitCalendar(calendar:string){
        setValueCalendar(FormarDate(calendar))
        setIsCalendarVisible(false)
    }

    useEffect(()=>{
        if(valueCalendar && valueTime){
            let time=timeSlots.find((time)=>time.id===valueTime)

            // updateValuePayment("dateTime",{date:valueCalendar,time:time?.time})
            updateValuePayment("expectedTime",`${valueCalendar} ${time?.time}`)

        }
    },[valueCalendar,valueTime])
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Ngày và thời gian muốn nhận</Text>
            <TouchableOpacity onPress={()=>setIsCalendarVisible(true)}>
                <View style={styles.selectDateContainer}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Image source={require('../../../assets/images/icon/icon-date.png')} />
                        <Text style={styles.textSelectDate}>{valueCalendar}</Text>
                    </View>
                    <Image source={require('../../../assets/images/icon/icon-arrow-down.png')} />

                </View>
            </TouchableOpacity>
            <View>
                <FlatList
                    data={timeSlots}
                    renderItem={({ item }) => {
                        return (
                            <TimeSlotComponent time={item}/>
                        )
                    }}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    numColumns={3}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.numColunmStyle}
                />
            </View>
            <ModalCalendar isVisible={isCalendarVisible} onSubmit={OnSubmitCalendar}/>

            
        </View>
    )
}

export default ExpectedTime

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 230,
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 23,
        elevation:1

    },
    title: {
        color: Color.textBrown,
        fontWeight: 'bold',
        fontSize: 18
    },
    selectDateContainer: {
        height: 48,
        width: '100%',
        borderRadius: 7,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 16
    },
    textSelectDate: {
        color: 'rgba(109, 56, 5, 0.64)',
        fontSize: 16,
        fontWeight: "400",
        textTransform: 'capitalize',
        marginStart: 10
    },
    timeSlotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 7,
        width: 104,
        marginBottom: 16,
        borderWidth:1,
        borderColor: '#fff'

    },
    time: {
        color: Color.textBrown,
        fontSize: 12,
        fontWeight: '400',

    },
    numColunmStyle: {
        flex: 1,
        justifyContent: 'space-between'
    },
    active: {
        borderColor: Color.primary200
    }

})