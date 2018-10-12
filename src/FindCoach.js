import React, { Component } from 'react';
import { Container, Content, Item, Input, Label, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';
import * as styles from './styles';
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
            style={styles.buttonSubmit}
          >
            <Text>You&apos;re all signed up</Text>
          </Button>
        );
      case IN_PROGRESS:
        return (
          <Button
            light
            style={styles.buttonSubmit}
            disabled
          >
            <Text>Signing you up...</Text>
          </Button>
        );
      default:
        return (
          <Button
            style={styles.buttonSubmit}
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
        <Content contentContainerStyle={[styles.page, styles.verticalCenter]}>
            <Text style={styles.header2}>Coming Soon</Text>
            <Text>Would you like to be notified</Text>
            <Text>when this is ready?</Text>
            <Item style={styles.itemTop} floatingLabel>
              <Label>Email address</Label>
              <Input
                onChangeText={this.onEmailChange.bind(this)}
                value={this.state.email}
              />
            </Item>

            {this.renderSubmit()}

            {
              this.state.submitted === SUBMIT_ERROR &&
              <Text style={styles.errorText}>
                Sorry, something went wrong. Do you have internet?
              </Text>
            }
        </Content>
      </Container>
    );
  }
}

export default FindCoach;
