import React from 'react';
import { RootState } from 'reduxActions/store';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Options from 'pages/options';
import Login from 'pages/login';
import List from 'pages/itemList';
import { Dispatch }  from 'redux';
import Components from 'components';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { LandingStackParamList, DrawerStackParamList } from 'navigatorTypes';

interface AppProps {
  dispatch: Dispatch;
  isAuthenticated: boolean;
}

const LandingStack = createStackNavigator<LandingStackParamList>();
const DrawerStack = createDrawerNavigator<DrawerStackParamList>();

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

class App extends React.Component<AppProps> {
  renderDrawer(props: DrawerContentComponentProps): React.ReactNode {
    return (
      <Components.Drawer
        navigationProps={props}
      />
    );
  }

  render(): React.ReactNode {
    return (
      <View style={styles.mainContainer}>
        <NavigationContainer>
          {this.props.isAuthenticated ? (
            <DrawerStack.Navigator
              drawerContent={this.renderDrawer}
              initialRouteName="ItemList"
            >
              <DrawerStack.Screen name="ItemList" component={List} />
            </DrawerStack.Navigator>
          ) : (
            <LandingStack.Navigator
              initialRouteName="Options"
              screenOptions={{
                headerShown: false,
              }}
            >
              <LandingStack.Screen name="Options" component={Options} />
              <LandingStack.Screen name="Login" component={Login} />
            </LandingStack.Navigator>
          )}
        </NavigationContainer>
      </View>
    )
  }
}

function mapStateToProps(state: RootState) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(App);
