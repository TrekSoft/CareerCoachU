import React, { Component } from 'react';
import { Container, Content, Item, Input } from 'native-base';
import { connect } from 'react-redux';
import * as actions from './actions';

class EditCoachProfile extends Component {
  static navigationOptions = {
      title: 'Coach Details'
  }

  render() {
    const user = this.props.user;

    return (
      <Container>
        <Content contentContainerStyle={styles.pageStyle}>
          <Item style={styles.itemStyle} regular>
            <Input
              style={styles.inputStyle}
              placeholder='Email address'
              value={user.email}
            />
          </Item>
          <Item style={styles.itemStyle} regular>
            <Input
              style={styles.inputStyle}
              placeholder='First name'
              value={user.firstName}
            />
          </Item>
          <Item style={styles.itemStyle} regular>
            <Input
              style={styles.inputStyle}
              placeholder='Last name'
              value={user.lastName}
            />
          </Item>
          <Item style={styles.itemStyle} regular>
            <Input
              style={styles.inputStyle}
              placeholder='Current title'
              value={user.title}
            />
          </Item>
          <Item style={styles.itemStyle} regular>
            <Input
              style={styles.inputStyle}
              placeholder='Industry'
              value={user.industry}
            />
          </Item>
          <Item style={styles.itemStyle} regular>
            <Input
              style={styles.inputStyle}
              placeholder='Bio'
              value={user.bio}
            />
          </Item>
          <Item style={styles.itemStyle} regular>
            <Input
              style={styles.inputStyle}
              placeholder='LinkedIn profile URL'
              value={user.profileURL}
            />
          </Item>
        </Content>
      </Container>
    );
  }
}

const styles = {
  itemStyle: {
    alignSelf: 'center',
    marginTop: 15,
    width: '85%'
  },
  inputStyle: {
    backgroundColor: 'white',
    height: 60
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

const mapStateToProps = state => (
  {
    user: state.user
  }
);

export default connect(mapStateToProps, actions)(EditCoachProfile);
