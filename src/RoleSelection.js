import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import * as styles from './styles';
import * as actions from './actions';

class RoleSelection extends Component {
  static navigationOptions = {
      header: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
    });
  }

  chooseRole(role) {
    this.props.selectRole(role.id);
    this.props.navigation.navigate(role.page);
  }

  renderButtons() {
    return this.props.roles.map(
      role =>
        <Button
          onPress={() => this.chooseRole(role)}
          style={styles.buttonMain}
          key={role.id}
        >
          <Text>{role.actionText}</Text>
        </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={[styles.page, styles.verticalCenter]}>
            <Text style={styles.header}>I want to</Text>
            {this.renderButtons()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => (
  {
    roles: state.roles,
    selectedRoleId: state.selectedRoleId
  }
);

export default connect(mapStateToProps, actions)(RoleSelection);
