import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
 
// define IconComponent, color, sizes and OverflowIcon in one place
const MaterialHeaderButton = (props) => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={26} color="blue" />
);
 
export const MaterialHeaderButtons = (props) => {
  return <HeaderButtons HeaderButtonComponent={MaterialHeaderButton} {...props} />;
};
export { Item } from 'react-navigation-header-buttons';