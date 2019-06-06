import React from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Block, Button, Text, theme, Input } from "galio-framework";

import {
  ActionCreators as UserActionCreator,
  Selectors as UserSelectors
} from "../redux/userRedux";

const { height, width } = Dimensions.get("screen");

import materialTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
  state = {
    username: "",
    password: ""
  };

  static getDerivedStateFromProps({ login, navigation }) {
    if (login.data) {
      navigation.navigate("Home");
    }
    return null;
  }

  _handlePasswordChange = password => {
    this.setState({
      password
    });
  };
  _handleUsernameChange = username => {
    this.setState({
      username
    });
  };
  _handleSubmit = () => {
    const { username, password } = this.state;
    const { authenticate } = this.props;
    authenticate({ username, password });
  };
  render() {
    const {
      login: { fetching }
    } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={{ uri: Images.Onboarding }}
            style={{
              height: height,
              width: width,
              marginTop: "-55%",
              zIndex: 1
            }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Input
                  onChangeText={this._handleUsernameChange}
                  color="#444"
                  rounded
                  placeholder="Username"
                  label="Username"
                />
              </Block>
              <Block row>
                <Input
                  onChangeText={this._handlePasswordChange}
                  rounded
                  placeholder="Password"
                  color="#444"
                  password
                  label="Password"
                  viewPass
                />
              </Block>
            </Block>
            <Block center>
              <Button
                shadowless
                loading={fetching}
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={this._handleSubmit}
              >
                <Text style={styles.buttonText}>Submit </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticate: credential =>
    dispatch(UserActionCreator.userLoginRequest(credential))
});

const mapStateToProps = state => {
  return {
    login: UserSelectors.getUserLogin(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  buttonText: {
    color: "#fff"
  }
});
