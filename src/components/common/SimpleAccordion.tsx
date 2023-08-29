import React, { FC, ReactNode, memo, useState } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
interface Props {
  summary: FC<{ expanded: boolean }>;
  details: FC<{ expanded: boolean }>;
  container?: FC<{ expanded: boolean; children: ReactNode | ReactNode[] }>;
  onPress?(e: GestureResponderEvent): void;
  onLongPress?(e: GestureResponderEvent): void;
}
const SimpleAccordion = memo(
  ({ summary, details, onLongPress, onPress, container }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const ContainerEl = container || View;
    return (
      <TouchableOpacity
        onLongPress={onLongPress}
        onPress={e => {
          setExpanded(o => !o);
          if (onPress) onPress(e);
        }}>
        <ContainerEl expanded={expanded}>
          <View>{summary({ expanded })}</View>
          {expanded && <View>{details({ expanded })}</View>}
        </ContainerEl>
      </TouchableOpacity>
    );
  },
);

export default SimpleAccordion;
