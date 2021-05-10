import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
	query room($id: ID!) {
		room(id: $id) {
            id
			messages {
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
	}
`;
