import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import LinkedInModal from 'react-native-linkedin';
import * as actions from './actions';

class BecomeCoach extends Component {
  static navigationOptions = {
      title: 'Become a Coach'
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.pageStyle}>
            <LinkedInModal
              ref={ref => {
                this.modal = ref;
              }}
              clientID={'779uhpqrcjnupa'}
              clientSecret={'i3QWrGTUGwqOzzUS'}
              redirectUri={'http://www.getacareercoach.com'}
              onSuccess={
                data =>
                this.props.getLinkedInData(data.access_token)
                .then(() => this.props.navigation.navigate('RegisterEmailPassword'))
              }
            />
            <Button
              onPress={() => this.modal.open()}
              style={styles.buttonStyle}
            >
              <Text>Connect LinkedIn profile</Text>
            </Button>
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '75%',
    height: 75
  }
};

export default connect(null, actions)(BecomeCoach);
