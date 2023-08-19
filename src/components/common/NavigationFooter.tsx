import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { memo } from 'react';
import { Separator, Tabs, Text } from 'tamagui';
type Props = {} & BottomTabBarProps;

const NavigationFooter = memo((props: Props) => {
  const activeRoute = props.state.routes[props.state.index].name;
  return (
    <Tabs
      value={activeRoute}
      onValueChange={newRoute => props.navigation.navigate(newRoute)}
      orientation="horizontal"
      flexDirection="column"
      overflow="hidden">
      <Tabs.List disablePassBorderRadius separator={<Separator vertical />}>
        {props.state.routes.map(route => {
          // const routeActive = route.name === activeRoute;
          return (
            <Tabs.Tab
              borderRadius={0}
              style={{ flexGrow: 1 }}
              key={route.name}
              value={route.name}>
              <Text>{route.name}</Text>
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
    </Tabs>
  );
});

export default NavigationFooter;
