import React, { Component } from 'react';
import { Container, Content, Item, Input, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';
import {
  NOT_SUBMITTED,
  IN_PROGRESS,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR
} from './constants/SubmittedTypes';

class FindCoach extends Component {
  static navigationOptions = {
    title: 'Find a Coach',
  };

  state = {
    email: '',
    submitted: NOT_SUBMITTED
  }

  onEmailChange(email) {
    this.setState({ email });
  }

  onEmailSubmit() {
    this.setState({ submitted: IN_PROGRESS });

    firebase.firestore().collection('comingSoonEmails').add({ email: this.state.email })
    .then(() => this.setState({ submitted: SUBMIT_SUCCESS }))
    .catch(() => this.setState({ submitted: SUBMIT_ERROR }));
  }

  renderSubmit() {
    switch (this.state.submitted) {
      case SUBMIT_SUCCESS:
        return (
          <Button
            success
            style={styles.buttonStyle}
          >
            <Text>You&apos;re all signed up</Text>
          </Button>
        );
      case IN_PROGRESS:
        return (
          <Button
            light
            style={styles.buttonStyle}
            disabled
          >
            <Text>Signing you up...</Text>
          </Button>
        );
      default:
        return (
          <Button
            style={styles.buttonStyle}
            onPress={this.onEmailSubmit.bind(this)}
          >
            <Text>Sure, let me know!</Text>
          </Button>
        );
    }
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.pageStyle}>
            <Text style={styles.textStyle}>Coming Soon</Text>
            <Text>Would you like to be notified</Text>
            <Text>when this is ready?</Text>
            <Item style={styles.itemStyle} regular>
              <Input
                style={styles.inputStyle}
                placeholder='Email address'
                onChangeText={this.onEmailChange.bind(this)}
                value={this.state.email}
              />
            </Item>

            {this.renderSubmit()}

            {
              this.state.submitted === SUBMIT_ERROR &&
              <Text style={styles.errorTextStyle}>
                Sorry, something went wrong. Do you have internet?
              </Text>
            }
        </Content>
      </Container>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 50,
    color: '#616161',
    marginBottom: 20,
    marginTop: -100
  },
  errorTextStyle: {
    color: 'red'
  },
  pageStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '12%'
  },
  itemStyle: {
    alignSelf: 'center',
    marginTop: 15
  },
  inputStyle: {
    backgroundColor: 'white',
    height: 60
  },
  buttonStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    height: 60
  }
};

export default FindCoach;
