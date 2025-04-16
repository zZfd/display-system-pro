import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PageViewer from 'react-native-page-viewer';

const ImageCarousel = () => {
  const images = [
    require('./honey-water-bg.png'),
    require('./honey-box-bg.png')
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const pageViewerRef = useRef<PageViewer>(null);

  // 自动轮播逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % images.length;
      setCurrentPage(nextPage);
      pageViewerRef.current?.setPage(nextPage);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <PageViewer
        ref={pageViewerRef}
        style={styles.pageViewer}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        scrollEnabled={true}
      >
        {images.map((img, index) => (
          <View key={index} style={styles.page}>
            <Image source={img} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </PageViewer>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageCarousel;