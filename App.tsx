

import React from 'react';
import {
  FlatList,
  Animated,
  Image,
  SafeAreaView,
  Dimensions,
  View,
  StyleSheet,
  Text
} from 'react-native';

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Lorem ipsum dolor.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel vehicula justo. Donec mi urna, mattis id semper id, interdum.',
    image: 'https://cdn-icons-png.flaticon.com/512/4228/4228703.png'
  },
  {
    key: '3571573',
    title: 'Lorem ipsum dolor.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel vehicula justo. Donec mi urna, mattis id semper id, interdum.',
    image: 'https://cdn-icons-png.flaticon.com/512/4228/4228691.png'
  },
  {
    key: '3571574',
    title: 'Lorem ipsum dolor.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel vehicula justo. Donec mi urna, mattis id semper id, interdum.',
    image: 'https://cdn-icons-png.flaticon.com/512/4228/4228689.png'
  },
  {
    key: '3571575',
    title: 'Lorem ipsum dolor.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel vehicula justo. Donec mi urna, mattis id semper id, interdum.',
    image: 'https://cdn-icons-png.flaticon.com/512/4228/4228707.png'
  },
]


const { height, width } = Dimensions.get('screen');

interface IIndicatorProps {
  scrollX: Animated.Value
}


const Indicator: React.FC<IIndicatorProps> = ({ scrollX }) => {

  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
      {DATA.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp'
        })
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp'
        })
        return (
          <Animated.View
            key={`indicator-${index}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              opacity,
              margin: 10,
              transform: [{ scale }]

            }}
          />

        )

      })}
    </View>

  )
}


interface IBackDropProps {
  scrollX: Animated.Value
}


const BackDrop: React.FC<IBackDropProps> = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg)
  })

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />


  )
}
interface ISquareProps {
  scrollX: Animated.Value
}


const Square: React.FC<ISquareProps> = ({ scrollX }) => {
  const distance = Animated.modulo(Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)), 1);

  const rotate = distance.interpolate({
    inputRange: [0, .5, 1],
    outputRange: ['35deg', '0deg', '-45deg']
  })

  const translateX = distance.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, -height, 0]
  })

  return (
    <Animated.View style={{
      width: height, height, backgroundColor: '#fff', borderRadius: 86, position: 'absolute', top: -height * 0.65, left: -height * 0.3, transform: [{
        rotate
      },
      {
        translateX
      }]
    }} />


  )
}
const App = () => {

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: 'center' }}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />
              </View>
              <View style={{ flex: .3 }}>
                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 28, marginBottom: 10 }}>{item.title}</Text>
                <Text style={{ fontWeight: '300' }}>{item.description}</Text>

              </View>
            </View>
          )
        }}

      />
      <Indicator scrollX={scrollX} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',

  }

})

export default App;
