import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { provinceType } from '../../../contanst/ProvinceVietNamAPI'
import { Color } from '../../../contanst/color'

interface SelectDownComponentProp {
    data: Array<provinceType>,
    updateValue: any,
    setIndexProvince: any,
    province?: number | null,
    district?: number | null,
    type: 'province' | 'district' | 'ward',
    disabled?: boolean | null
}

const POSITION_FIRST = 0;

const SelectDownComponent: React.FC<SelectDownComponentProp> = (props) => {
    const { data: dataRoot, updateValue, setIndexProvince, province, district, type, disabled = false } = props

    let data: Array<string> = []
    let defaultButtonText: string = ''

    switch (type) {
        case 'province':
            data = [...dataRoot.map(province => province.name)]
            defaultButtonText = 'Choose province'
            break;
        case 'district':
            if (province) {

                let provinceData = dataRoot.find(item => item.code === province)

                data = provinceData ? provinceData.districts.map(item => item.name) : []
                // defaultButtonText = data[0]

                break;
            }
            defaultButtonText = 'Choose district'
            break;

        case 'ward':
            if (province && district) {
                let provinceData = dataRoot.find(item => item.code === province)
                let districtsData = provinceData ? provinceData.districts.find(item => item.code === district) : null

                data = districtsData ? districtsData.wards.map(item => item.name) : []
                // defaultButtonText = data[0]
                break;
            }
            defaultButtonText = 'Choose ward'

            break;
    }

    function onSelectDropDown(selectedItem: any, index: number) {
        switch (type) {
            case 'province':
                {

                    const province = dataRoot[index]
                    const district = dataRoot[index]?.districts[POSITION_FIRST]; //lấy tỉnh theo index, lấy code quận đầu tiền
                    const ward = district?.wards[POSITION_FIRST]; // lấy code phường đầu tiên của huyện

                    setIndexProvince((preValue: any) => {
                        return {
                            ...preValue, ['province']: province.code,
                            ['district']: district.code,
                            ['ward']: ward.code
                        }

                    })//lấy code của tỉnh

                    //update tên
                    updateValue({
                        'province': province.name,
                        'district': district.name,
                        'ward': ward.name
                    })

                    break;
                }
            case 'district':
                setIndexProvince((preValue: any) => { return { ...preValue, ['district']: dataRoot.find(item => item.code === province)?.districts[index].code } })//tìm tỉnh theo code, lấy code quận theo index 
                updateValue({
                    'district': selectedItem
                })
                break;
            case 'ward':
                updateValue({
                    'ward': selectedItem
                })

                break;
            default:
                break;
        }

    }

    return (
        <View style={[styles.input, { marginBottom: 20 }]}>
            
            <SelectDropdown
                data={data}
                onSelect={onSelectDropDown}
                showsVerticalScrollIndicator={false}
                
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem) || defaultButtonText}
                            </Text>
                        </View>
                    );
                }}

                renderItem={(item, index, isSelected) => {
                    return (
                        <View style={[styles.input, { backgroundColor: isSelected ? Color.primary200 : '#fff' }]}>
                            <Text >{item}</Text>
                        </View>
                    );
                }}
                
                
            />
            <Image source={require('../../../assets/images/icon/icon-arrow-down.png')} style={styles.iconArrowDown} />
        </View>
    )
}

export default SelectDownComponent

const styles = StyleSheet.create({
    input: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 10,
        height: 55,
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'center',

    },
    dropdownButtonStyle: {
        width: '100%',
        height: '100%',
        justifyContent:'center'
    },
    dropdownButtonTxtStyle: {
        fontSize: 15,
    },
    iconArrowDown: {
        position: "absolute",
        right: 10,
    },
    dropdown: {
        borderRadius: 10,
    }
})