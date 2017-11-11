/* @flow */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

import OpenTok from 'react-native-opentok'; // eslint-disable-line

const sessionId = '2_MX40NTk5MzA4Mn5-MTUwOTYzOTExMDY3Nn5pNXhERU1yWURmOXJkZzFKU0ZGaVpaVFR-fg';
const token = 'T1==cGFydG5lcl9pZD00NTk5MzA4MiZzaWc9MjIzODY3ODNhY2RkZDZmMDVhMGU3NzRlNDM0NTJjNzUzMDlmNTY5NjpzZXNzaW9uX2lkPTJfTVg0ME5UazVNekE0TW41LU1UVXdPVFl6T1RFeE1EWTNObjVwTlhoRVJVMXlXVVJtT1hKa1p6RktVMFpHYVZwYVZGUi1mZyZjcmVhdGVfdGltZT0xNTA5NjM5MjA2Jm5vbmNlPTAuNjQ2Mjg4NDQwNTgyODQzNyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTEyMjMxMjA1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

export default class App extends Component<{}> {
	/* $FlowFixMe we ignore the fact that componentWillMount shouldn't be async. Just for example purposes */
	async componentWillMount () {
		console.log('Hello')

		try {
			await OpenTok.connect(sessionId, token);
		} catch (e) {
			console.log(e)
		}
		OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
		OpenTok.on(OpenTok.events.ON_SESSION_DID_CONNECT, e => console.log(e));

	}


	state = { mode: '' };

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.title}> {this.state.title || 'Select'}</Text>
				{this.renderContent()}
				{/*<Text*/}
				{/*style={styles.welcome}*/}
				{/*onPress={async () => {*/}
				{/*const isSent = await OpenTok.sendSignal(sessionId, 'message', 'a');*/}
				{/*console.log(isSent);*/}
				{/*}}*/}
				{/*>*/}
				{/*Send signal*/}
				{/*</Text>*/}

			</View>
		);
	}

	renderContent () {
		switch (this.state.mode) {
			case 'publisher':
				return this.renderPublisher();
			case 'subscriber':
				return this.renderSubscriber();
			default:
				return this.renderMenu();
		}
	}

	renderMenu () {
		return <View>
			<Button title="Broadcast" onPress={() => this.setState({ mode: 'publisher', title: 'Broadcasting...' })}/>
			<Button title="Receive" onPress={() => this.setState({ mode: 'subscriber', title: 'Receiving...' })}/>
		</View>
	}

	renderSubscriber () {
		return (
			<OpenTok.SubscriberView
				style={{ minHeight: 300, width: '100%' }}
				sessionId={sessionId}
				onSubscribeStop={() => {
					console.log('stopped')
				}}
			/>
		);
	}

	renderPublisher () {
		return (
			<OpenTok.PublisherView
				style={{ minHeight: 300, width: '100%' }}
				sessionId={sessionId}
				onPublishStart={() => { console.log('started')}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#83c3ff',
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('example', () => App);
