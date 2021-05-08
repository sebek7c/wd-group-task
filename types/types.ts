export interface RoomsType {
	rooms: [SingleRoomType];
	user: UserType;
}

export interface UserType {
	email: String;
	firstName: String;
	id: string;
	lastName: String;
	profilePic: String;
	role: String;
}


export interface SingleRoomType {
    id: String
    name: String
    roomPic: String
}

export interface UsersRoomsDataType {
    usersRooms: RoomsType
}