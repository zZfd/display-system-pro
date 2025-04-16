## 如何做好样式和主题的管理

### 响应式

- 使用 react-native-size-matters，结合设计稿和样式进行颗粒度的管理。
- 根据屏幕尺寸的不同，修改布局。react-native-media-query

### 字体大小

- 使用 react-native-size-matters.moderateScale
- Text AllowFontScaling 默认为 true，会响应系统字体的修改
- 定义 FontSizes

### 主题管理

- 使用 ReactNative 的 useColorScheme 来获取系统的主题色
- 使用 Themed Component 来绘制 UI
- 使用 useThemeColor 进行颗粒度的主题色管理
- 定义主题色的 Colors

### 图像管理

1. 根据主题色替换图像
2. 基于 Image 实现简单的颜色反转
   `const invertedStyle = colorScheme === 'dark' ? { tintColor: '#fff', transform: [{ scaleX: -1 }] } : {};`
3. 使用 react-native-reanimated 的 filter 实现颜色反转

````const App = () => {
  const colorScheme = useColorScheme();
  const invert = useSharedValue(colorScheme === 'dark' ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      filter: `invert(${withTiming(invert.value, { duration: 300 })})`,
    };
  });

  React.useEffect(() => {
    invert.value = colorScheme === 'dark' ? 1 : 0;
  }, [colorScheme]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.image, animatedStyle]}
        source={require('./assets/sample-image.png')}
      />
    </View>
  );
};```
````
