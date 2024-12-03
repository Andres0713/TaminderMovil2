import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ActionBar from './ActionBar'
import AddBirthday from './AddBirthday'

export default function ListBirthday() {
  const [showList, setShowList] = useState(true)


  return (
    <View style={styles.container}>
      {
        showList ? (
          <>
            <Text>LISTA</Text>
            <Text>LISTA</Text>
            <Text>LISTA</Text>
            <Text>LISTA</Text>
            <Text>LISTA</Text>
          </>
        ):(
          <AddBirthday></AddBirthday>
        )
      }
      <ActionBar showList={showList} setShowList={setShowList}></ActionBar>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        height: '100%'
    }
})