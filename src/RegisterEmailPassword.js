import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Content,
  Input,
  Item,
  Label,
  Text
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import * as styles from './styles';
import { showErrorToast } from './utils/ErrorToast';
import SubmitFooter from './components/SubmitFooter';
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

  onEmailChange = (email) => {
    this.setState({ email });
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onNext = () => {
    this.setState({ submitted: IN_PROGRESS });

    this.props.registerUser(this.props.user, this.state.email, this.state.password)
    .then(() => {
      this.setState({ submitted: NOT_SUBMITTED });
      this.props.navigation.navigate('RegisterPhotoName');
    })
    .catch((error) => {
      this.setState({ submitted: NOT_SUBMITTED });
      showErrorToast(error);

      firebase.crashlytics().recordError(REGISTER_USER, error);
    });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.page}>
          <View style={[styles.outerView, styles.headerContainer]}>
            <Text style={styles.header3}>
              Choose an email and password
            </Text>
          </View>
          <Item style={styles.item} floatingLabel>
            <Label>Email</Label>
            <Input
              keyboardType='email-address'
              onChangeText={this.onEmailChange}
              value={this.state.email}
            />
          </Item>
          <Item style={styles.item} floatingLabel>
            <Label>Password</Label>
            <Input
              onChangeText={this.onPasswordChange}
              value={this.state.password}
              secureTextEntry
            />
          </Item>
        </Content>
        <SubmitFooter
          state={this.state.submitted}
          callback={this.onNext}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user
  }
);

export default connect(mapStateToProps, actions)(RegisterPhotoName);
