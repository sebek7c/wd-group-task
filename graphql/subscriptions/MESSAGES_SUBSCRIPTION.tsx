import { gql } from '@apollo/client';

export const MESSAGES_SUBSCRIPTION = gql`
	subscription messageAdded($roomId: String!) {
		messageAdded(roomId: $roomId) {
			body
			id
			insertedAt
			user {
				email
				firstName
				id
				lastName
				profilePic
				role
			}
		}
	}
`;
