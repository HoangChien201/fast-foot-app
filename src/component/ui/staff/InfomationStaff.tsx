import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Color } from '../../../contanst/color'

const InfomationStaff = ({ item }: { item?: boolean }) => {
  return (
    <View style={styles.staffItem}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://s3.cloud.cmctelecom.vn/tinhte2/2020/09/5136156_IMG_20200902_023158.jpg' }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.informationContainer}>
          <Text style={[styles.name, { color: item ? '#000' : '#fff' }]}>Lê Hoàng Chiến</Text>
          <Text style={[styles.roles, { color: item ? Color.primary400 : '#fff' }]}>Bếp</Text>
        <Text style={[styles.address, { color: item ? Color.primary400 : '#fff' }]} numberOfLines={2}>105/45/14 đường số 59, phường 14, Gò Vấp</Text>
      </View>
    </View>
  )
}

export default InfomationStaff

const styles = StyleSheet.create({
  staffItem: {
    width: '100%',
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 10,
    height:80
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 80,
    overflow: 'hidden',
    marginEnd: 10
  },
  avatar: {
    width: '100%',
    height: '100%',

  },
  informationContainer: {
    width: '80%',
    height:'100%',
    justifyContent:"space-between"
  },
  name: {
    color: '#fff',
    fontFamily: 'Klarna Text',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  address: {
    color: '#fff',
    fontFamily: 'Klarna Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  roles: {
    color: '#fff',
    fontFamily: 'Klarna Text',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
  },
})