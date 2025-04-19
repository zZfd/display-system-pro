import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { scale, ScaledSheet } from "react-native-size-matters";
const WaterPage = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <ImageBackground
          source={require("@/assets/images/honey/honey-water-bg.png")}
          resizeMode="contain"
          style={styles.backgroundImage}
        >
          {/* <Image
            source={require("@/assets/images/honey/logo.jpeg")}
            resizeMode="contain"
            style={styles.logo}
          /> */}
          <Text style={styles.title}>{"柠檬\n蜂蜜水"}</Text>
          {/* <ProductAmount style={styles.styles} /> */}
          <View style={styles.mainAmount}>
            <Text style={styles.amountTitle}>惊喜价</Text>
            <AmountRow />
          </View>
          <View style={styles.bottomAmount}>
            <View style={styles.tagContainer}>
              <Text style={styles.tagTitle}>惊喜价</Text>
            </View>
            <AmountRow fontSize={scale(18)} />
          </View>
          <View style={styles.descriptionBlock}>
            <View style={styles.vDivider}></View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>
                蜂蜜、柠檬和水混合而成。
              </Text>
              <Text style={styles.descriptionSubText}>
                清甜解渴，补充能量，继续前行。
              </Text>
              <View style={styles.hDivider}></View>
              <Text style={styles.storeText}>扫码获取更多甜蜜！</Text>
            </View>
          </View>
          <View style={styles.qrCodeBlock}>
            <Image
              source={require("@/assets/images/honey/product-qrcode.jpg")}
              resizeMode="contain"
              style={styles.qrCode}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

interface AmountRowProps {
  fontSize?: number;
  amount?: string;
}

const AmountRow = (props: AmountRowProps) => {
  const { fontSize = scale(12), amount = "9.9" } = props;
  return (
    <View style={amountStyles.content}>
      <Text style={[amountStyles.symbol, { fontSize: fontSize * 0.66 }]}>
        ¥
      </Text>
      <Text style={[amountStyles.amount, { fontSize }]}>{amount}</Text>
    </View>
  );
};

const amountStyles = ScaledSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    columnGap: "1@s",
    backgroundColor: "transparent",
    alignItems: "baseline",
  },
  symbol: {
    fontSize: "8@s",
    // lineHeight: "27@s",
    fontWeight: "bold",
    fontFamily: "SpaceMono",
    color: "#ef723a",
  },
  amount: {
    fontWeight: "700",
    // fontFamily: "SpaceMono",
    color: "#ef723a",
  },
});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: "relative",
  },
  logo: {
    width: "24@s",
    height: "24@s",
    borderRadius: "30@s",
    position: "absolute",
    top: "32@s",
    left: "135@s",
  },
  title: {
    color: "#f5e4c6",
    fontSize: "24@s",
    lineHeight: "27@s",
    fontWeight: "bold",
    fontFamily: "SpaceMono",
    position: "absolute",
    top: "72@s",
    left: "140@s",
  },
  mainAmount: {
    position: "absolute",
    top: "163@s",
    left: "168@s",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  amountTitle: {
    fontSize: "5@s",
    fontWeight: "500",
    // fontFamily: "SpaceMono",
    color: "#ef723a",
  },
  bottomAmount: {
    position: "absolute",
    bottom: "30@s",
    left: "140@s",
  },
  descriptionBlock: {
    position: "absolute",
    bottom: "30@s",
    left: "180@s",
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: "6@s",
  },
  vDivider: {
    width: "1@s",
    height: "34@s",
    backgroundColor: "#e9d8b1",
  },
  description: {
    flex: 1,
    flexDirection: "column",
    rowGap: "2@s",
  },
  descriptionText: {
    fontSize: "8@s",
    fontWeight: "700",
    // fontFamily: "SpaceMono",
    color: "#ef723a",
  },
  descriptionSubText: {
    marginTop: "2@vs",
    fontSize: "6@s",
    fontWeight: "400",
    fontFamily: "SpaceMono",
    color: "#eb8d53",
  },
  hDivider: {
    marginTop: "4@vs",
    width: "28@s",
    height: "1@s",
    backgroundColor: "#ba7e59",
  },
  storeText: {
    marginTop: "2@vs",
    fontSize: "4@s",
    fontWeight: "500",
    // fontFamily: "SpaceMono",
    color: "#dfb288",
  },
  qrCodeBlock: {
    backgroundColor: "#fff",
    padding: "3@s",
    borderRadius: "4@s",
    position: "absolute",
    bottom: "28@s",
    right: "135@s",
  },
  qrCode: {
    width: "34@s",
    height: "34@s",
  },
  tagContainer: {
    width: "28@s",
    borderRadius: "6@s",
    // paddingHorizontal: "1@s",
    paddingVertical: "2@s",
    backgroundColor: "#ef723a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tagTitle: {
    fontSize: "6@s",
    fontWeight: "400",
    textAlign: "center",
    // fontFamily: "SpaceMono",
    color: "#fff",
  },
});

export default WaterPage;
