import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DURATION = 300;

const styles = StyleSheet.create({
  container: {},
});

export const ResizingButton = ({
  accessibilityHint,
  accessibilityLabel,
  isDisabled = false,
  isLoading = false,
  onPress,
  scale = 0.95,
  className,
  outerClassName,
  children,
}) => {
  const transition = useSharedValue(0);
  const isActive = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(transition.value, [0, 1], [1, scale]),
      },
    ],
  }));

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{
        busy: isLoading,
        disabled: isDisabled || isLoading,
      }}
      disabled={isDisabled || isLoading}
      hitSlop={16}
      onPress={onPress}
      onPressIn={() => {
        isActive.value = true;
        transition.value = withTiming(1, { duration: DURATION }, () => {
          if (!isActive.value) {
            transition.value = withTiming(0, {
              duration: DURATION,
            });
          }
        });
      }}
      onPressOut={() => {
        if (transition.value === 1) {
          transition.value = withTiming(0, { duration: DURATION });
        }
        isActive.value = false;
      }}
      className={`${outerClassName}`}
    >
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          {
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
        className={`${className}`}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};
