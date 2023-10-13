import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-3940256099942544/2934735716';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const MyAdsScreen = () => {
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     },
  //   );

  //   // Start loading the interstitial straight away
  //   interstitial.load();

  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

  // // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  return (
    <>
      {/* <View style={{backgroundColor: 'red'}}>
        <BannerAd
          unitId={
            'ca-app-pub-9777227605462893/5949518640'
            //   adUnitId
            //   Platform.OS === 'ios'
            //     ? 'ca-app-pub-9777227605462893~1399845641'
            //     : 'ca-app-pub-9777227605462893~9034831072'
          }
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View> */}
      <SafeAreaView style={{backgroundColor:'red'}}>
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId="ca-app-pub-3940256099942544/2934735716"
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={error => {
            console.error('Advert failed to load: ', error);
          }}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 1,
          padding: 10,
        }}
        onPress={() => {
          interstitial.show();
        }}>
        <Text>InterstitialAd</Text>
      </TouchableOpacity>
    </>
  );
};

export default MyAdsScreen;

const styles = StyleSheet.create({});
