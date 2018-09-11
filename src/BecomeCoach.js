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
        <Content contentContainerStyle={styles.page}>
            <Text style={styles.text}>
              We highly recommend signing up with your LinkedIn account.
              This will help build trust with clients and enable them
              to easily review your accomplishments and experience.
            </Text>

            <Button
              onPress={() => this.modal.open()}
              style={[styles.button, styles.linkedin]}
            >
              <Text>Sign up with LinkedIn</Text>
            </Button>

            <Button
              onPress={() => this.props.navigation.navigate('RegisterEmailPassword')}
              style={[styles.button, styles.skip]}
            >
              <Text>Skip</Text>
            </Button>

            <LinkedInModal
              ref={ref => {
                this.modal = ref;
              }}
              clientID={'779uhpqrcjnupa'}
              clientSecret={'i3QWrGTUGwqOzzUS'}
              redirectUri={'http://www.getacareercoach.com'}
              linkText=''
              onSuccess={
                data =>
                this.props.getLinkedInData(data.access_token)
                .then(() => this.props.navigation.navigate('RegisterEmailPassword'))
              }
            />
        </Content>
      </Container>
    );
  }
}

const styles = {
  text: {
    marginBottom: 25,
    paddingHorizontal: 2
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '12%'
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
    height: 75
  },
  linkedin: {
    backgroundColor: '#0077B5'
  },
  skip: {
    backgroundColor: '#999'
  }
};

export default connect(null, actions)(BecomeCoach);
