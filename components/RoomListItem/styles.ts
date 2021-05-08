import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor:'#5603AD',
        padding: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,

    },

    text: {
        color: 'white',
        marginLeft: 8,
    },

    userImage: {
        width: '64px',
        height: '64px'
    },

    roomDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default styles