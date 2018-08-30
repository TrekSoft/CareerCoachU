import React, { Component } from 'react';
import { Container, Content, Item, Input, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import * as actions from './actions';
import {
  IN_PROGRESS,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR
} from './constants/SubmittedTypes';

class FindCoach extends Component {
  static navigationOptions = {
    title: 'Find a Coach',
  };

  onEmailChange(text) {
    this.props.comingSoonEmailChange(text);
  }

  onEmailSubmit() {
    this.props.comingSoonEmailSubmit(this.props.email);
  }

  renderSubmit() {
    switch (this.props.submitted) {
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
                value={this.props.email}
              />
            </Item>

            {this.renderSubmit()}

            {
              this.props.submitted === SUBMIT_ERROR &&
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemStyle: {
    alignSelf: 'center',
    marginTop: 15,
    width: '85%'
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
    width: '85%',
    height: 60
  }
};

const mapStateToProps = state => ({
    email: state.comingSoon.email,
    submitted: state.comingSoon.submitted
});

export default connect(mapStateToProps, actions)(FindCoach);
