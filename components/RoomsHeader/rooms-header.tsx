import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

function RoomsHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.roomsTitle}>Rooms</Text>
        </View>
    )
}

export default RoomsHeader