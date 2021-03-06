import React from 'react';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import Rooms from './screens/rooms';
import Chat from './screens/chat';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoomsHeader from './components/RoomsHeader/rooms-header';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix-socket';

const AuthStack = createStackNavigator();

const httpLink = createHttpLink({
	uri: 'https://chat.thewidlarzgroup.com/api/graphql',
});

const token =
	'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjI0OTY4NDcsImlhdCI6MTYyMDA3NzY0NywiaXNzIjoiY2hhdGx5IiwianRpIjoiZjEyYjFiNDYtZTFiNi00YmNlLWFkYzEtYjhmNDY3ZTQ5NGZjIiwibmJmIjoxNjIwMDc3NjQ2LCJzdWIiOiI1MWQ4MGVhYi01MzRmLTQ3OGQtOTY0YS1lZjY4ZmQ1NmE1NzAiLCJ0eXAiOiJhY2Nlc3MifQ.vhASxWwxr0HELY_i3Z2WTASSXjraXbChmRlF8bdsHp-JAg9vwZ4T9MVGFkqsVZSaptRyrKEC4XS_rKCCXJPoIA';

const phoenixSocket = new PhoenixSocket('wss://chat.thewidlarzgroup.com/socket', {
	params: { token }
});
const absintheSocket = AbsintheSocket.create(phoenixSocket);
const wsLink = createAbsintheSocketLink(absintheSocket);

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: `Bearer ${token}`,
		},
	};
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	authLink.concat(httpLink)
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export default function App() {

	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				<AuthStack.Navigator>
					<AuthStack.Screen
						name='Rooms'
						component={Rooms}
						options={{
							title: 'Rooms',
							headerStyle: {
								backgroundColor: '#B6DEFD',
							},
						}}
					/>
					<AuthStack.Screen
						name='Chat'
						component={Chat}
						options={{ title: 'Chat', headerBackTitleVisible: false, headerStyle: { backgroundColor: '#B6DEFD'} }}
					/>
				</AuthStack.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	);
}
