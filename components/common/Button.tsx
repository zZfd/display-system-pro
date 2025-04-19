import React, { memo } from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

type ButtonType = "primary" | "default" | "dashed" | "link" | "text";
type ButtonSize = "large" | "middle" | "small";

interface ButtonProps {
  onPress: () => void;
  title: string;
  type?: ButtonType;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
  block?: boolean;
}

const Button = memo(
  ({
    onPress,
    title,
    type = "default",
    size = "middle",
    style,
    textStyle,
    disabled,
    loading,
    danger,
    block,
  }: ButtonProps) => {
    const buttonStyles = [
      styles.button,
      styles[`${type}Button`],
      styles[`${size}Button`],
      danger && styles.dangerButton,
      block && styles.blockButton,
      disabled && styles.disabledButton,
      style,
    ];

    const textStyles = [
      styles.text,
      styles[`${type}Text`],
      styles[`${size}Text`],
      danger && styles.dangerText,
      disabled && styles.disabledText,
      textStyle,
    ];

    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color={type === "primary" ? "#fff" : "#1890ff"}
            style={styles.loader}
          />
        )}
        <Text style={textStyles}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = ScaledSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4@s",
  },
  // 类型样式
  primaryButton: {
    backgroundColor: "#1890ff",
    borderWidth: 0,
  },
  defaultButton: {
    backgroundColor: "#fff",
    borderWidth: "1@s",
    borderColor: "#d9d9d9",
  },
  dashedButton: {
    backgroundColor: "#fff",
    borderWidth: "1@s",
    borderColor: "#d9d9d9",
    borderStyle: "dashed",
  },
  linkButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  textButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  // 尺寸样式
  largeButton: {
    paddingVertical: "12@vs",
    paddingHorizontal: "20@s",
  },
  middleButton: {
    paddingVertical: "8@vs",
    paddingHorizontal: "16@s",
  },
  smallButton: {
    paddingVertical: "4@vs",
    paddingHorizontal: "4@s",
  },
  // 状态样式
  dangerButton: {
    backgroundColor: "#ff4d4f",
    borderColor: "#ff4d4f",
  },
  disabledButton: {
    opacity: 0.4,
  },
  blockButton: {
    width: "100%",
  },
  // 文字样式
  text: {
    fontWeight: "400",
  },
  primaryText: {
    color: "#fff",
  },
  defaultText: {
    color: "#000000d9",
  },
  dashedText: {
    color: "#000000d9",
  },
  linkText: {
    color: "#1890ff",
  },
  textText: {
    color: "#000000d9",
  },
  dangerText: {
    color: "#fff",
  },
  disabledText: {
    color: "#00000040",
  },
  // 尺寸文字
  largeText: {
    fontSize: "16@s",
  },
  middleText: {
    fontSize: "14@s",
  },
  smallText: {
    fontSize: "12@s",
  },
  // loading样式
  loader: {
    marginRight: "8@s",
  },
});

export default Button;
