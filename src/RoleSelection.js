import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
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
          style={styles.buttonStyle}
          key={role.id}
        >
          <Text>{role.actionText}</Text>
        </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.pageStyle}>
            <Text style={styles.textStyle}>I want to</Text>
            {this.renderButtons()}
        </Content>
      </Container>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 60,
    color: '#616161',
    marginBottom: 40,
    marginTop: -50
  },
  pageStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '12%'
  },
  buttonStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
    height: 75
  }
};

const mapStateToProps = state => (
  {
    roles: state.roles,
    selectedRoleId: state.selectedRoleId
  }
);

export default connect(mapStateToProps, actions)(RoleSelection);
