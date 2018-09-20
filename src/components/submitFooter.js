import React, { Component } from 'react';
import {
  Button,
  Footer,
  FooterTab,
  Text
} from 'native-base';
import { IN_PROGRESS } from '../constants/SubmittedTypes';

class SubmitFooter extends Component {
  renderSubmit() {
    switch (this.props.state) {
      case IN_PROGRESS:
        return (
          <Button
            dark
            full
          >
            <Text>Submitting...</Text>
          </Button>
        );
      default:
        return (
          <Button
            onPress={this.props.callback}
            full
          >
            <Text>Next</Text>
          </Button>
        );
    }
  }

  render() {
    return (
      <Footer>
       <FooterTab>
        {this.renderSubmit()}
       </FooterTab>
     </Footer>
    );
  }
}

export default SubmitFooter;
