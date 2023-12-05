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
            defaultButtonText='Select an province'
            break;
        case 'district':
            if (province)
                dataProvince = [...data[province].districts.map(province => province.name)]
                defaultButtonText='Select an district'
            break;
        case 'ward':
            if (province && district)
                dataProvince = [...data[province].districts[district].wards.map(province => province.name)]
                defaultButtonText='Select an ward'
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
            />
            <Image source={require('../../../assets/images/icon/icon-arrow-down.png')} style={styles.iconArrowDown}/>
        </View>
    )
}

export default SelectDownProvince

const styles = StyleSheet.create({
    container:{
        height:50,
        justifyContent:'center',
        width:'100%',
        marginBottom: 35,
        
    },
    input: {
        height: 50,
        backgroundColor: Color.backgroundInput,
        borderRadius: 5,
        paddingHorizontal: 18,
        width: '100%',

    },
    text: {
        textAlign: 'left',
        color: Color.textBrown1,
        fontSize: 16,
    },
    iconArrowDown:{
        position:"absolute",
        right:10,
    }
})