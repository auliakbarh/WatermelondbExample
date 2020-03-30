import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Root from '../screens/Root';
import Blog from '../screens/Blog';
import ModerationQueue from '../screens/ModerationQueue';
import Post from '../screens/Post';

const Stack = createStackNavigator();

export function createNavigation(props) {
  const {database, timeToLaunch} = props;
  return () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root">
          {function() {
            return <Root database={database} timeToLaunch={timeToLaunch} />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
