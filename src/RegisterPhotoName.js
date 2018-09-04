import React, { Component } from 'react';
import { Image, View, KeyboardAvoidingView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { StackActions, NavigationActions } from 'react-navigation';
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
import * as actions from './actions';

class RegisterPhotoName extends Component {
  static navigationOptions = {
      title: 'Photo & Name',
      headerLeft: null
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
        { text: 'Cancel', onPress: () => console.log('Back action cancelled'), style: 'cancel' },
        { text: 'OK', onPress: () => nav.dispatch(resetAction) },
      ]
    );

    return true;
  }

  pickPhoto() {
    ImagePicker.showImagePicker(null, (response) => {
      this.props.uploadImage(this.props.user, response.uri, 'test.jpg');
    });
  }

  render() {
    const user = this.props.user;

    return (
      <AndroidBackHandler onBackPress={this.onHardwareBackButton.bind(this)}>
        <Container>
          <KeyboardAvoidingView style={styles.pageStyle} behavior='position'>
            <View style={styles.outerViewStyle}>
              <View style={styles.profilePicContainer}>
                <Image
                  resizeMode={'cover'}
                  style={{ height: '100%', aspectRatio: 1 }}
                  source={{ uri: user.pictureURL }}
                />
              </View>
              <View style={styles.uploadButtonContainer}>
                <Button onPress={this.pickPhoto.bind(this)}>
                  <Text>Upload new</Text>
                </Button>
              </View>
            </View>
            <Item style={styles.itemStyle} stackedLabel>
              <Label>First name</Label>
              <Input
                style={styles.inputStyle}
                value={user.firstName}
              />
            </Item>
            <Item style={styles.itemStyle} stackedLabel>
              <Label>Last name</Label>
              <Input
                style={styles.inputStyle}
                value={user.lastName}
              />
            </Item>
          </KeyboardAvoidingView>
          <Footer>
           <FooterTab>
             <Button full>
               <Text>Next</Text>
             </Button>
           </FooterTab>
         </Footer>
        </Container>
      </AndroidBackHandler>
    );
  }
}

const styles = {
  itemStyle: {
    alignSelf: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  inputStyle: {
    backgroundColor: 'white',
    height: 60
  },
  outerViewStyle: {
    height: 150,
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECEFF1',
    alignItems: 'center'
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
