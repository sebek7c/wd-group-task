import { gql } from '@apollo/client';

export const GET_ROOM = gql`
    query room($id: ID! ) {
		room(id: $id ) {
			id
			name
			roomPic
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
