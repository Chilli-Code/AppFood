// components/CustomSwitch.tsx
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CustomSwitchProps {
  value: boolean;
  onToggle: () => void;
  trackColors?: { on: string; off: string };
  duration?: number;
}

const CustomSwitch = ({
  value,
  onToggle,
  duration = 400,
  trackColors = { on: '#FE8C00', off: '#DFE0F3' },
}: CustomSwitchProps) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const progress = useSharedValue(value ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration });
  }, [value]);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(progress.value, [0, 1], [trackColors.off, trackColors.on]);
    return {
      backgroundColor: bg,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateValue = interpolate(progress.value, [0, 1], [0, width.value - height.value]);
    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onToggle}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        
        style={[styles.track, trackAnimatedStyle]}
      >
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    alignItems: 'flex-start',
    width: 40,
    height: 20,
    padding: 4,
    
  },
  thumb: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
});

export default CustomSwitch;