process.env.TAMAGUI_TARGET = 'native';
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['transform-inline-environment-variables'],
};
