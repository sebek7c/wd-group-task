import { gql } from '@apollo/client';

export const IS_TYPING_SUBSCRIPTION = gql`
	subscription typingUser($roomId: String!) {
		typingUser(roomId: $roomId) {
			firstName
		}
	}
`;
