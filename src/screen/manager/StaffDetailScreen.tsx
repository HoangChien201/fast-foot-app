import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ButtonIcon from '../../component/ui/ButtonIcon'
import { Color } from '../../contanst/color'
import InfomationStaff from '../../component/ui/staff/InfomationStaff'
import InformationSummaryStaff from '../../component/ui/staff/InformationSummaryStaff'

const StaffDetailScreen = () => {

  const [numberOfLinesAbout,setNumOfLinesAbout]=useState(4)

  function FieldContact({ label, information }: { label: string, information: string }) {
    return (
      <View style={styles.fieldContact}>
        <Text numberOfLines={2} style={styles.lableContact}>{label}:</Text>
        <Text style={styles.informationContact}>{information}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <InfomationStaff />
        <InformationSummaryStaff />
      </View>
      <View style={styles.detailStaff}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.aboutContainer}>
            <Text style={styles.title}>About</Text>
            <View>
                <Text style={styles.about} numberOfLines={numberOfLinesAbout}>Tôi là một người chăm chỉ và đầy khát vọng với niềm đam mê lớn đối với ngành vận tải và chuỗi cung ứng. Tôi hiện đang học năm thứ hai chương trình Cử nhân Logistics và Quản lý chuỗi cung ứng tại Trường đại học ABC. Tôi có kỹ năng giao tiếp tốt, cho phép bản thân truyền đạt thông tin hiệu quả đến nhiều người. Trong ngắn hạn, tôi muốn chớp lấy cơ hội để nâng cao năng lực chuyên môn cũng như kinh nghiệm làm việc thực tế trong ngành thông qua vị trí công ty để có thể vững chắc hơn trong lộ trình ngành Logistics và Chuỗi cung ứng trong tương lai.</Text>
                <TouchableOpacity onPress={()=>setNumOfLinesAbout(prevNum=>prevNum === 4 ? 0 : 4)}>
                  <Text style={styles.readMore}>{numberOfLinesAbout===4 ? 'Read more' : 'Hide'}</Text>
                </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.title}>Contact Detail</Text>
            <FieldContact label='Name' information='Lê Hoàng Chiến'/>
            <FieldContact label='Address' information='105/45 đường số 59, phường 14, Gò Vấp'/>
            <FieldContact label='Phone' information='0368670025'/>
            <FieldContact label='Email' information='hoangchien11522@gmail.com'/>


          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default StaffDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    width: '100%',
    height: 250,
    backgroundColor: Color.primary200,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    justifyContent: "space-between"
  },
  detailStaff: {
    paddingHorizontal: 16,
    flex:1
  },
  aboutContainer: {

  },
  about: {
    color: Color.primary500,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: 'Klarna Text',
    lineHeight: 24,
    letterSpacing: 0.12
  },
  readMore:{
    color:Color.primary200,
    fontWeight:'600',
  },
  contactContainer: {
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 10
  },
  fieldContact: {
    flexDirection:'row',
    marginVertical: 15,
    flex:1
  },
  lableContact: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    width:80
  },
  informationContact: {
    fontSize: 16,
    color: Color.primary500,
    flex:1
  },
})