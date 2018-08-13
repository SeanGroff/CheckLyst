import Reactotron from 'reactotron-react-native'

console.disableYellowBox = true

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

console.tron = Reactotron
