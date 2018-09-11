import React, { Component } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import {
  Button,
  Container,
  Footer,
  FooterTab,
  Input,
  Item,
  Label,
  Text
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { REGISTER_USER } from './constants/ErrorCodes';
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
    .catch((error) => firebase.crashlytics().reportError(REGISTER_USER, error));
  }

  render() {
    const props = this.props;

    return (
      <Container>
        <KeyboardAvoidingView style={styles.page} behavior='position'>
          <View style={[styles.outerView, styles.headerContainer]}>
            <Text style={styles.headerText}>
              Choose an email and password
            </Text>
          </View>
          <Item style={styles.item} stackedLabel>
            <Label>Email</Label>
            <Input
              style={styles.input}
              onChangeText={this.onEmailChange.bind(this)}
              value={props.email}
            />
          </Item>
          <Item style={styles.item} stackedLabel>
            <Label>Password</Label>
            <Input
              style={styles.input}
              onChangeText={this.onPasswordChange.bind(this)}
              value={props.password}
              secureTextEntry
            />
          </Item>
          <View style={[styles.outerView, styles.errorContainer]}>
            <Text style={styles.errorText}>{props.error}</Text>
          </View>
        </KeyboardAvoidingView>
        <Footer>
          <FooterTab>
            <Button
              onPress={this.onNext.bind(this)}
              full
            >
              <Text>Next</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  errorContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15
  },
  errorText: {
    color: '#d32f2f'
  },
  item: {
    alignSelf: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  input: {
    backgroundColor: 'white',
    height: 60
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 20
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECEFF1',
    alignItems: 'center'
  }
};

const mapStateToProps = state => (
  {
    user: state.user,
    email: state.user.email,
    password: state.user.password,
    submitted: state.register.submitted,
    error: state.register.error
  }
);

export default connect(mapStateToProps, actions)(RegisterPhotoName);
