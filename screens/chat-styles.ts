import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},

	messagesContainer: {
		height: '100%',
		width: '100%',
		backgroundColor: '#F0F8FF',
	},
	textInputContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: '#B6DEFD',
		padding: 16,
	},
});

export default styles;
