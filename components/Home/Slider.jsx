import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Dimensions, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FireBaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const flatListRef = useRef(null); // Reference to the FlatList
  const screenWidth = Dimensions.get('screen').width;
  const scrollInterval = useRef(null); // Store interval reference to clear later

  useEffect(() => {
    GetSliders();
    return () => clearInterval(scrollInterval.current); // Clear interval on component unmount
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, 'Slider'));
    const sliderData = [];
    snapshot.forEach((doc) => {
      sliderData.push(doc.data());
    });
    setSliderList(sliderData);
  };

  useEffect(() => {
    if (sliderList.length > 0) {
      startAutoScroll();
    }
  }, [sliderList]);

  const startAutoScroll = () => {
    let currentIndex = 0;
    scrollInterval.current = setInterval(() => {
      currentIndex++;
      if (currentIndex >= sliderList.length) {
        currentIndex = 0; // Reset to the beginning
      }
      flatListRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }, 5000); // Scroll every 3 seconds
  };

  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        ref={flatListRef} // Attach the FlatList reference
        data={sliderList}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={{
                width: screenWidth * 0.9,
                height: 160,
                borderRadius: 15,
                marginRight: 15,
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
