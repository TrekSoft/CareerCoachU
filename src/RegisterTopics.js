import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Body,
  CheckBox,
  Container,
  Content,
  ListItem,
  Text
} from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import * as styles from './styles';
import { showErrorToast } from './utils/ErrorToast';
import SubmitFooter from './components/SubmitFooter';
import { UPDATE_USER } from './constants/ErrorCodes';
import { TOPICS } from './constants/Topics';
import { IN_PROGRESS, NOT_SUBMITTED } from './constants/SubmittedTypes';
import * as actions from './actions';

class RegisterTopics extends Component {
  static navigationOptions = {
      title: 'Topics to Coach'
  }

  state = {
    allTopics: [],
    submitted: NOT_SUBMITTED
  };

  componentDidMount() {
    const allTopics = [];

    Object.keys(TOPICS).forEach((id) => {
      allTopics[id] = { id, name: TOPICS[id].name, selected: false };
    });

    this.setState({
      allTopics
    });
  }

  onSelect = (topic) => {
    const id = topic.id;
    const allTopics = this.state.allTopics;
    console.log(topic);
    allTopics[id].selected = !allTopics[id].selected;

    this.setState({
      allTopics
    });
  }

  onNext = () => {
    this.setState({ submitted: IN_PROGRESS });

    const selectedTopicIDs = this.state.allTopics
      .filter(topic => topic.selected)
      .map((topic) => topic.id);

    if (!selectedTopicIDs.length) {
      showErrorToast('Must select at least one topic');
      this.setState({ submitted: NOT_SUBMITTED });
    } else {
      const fields = {
        topics: selectedTopicIDs
      };

      this.props.updateUser(this.props.user.id, fields)
      .then(() => {
        this.setState({ submitted: NOT_SUBMITTED });
        this.props.navigation.navigate('RegisterPriceLocation');
      })
      .catch((error) => {
        this.setState({ submitted: NOT_SUBMITTED });
        showErrorToast(error);
        firebase.crashlytics().recordError(UPDATE_USER, error);
      });
    }
  }

  renderTopics() {
    return this.state.allTopics.map((topic) => {
      return (
        <ListItem
          style={styles.itemList}
          key={topic.id}
          onPress={() => this.onSelect(topic)}
        >
          <CheckBox checked={topic.selected} />
          <Body>
            <Text>{topic.name}</Text>
          </Body>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.pagePadding}>
          <View style={[styles.outerView, styles.headerContainer]}>
            <Text style={styles.header3}>
              What topics would you like to coach?
            </Text>
          </View>
          { this.renderTopics() }
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

export default connect(mapStateToProps, actions)(RegisterTopics);
