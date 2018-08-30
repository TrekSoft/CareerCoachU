import React, { Component } from 'react';
import { Header, Left, Body, Right, Title, Button, Icon } from 'native-base';

export default class MainHeader extends Component {
  render() {
    return (
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>

          <Body>
            <Title>Back to static</Title>
          </Body>

          <Right />
        </Header>
    );
  }
}
