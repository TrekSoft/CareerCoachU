import React, { Component } from 'react';
import { View, Slider } from 'react-native';
import {
  Body,
  Button,
  CheckBox,
  Container,
  Content,
  Input,
  ListItem,
  Text
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import RNGooglePlaces from 'react-native-google-places';
import * as styles from './styles';
import { showErrorToast } from './utils/ErrorToast';
import SubmitFooter from './components/SubmitFooter';
import { UPDATE_USER, FIND_LOCATION } from './constants/ErrorCodes';
import { IN_PROGRESS, NOT_SUBMITTED } from './constants/SubmittedTypes';
import * as actions from './actions';

class RegisterPriceLocation extends Component {
  static navigationOptions = {
      title: 'Rate & Location'
  }

  state = {
    address: '',
    longitude: '',
    latitude: '',
    range: 0,
    rate: 0,
    online: false,
    inPerson: false,
    submitted: NOT_SUBMITTED
  };

  componentDidMount() {
    this.setState({
      address: this.props.user.address,
      longitude: this.props.user.longitude,
      latitude: this.props.user.latitude,
      range: this.props.user.range,
      rate: this.props.user.rate,
      online: this.props.user.online,
      inPerson: this.props.user.inPerson
    });
  }

  onRateChange = (rate) => {
    this.setState({ rate });
  }

  onRangeChange = (range) => {
    this.setState({ range });
  }

  onNext = () => {
    const state = this.state;

    if (state.inPerson && !state.address) {
      showErrorToast('Address cannot be empty if "In Person" is selected as a location');
    } else {
      this.setState({ submitted: IN_PROGRESS });

      const fields = {
        rate: state.rate,
        range: state.range,
        address: state.address,
        longitude: state.longitude,
        latitude: state.latitude,
        inPerson: state.inPerson,
        online: state.online
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

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
      this.setState({
        address: place.address,
        longitude: place.longitude,
        latitude: place.latitude
      });
    })
    .catch(error => {
      if (error.message !== 'Search cancelled') {
        showErrorToast(error.message);
        firebase.crashlytics().recordError(FIND_LOCATION, error.message);
      }
    });
  }

  toggleInPerson = () => {
    this.setState({ inPerson: !this.state.inPerson });
  }

  toggleOnline = () => {
    this.setState({ online: !this.state.online });
  }

  renderLocation = () => {
    if (this.state.inPerson) {
      return (
        <View>
          <Text
            style={styles.labelTop}
          >
            Address (private - used to determine if a client is in your range)
          </Text>
          <Button full light onPress={this.openSearchModal}>
            <Text>
              {this.state.address}
            </Text>
          </Button>

          <Text
            style={styles.label}
          >
            How far are you willing to drive to meet a client?
          </Text>
          <View style={styles.itemSlider}>
            <Input
              style={styles.sliderNumber}
              value={`${String(this.state.range)} miles`}
              disabled
            />
            <Slider
              value={this.state.range}
              onValueChange={this.onRangeChange}
              style={{ flexGrow: 1 }}
              minimumValue={0}
              maximumValue={30}
              step={5}
            />
          </View>
        </View>
      );
    }
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
            style={styles.labelMid}
          >
            How much would you like to charge ($/hr)?
          </Text>
          <View style={styles.itemSlider}>
            <Input
              style={styles.sliderNumber}
              value={`$${String(this.state.rate)}/hr`}
              disabled
            />
            <Slider
              value={this.state.rate}
              onValueChange={this.onRateChange}
              style={{ flexGrow: 1 }}
              minimumValue={0}
              maximumValue={250}
              step={5}
            />
          </View>

          <Text
            style={styles.labelMid}
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
              <Text>In Person (client preferred)</Text>
            </Body>
          </ListItem>
          {this.renderLocation()}
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
