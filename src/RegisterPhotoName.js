import React, { Component } from 'react';
import { Image, View, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { StackActions, NavigationActions } from 'react-navigation';
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

  onFirstNameChange(firstName) {
    this.setState({ firstName });
  }

  onLastNameChange(lastName) {
    this.setState({ lastName });
  }

  onPhoneChange(phone) {
    this.setState({ phone });
  }

  onHardwareBackButton() {
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

  onNext() {
    this.setState({ submitted: IN_PROGRESS });

    const state = this.state;
    const fields = {
      firstName: state.firstName,
      lastName: state.lastName,
      phone: state.phone
    };

    this.props.updateUser(this.props.user.id, fields)
    .then(() => {
      this.setState({ submitted: NOT_SUBMITTED });
      console.log(this.props.user);
      this.props.navigation.navigate('RoleSelection');
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

      firebase.crashlytics().recordError(UPDATE_USER, error);
    });
  }

  pickPhoto() {
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
          Toast.show({
            text: error,
            buttonText: 'Okay',
            style: {
              backgroundColor: '#d32f2f'
            },
            duration: 5000
          });
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
          <Button onPress={this.pickPhoto.bind(this)}>
            <Text>Upload new</Text>
          </Button>
        );
    }
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
    const state = this.state;

    return (
      <AndroidBackHandler onBackPress={this.onHardwareBackButton.bind(this)}>
        <Container>
          <Content contentContainerStyle={styles.page}>
            <View style={styles.outerView}>
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
                onChangeText={this.onFirstNameChange.bind(this)}
                value={state.firstName}
              />
            </Item>
            <Item style={styles.item} floatingLabel>
              <Label>Last name</Label>
              <Input
                onChangeText={this.onLastNameChange.bind(this)}
                value={state.lastName}
              />
            </Item>
            <Item style={styles.item} floatingLabel>
              <Label>Phone number (optional)</Label>
              <Input
                keyboardType='phone-pad'
                onChangeText={this.onPhoneChange.bind(this)}
                value={state.phone}
              />
            </Item>
          </Content>
          <Footer>
           <FooterTab>
             {this.renderSubmit()}
           </FooterTab>
         </Footer>
        </Container>
      </AndroidBackHandler>
    );
  }
}

const styles = {
  item: {
    alignSelf: 'center',
    marginTop: 15,
  },
  outerView: {
    height: 150,
    marginTop: 50,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  page: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#ECEFF1',
    alignItems: 'center',
    paddingHorizontal: '12%'
  },
  profilePicContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  uploadButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = state => (
  {
    user: state.user
  }
);

export default connect(mapStateToProps, actions)(RegisterPhotoName);
