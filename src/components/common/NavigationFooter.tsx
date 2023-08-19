import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
type Props = {} & BottomTabBarProps;

const NavigationFooter = memo((props: Props) => {
  const activeRoute = props.state.routes[props.state.index].name;
  return (
    <View
      style={{
        flexGrow: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 15,
      }}>
      {props.state.routes.map(route => {
        return (
          <Pressable
            key={route.key}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 5,
            }}
            onPress={() => props.navigation.navigate(route.name)}>
            <Text
              style={{ color: route.name === activeRoute ? 'blue' : 'black' }}>
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

export default NavigationFooter;
