import { max, sum } from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  TextLayoutEventData,
  TextStyle,
  View,
} from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { ScaledSheet } from "react-native-size-matters";

type State = {
  numberOfLines?: number;
  maxWidth?: number;
  maxHeight: number;
  marquee: boolean;
};

export type MarqueeTextProps = {
  value: string;
  textStyle?: StyleProp<TextStyle>;
  blinking: boolean;
};

const gap = 20;
const MarqueeText: FC<MarqueeTextProps> = ({ value, textStyle, blinking }) => {
  const translateSharedValue = useSharedValue(0);
  const textSharedValue = useSharedValue(0);
  const [textStyles, setTextStyles] = useState<State>({
    numberOfLines: undefined,
    maxWidth: undefined,
    maxHeight: 0,
    marquee: false,
  });
  const textWith = textStyles.maxWidth;
  const marquee = textStyles.marquee;
  const lineLength = useRef(0);

  useEffect(() => {
    if (marquee && textWith) {
      const offset = textWith + gap;
      translateSharedValue.value = withRepeat(
        withTiming(-offset, {
          easing: Easing.linear,
          duration: (offset / 100) * 1000, // speed, 50s/px
          reduceMotion: ReduceMotion.Never,
        }),
        -1,
        false,
        undefined,
        ReduceMotion.Never
      );
    }

    return () => {
      translateSharedValue.value = 0;
    };
  }, [textWith, marquee]);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        textSharedValue.value,
        [0, 1],
        ["#ef723a", "#303030"],
        "HSV",
        { useCorrectedHSVInterpolation: true }
      ),
      color: interpolateColor(
        textSharedValue.value,
        [0, 1],
        ["#fff", "#fff"],
        "HSV",
        { useCorrectedHSVInterpolation: true }
      ),
    };
  });

  useEffect(() => {
    if (blinking) {
      const duration = 500;
      textSharedValue.value = withRepeat(
        withSequence(
          withTiming(1, {
            duration,
            easing: Easing.exp,
            reduceMotion: ReduceMotion.Never,
          }),
          withTiming(0, {
            duration,
            easing: Easing.exp,
            reduceMotion: ReduceMotion.Never,
          })
        ),
        3,
        false,
        undefined,
        ReduceMotion.Never
      );
    }
  }, [blinking]);

  useEffect(() => {
    return () => {
      cancelAnimation(textSharedValue);
      cancelAnimation(translateSharedValue);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateSharedValue.value }] };
  }, [translateSharedValue]);

  const onTextLayout = (layout: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (textStyles.maxWidth) {
      return;
    }
    const lines = layout.nativeEvent.lines;
    if (lines.length > 1 && !lineLength.current) {
      lineLength.current = lines.length;
      const totalWidth = Math.ceil(sum(lines.map((it) => it.width)));
      setTextStyles({
        numberOfLines: undefined,
        maxWidth: totalWidth,
        maxHeight: max(lines.map((it) => it.height)) || 0,
        marquee: false,
      });
    }
    if (lineLength.current > 1) {
      setTextStyles((pre) => ({ ...pre, marquee: true }));
    }
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          !marquee && { justifyContent: "center" },
        ]}
      >
        <Animated.Text
          numberOfLines={textStyles.numberOfLines}
          style={[
            styles.text,
            {
              width: textStyles.maxWidth,
              maxHeight: textStyles.maxHeight,
            },
            textStyle,
            textAnimatedStyle,
          ]}
          onTextLayout={onTextLayout}
        >
          {value}
        </Animated.Text>
        {marquee && (
          <Animated.Text
            style={[
              styles.text,
              {
                paddingLeft: gap,
                width: textStyles.maxWidth,
                maxHeight: textStyles.maxHeight,
              },
              textStyle,
              textAnimatedStyle,
            ]}
          >
            {value}
          </Animated.Text>
        )}
      </Animated.View>
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    // maxWidth: "80%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: "12@s",
    color: "#303030",
    fontWeight: "700",
  },
});
export default MarqueeText;
