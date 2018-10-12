import React, { Component } from 'react';
import { Image, View, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  Button,
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
import SubmitFooter from './components/SubmitFooter';
import { showErrorToast } from './utils/ErrorToast';
import { IMAGE_PICKER, UPDATE_USER } from './constants/ErrorCodes';
import * as actions from './actions';
import { IN_PROGRESS, NOT_SUBMITTED } from './constants/SubmittedTypes';

class RegisterPhotoName extends Component {
  static navigationOptions = {
      title: 'Photo & Name',
      headerLeft: null
  }

  state = {
    photoUpload: NOT_SUBMITTED,
    submitted: NOT_SUBMITTED,
    firstName: '',
    lastName: '',
    phone: ''
  };

  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      phone: this.props.user.phone
    });
  }

  onFirstNameChange = (firstName) => {
    this.setState({ firstName });
  }

  onLastNameChange = (lastName) => {
    this.setState({ lastName });
  }

  onPhoneChange = (phone) => {
    this.setState({ phone });
  }

  onHardwareBackButton = () => {
    const nav = this.props.navigation;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'RoleSelection' })],
    });

    Alert.alert(
      'Cancel signup?',
      'Are you sure you want to cancel signup and return to the main page?',
      [
        { text: 'Cancel', onPress: null, style: 'cancel' },
        { text: 'OK', onPress: () => nav.dispatch(resetAction) },
      ]
    );

    return true;
  }

  onNext = () => {
    this.setState({ submitted: IN_PROGRESS });

    const state = this.state;

    if (!state.firstName || !state.lastName) {
      showErrorToast('First and last name cannot be empty');
      this.setState({ submitted: NOT_SUBMITTED });
    } else {
      const fields = {
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone
      };

      this.props.updateUser(this.props.user.id, fields)
      .then(() => {
        this.setState({ submitted: NOT_SUBMITTED });
        this.props.navigation.navigate('RoleSelection');
      })
      .catch((error) => {
        this.setState({ submitted: NOT_SUBMITTED });
        showErrorToast(error);
        firebase.crashlytics().recordError(UPDATE_USER, error);
      });
    }
  }

  pickPhoto = () => {
    ImagePicker.showImagePicker(null, (response) => {
      if (response.didCancel) {
        // Do nothing
      } else if (response.error) {
        firebase.crashlytics().recordError(IMAGE_PICKER, response.error);
      } else {
        const userId = this.props.user.id;
        this.setState({ photoUpload: IN_PROGRESS });
        this.props.uploadProfilePic(userId, response.uri)
        .then(() => this.setState({ photoUpload: NOT_SUBMITTED }))
        .catch((error) => {
          this.setState({ photoUpload: NOT_SUBMITTED });
          showErrorToast(error);
        });
      }
    });
  }

  renderPhotoUpload() {
    switch (this.state.photoUpload) {
      case IN_PROGRESS:
        return (
          <Button dark>
            <Text>Uploading...</Text>
          </Button>
        );
      default:
        return (
          <Button onPress={this.pickPhoto}>
            <Text>Upload new</Text>
          </Button>
        );
    }
  }

  render() {
    const state = this.state;

    return (
      <AndroidBackHandler onBackPress={this.onHardwareBackButton}>
        <Container>
          <Content contentContainerStyle={styles.page}>
            <View style={styles.editProfilePic}>
              <View style={styles.profilePicContainer}>
                <Image
                  resizeMode={'cover'}
                  style={{ height: '100%', aspectRatio: 1 }}
                  source={{ uri: this.props.user.pictureURL }}
                />
              </View>
              <View style={styles.uploadButtonContainer}>
                {this.renderPhotoUpload()}
              </View>
            </View>
            <Item style={styles.item} floatingLabel>
              <Label>First name</Label>
              <Input
                onChangeText={this.onFirstNameChange}
                value={state.firstName}
              />
            </Item>
            <Item style={styles.item} floatingLabel>
              <Label>Last name</Label>
              <Input
                onChangeText={this.onLastNameChange}
                value={state.lastName}
              />
            </Item>
            <Item style={styles.item} floatingLabel>
              <Label>Phone number (optional)</Label>
              <Input
                keyboardType='phone-pad'
                onChangeText={this.onPhoneChange}
                value={state.phone}
              />
            </Item>
          </Content>
          <SubmitFooter
            state={this.state.submitted}
            callback={this.onNext}
          />
        </Container>
      </AndroidBackHandler>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user
  }
);

export default connect(mapStateToProps, actions)(RegisterPhotoName);
