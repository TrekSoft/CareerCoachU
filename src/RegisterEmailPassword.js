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
    .catch((error) => firebase.crashlytics().recordError(REGISTER_USER, error));
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
          <View style={[styles.outerView, styles.errorContainer]}>
            <Text style={styles.errorText}>{props.error}</Text>
          </View>
        </Content>
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
    marginTop: 50
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
    submitted: state.register.submitted,
    error: state.register.error
  }
);

export default connect(mapStateToProps, actions)(RegisterPhotoName);
