import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Input,
  Item,
  Label,
  Text,
  Toast
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { REGISTER_USER } from './constants/ErrorCodes';
import { IN_PROGRESS } from './constants/SubmittedTypes';
import * as actions from './actions';

class RegisterPhotoName extends Component {
  static navigationOptions = {
      title: 'Email & Password'
  }

  onEmailChange(email) {
    this.props.userEmailChange(email);
  }

  onPasswordChange(password) {
    this.props.userPasswordChange(password);
  }

  onNext() {
    this.props.registerUser(this.props.user, this.props.password)
    .then(() => this.props.navigation.navigate('RegisterPhotoName'))
    .catch((error) => {
      Toast.show({
        text: error,
        buttonText: 'Okay',
        style: {
          backgroundColor: '#d32f2f'
        },
        duration: 5000
      });

      firebase.crashlytics().recordError(REGISTER_USER, error);
    });
  }

  renderSubmit() {
    switch (this.props.submitted) {
      case IN_PROGRESS:
        return (
          <Button
            dark
            full
          >
            <Text>Submitting...</Text>
          </Button>
        );
      default:
        return (
          <Button
            onPress={this.onNext.bind(this)}
            full
          >
            <Text>Next</Text>
          </Button>
        );
    }
  }

  render() {
    const props = this.props;

    return (
      <Container>
        <Content contentContainerStyle={styles.page}>
          <View style={[styles.outerView, styles.headerContainer]}>
            <Text style={styles.headerText}>
              Choose an email and password
            </Text>
          </View>
          <Item style={styles.item} floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={this.onEmailChange.bind(this)}
              value={props.email}
            />
          </Item>
          <Item style={styles.item} floatingLabel>
            <Label>Password</Label>
            <Input
              onChangeText={this.onPasswordChange.bind(this)}
              value={props.password}
              secureTextEntry
            />
          </Item>
        </Content>
        <Footer>
          <FooterTab>
            {this.renderSubmit()}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  errorContainer: {
    marginTop: 10
  },
  errorText: {
    color: '#d32f2f'
  },
  item: {
    marginTop: 15,
    marginBottom: 15
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 20
  },
  headerText: {
    fontSize: 35,
    color: '#616161',
    textAlign: 'center'
  },
  outerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  page: {
    flexGrow: 1,
    backgroundColor: '#ECEFF1',
    paddingHorizontal: '12%'
  }
};

const mapStateToProps = state => (
  {
    user: state.user,
    email: state.user.email,
    password: state.user.password,
    submitted: state.register.submitted
  }
);

export default connect(mapStateToProps, actions)(RegisterPhotoName);
