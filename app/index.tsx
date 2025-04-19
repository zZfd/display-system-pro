import WaterPage from "@/components/honey/WaterPage";
import { useLocalRealm } from "@/libs/database/context";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

const ImageCarousel = () => {
  const images = [
    require("@/assets/images/honey/honey-water-bg.png"),
    require("@/assets/images/honey/honey-box-bg.png"),
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const pageViewerRef = useRef<PagerView>(null);
  const realm = useLocalRealm();

  useEffect(() => {
    console.log(realm.schema);
  }, []);

  // 自动轮播逻辑
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextPage = (currentPage + 1) % images.length;
  //     // 使用 setPageWithoutAnimation 来确保动画方向一致
  //     pageViewerRef.current?.setPageWithoutAnimation(nextPage);
  //     setCurrentPage(nextPage);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [currentPage]);

  const handlePageChange = (e: any) => {
    const newPosition = e.nativeEvent.position;
    // 处理用户手动滑动
    if (newPosition < currentPage) {
      // 向左滑动时，立即跳到最后一页
      const lastPage = images.length - 1;
      pageViewerRef.current?.setPageWithoutAnimation(lastPage);
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPosition);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pageViewerRef}
        style={styles.pageViewer}
        initialPage={0}
        onPageSelected={handlePageChange}
        scrollEnabled={true}
      >
        {/* {images.map((img, index) => (
          <View key={index} style={styles.page}>
            <Image source={img} style={styles.image} resizeMode="contain" />
          </View>
        ))} */}
        <WaterPage />
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageViewer: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageCarousel;
