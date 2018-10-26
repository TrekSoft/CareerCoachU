import React, { Component } from 'react';
import { View, Slider } from 'react-native';
import {
  Body,
  CheckBox,
  Container,
  Content,
  Input,
  ListItem,
  Text
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import * as styles from './styles';
import { showErrorToast } from './utils/ErrorToast';
import SubmitFooter from './components/SubmitFooter';
import { UPDATE_USER } from './constants/ErrorCodes';
import { IN_PROGRESS, NOT_SUBMITTED } from './constants/SubmittedTypes';
import * as actions from './actions';

class RegisterPriceLocation extends Component {
  static navigationOptions = {
      title: 'Rate & Location'
  }

  state = {
    rate: 1,
    online: false,
    inPerson: false,
    submitted: NOT_SUBMITTED
  };

  componentDidMount() {
    this.setState({
      rate: this.props.user.rate,
      online: this.props.user.online,
      inPerson: this.props.user.inPerson
    });
  }

  onRateChange = (rate) => {
    this.setState({ rate });
  }

  onNext = () => {
    this.setState({ submitted: IN_PROGRESS });

    const state = this.state;

    const fields = {
      rate: state.rate
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

  toggleInPerson = () => {
    this.setState({ inPerson: !this.state.inPerson });
  }

  toggleOnline = () => {
    this.setState({ online: !this.state.online });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.page}>
          <View style={[styles.outerView, styles.headerContainer]}>
            <Text style={styles.header3}>
              Choose a rate & coaching location
            </Text>
          </View>

          <Text
            style={{ marginBottom: 15, alignSelf: 'flex-start' }}
          >
            How much would you like to charge ($/hr)?
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Input
              style={{ flex: 0, width: 75, backgroundColor: '#fff' }}
              value={`$${String(this.state.rate)}/hr`}
              disabled
              keyboardType='numeric'
            />
            <Slider
              value={this.state.rate}
              onValueChange={this.onRateChange}
              style={{ flexGrow: 1 }}
              minimumValue={20}
              maximumValue={250}
              step={5}
            />
          </View>

          <Text
            style={{ marginTop: 20, marginBottom: 15, alignSelf: 'flex-start' }}
          >
            Where are you willing to coach?
          </Text>
          <ListItem
            style={styles.itemList}
            onPress={this.toggleOnline}
          >
            <CheckBox checked={this.state.online} />
            <Body>
              <Text>Online</Text>
            </Body>
          </ListItem>
          <ListItem
            style={styles.itemList}
            onPress={this.toggleInPerson}
          >
            <CheckBox checked={this.state.inPerson} />
            <Body>
              <Text>In Person (often preferred)</Text>
            </Body>
          </ListItem>
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

export default connect(mapStateToProps, actions)(RegisterPriceLocation);
