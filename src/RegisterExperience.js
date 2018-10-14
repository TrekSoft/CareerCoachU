import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Label,
  Text
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import * as styles from './styles';
import { showErrorToast } from './utils/ErrorToast';
import SubmitFooter from './components/SubmitFooter';
import { UPDATE_USER } from './constants/ErrorCodes';
import { INDUSTRIES } from './constants/Industries';
import { IN_PROGRESS, NOT_SUBMITTED } from './constants/SubmittedTypes';
import * as actions from './actions';

class RegisterExperience extends Component {
  static navigationOptions = {
      title: 'Industry Experience'
  }

  state = {
    title: '',
    industry: '',
    profileURL: '',
    submitted: NOT_SUBMITTED,
    modalVisible: false
  };

  componentDidMount() {
    this.setState({
      title: this.props.user.title,
      industry: this.props.user.industry,
      profileURL: this.props.user.profileURL
    });
  }

  onTitleChange = (title) => {
    this.setState({ title });
  }

  onProfileURLChange = (profileURL) => {
    this.setState({ profileURL });
  }

  onSelect = (picked) => {
    this.setState({
      industry: picked,
      modalVisible: false
    });
  }

  onCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  onShowModal = () => {
    this.setState({ modalVisible: true });
  }

  onNext = () => {
    this.setState({ submitted: IN_PROGRESS });

    const state = this.state;

    if (!state.title) {
      showErrorToast('Title cannot be blank');
      this.setState({ submitted: NOT_SUBMITTED });
    } else {
      const fields = {
        title: state.title,
        profileURL: state.profileURL
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

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.page}>
          <View style={[styles.outerView, styles.headerContainer]}>
            <Text style={styles.header3}>
              Tell us about your experience
            </Text>
          </View>
          <Item style={styles.item} floatingLabel>
            <Label>Title</Label>
            <Input
              onChangeText={this.onTitleChange}
              value={this.state.title}
            />
          </Item>
          <Item style={styles.itemPadded} stackedLabel>
            <Label>Industry</Label>
            <Button
              onPress={this.onShowModal}
              block
              iconRight
              transparent
              primary
            >
              <Text>{this.state.industry}</Text>
              <Icon name='arrow-dropdown' />
            </Button>
          </Item>
          <Item style={styles.item} floatingLabel>
            <Label>URL to your LinkedIn Profile</Label>
            <Input
              onChangeText={this.onProfileURLChange}
              value={this.state.profileURL}
            />
          </Item>
          <ModalFilterPicker
            visible={this.state.modalVisible}
            onSelect={this.onSelect}
            onCancel={this.onCancel}
            options={INDUSTRIES}
          />
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

export default connect(mapStateToProps, actions)(RegisterExperience);
