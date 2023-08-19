import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Button, HStack } from 'native-base';
import React, { memo } from 'react';
type Props = {} & BottomTabBarProps;

const NavigationFooter = memo((props: Props) => {
  const activeRoute = props.state.routes[props.state.index].name;
  return (
    <HStack>
      {props.state.routes.map(route => {
        const routeActive = route.name === activeRoute;
        return (
          <Button
            variant={routeActive ? 'solid' : 'outline'}
            style={{ flexGrow: 1, borderRadius: 0 }}
            size="sm"
            colorScheme={'info'}
            key={route.key}
            onPress={() => props.navigation.navigate(route.name)}>
            {route.name}
          </Button>
        );
      })}
    </HStack>
  );
});

export default NavigationFooter;
