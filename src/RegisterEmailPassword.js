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
import { IN_PROGRESS, NOT_SUBMITTED } from './constants/SubmittedTypes';
import * as actions from './actions';

class RegisterPhotoName extends Component {
  static navigationOptions = {
      title: 'Email & Password'
  }

  state = {
    email: '',
    password: '',
    submitted: NOT_SUBMITTED
  };

  componentDidMount() {
    this.setState({ email: this.props.user.email });
  }

  onEmailChange(email) {
    this.setState({ email });
  }

  onPasswordChange(password) {
    this.setState({ password });
  }

  onNext() {
    this.setState({ submitted: IN_PROGRESS });

    this.props.registerUser(this.props.user, this.state.email, this.state.password)
    .then(() => {
      this.setState({ submitted: NOT_SUBMITTED });
      this.props.navigation.navigate('RegisterPhotoName');
    })
    .catch((error) => {
      this.setState({ submitted: NOT_SUBMITTED });
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
    switch (this.state.submitted) {
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
              keyboardType='email-address'
              onChangeText={this.onEmailChange.bind(this)}
              value={this.state.email}
            />
          </Item>
          <Item style={styles.item} floatingLabel>
            <Label>Password</Label>
            <Input
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.state.password}
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
    user: state.user
  }
);

export default connect(mapStateToProps, actions)(RegisterPhotoName);
