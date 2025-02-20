import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText, Path } from 'react-native-svg';
import { useSharedValue, withSpring } from 'react-native-reanimated';

const Wheel = () => {
  const [result, setResult] = useState(null);
  const rotation = useSharedValue(0);
  const coupons = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%'];
  const numberOfSegments = coupons.length;
  const anglePerSegment = 360 / numberOfSegments;

  const spinWheel = () => {
    const randomRotation = Math.floor(Math.random() * 360) + 360 * 5; 
    rotation.value = withSpring(randomRotation, {
      damping: 10,
      stiffness: 100,
    });

    const finalAngle = randomRotation % 360;
    const winningIndex = Math.floor((360 - finalAngle) / anglePerSegment);
    setResult(coupons[winningIndex]);
  };

  return (
    <View style={styles.container}>
      <Svg height="300" width="300" viewBox="0 0 300 300">
        <G transform={`rotate(${rotation.value}, 150, 150)`}>
          {coupons.map((coupon, index) => {
            const startAngle = (index * anglePerSegment - 90) * (Math.PI / 180);
            const endAngle = ((index + 1) * anglePerSegment - 90) * (Math.PI / 180);
            const largeArcFlag = anglePerSegment <= 180 ? 0 : 1;

            const x1 = 150 + 100 * Math.cos(startAngle);
            const y1 = 150 + 100 * Math.sin(startAngle);
            const x2 = 150 + 100 * Math.cos(endAngle);
            const y2 = 150 + 100 * Math.sin(endAngle);

            const path = `M150,150 L${x1},${y1} A100,100 0 ${largeArcFlag},1 ${x2},${y2} Z`;

            return (
              <G key={index}>
                <Path d={path} fill={`hsl(${(index * 360) / numberOfSegments}, 70%, 70%)`} />
                <SvgText
                  x={150 + 70 * Math.cos((startAngle + endAngle) / 2)}
                  y={150 + 70 * Math.sin((startAngle + endAngle) / 2)}
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  transform={`rotate(${(startAngle + endAngle) * (180 / Math.PI) / 2}, ${150 + 70 * Math.cos((startAngle + endAngle) / 2)}, ${150 + 70 * Math.sin((startAngle + endAngle) / 2)})`}
                >
                  {coupon}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
      <TouchableOpacity style={styles.button} onPress={spinWheel}>
        <Text style={styles.buttonText}>Forgasd a kereket!</Text>
      </TouchableOpacity>
      {result && <Text style={styles.resultText}>Nyertél: {result} kedvezményt!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Wheel;