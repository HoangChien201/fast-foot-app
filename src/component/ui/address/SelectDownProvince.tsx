import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { provinceType } from '../../../contanst/ProvinceVietNamAPI'
import { Color } from '../../../contanst/color'

interface SelectDownProvinceProp {
    data: Array<provinceType>,
    updateValue: any,
    setIndexProvince: any,
    province?: number,
    district?: number,
    type: 'province' | 'district' | 'ward'
}

const SelectDownProvince: React.FC<SelectDownProvinceProp> = (props) => {
    const { data, updateValue, setIndexProvince, province, district, type } = props

    let dataProvince: Array<string> = []
    let defaultButtonText:string=''
    
    switch (type) {
        case 'province':
            dataProvince = [...data.map(province => province.name)]
            defaultButtonText='Chọn tỉnh'
            break;
        case 'district':
            if (province)
                dataProvince = [...data[province].districts.map(province => province.name)]
                defaultButtonText='Chọn quận, huyện'
            break;
        case 'ward':
            if (province && district)
                dataProvince = [...data[province].districts[district].wards.map(province => province.name)]
                defaultButtonText='Chọn phường, xã'
            break;
        default:
            break;
    }
    
    function onSelectDropDown(selectedItem: any, index: number) {
        switch (type) {
            case 'province':
                setIndexProvince((preValue:any) => { return { ...preValue, ['province']: index } })
                updateValue('city', selectedItem)
                break;
            case 'district':
                setIndexProvince((preValue:any) => { return { ...preValue, ['district']: index } })
                updateValue('district', selectedItem)
                break;
            case 'ward':
                updateValue('ward', selectedItem)
                break;
            default:
                break;
        }

    }

    return (
        <View style={styles.container}>
            <SelectDropdown
                data={dataProvince}
                onSelect={onSelectDropDown}
                buttonStyle={styles.input}
                selectedRowStyle={{ backgroundColor: Color.primary200 }}
                buttonTextStyle={styles.text}
                defaultButtonText={defaultButtonText}
                rowStyle={{backgroundColor:"#fff",borderColor:"#fff"}}
                rowTextStyle={{textAlign:'left'}}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdown}
            />
            <Image source={require('../../../assets/images/icon/icon-arrow-down.png')} style={styles.iconArrowDown}/>
        </View>
    )
}

export default SelectDownProvince

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        width:'100%',
        backgroundColor:'yellow'
    },
    input: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 10,
        height:55,
        backgroundColor:'#fff',
        width:'100%'

    },
    text: {
        textAlign: 'left',
        color: Color.placeholderTextColor,
        fontSize: 16,
    },
    iconArrowDown:{
        position:"absolute",
        right:10,
    },
    dropdown:{
        borderRadius:10,
    }
})