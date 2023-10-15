import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
  useInterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  RewardedInterstitialAd
} from 'react-native-google-mobile-ads';

const bannerUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-3940256099942544/2934735716';

const interstitialUnitId = __DEV__
? TestIds.INTERSTITIAL
: 'ca-app-pub-3940256099942544/4411468910';

const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/4411468910', {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

// const handleInterstitialAd=async()=>{
//   const interstitialUnitId = __DEV__
// ? TestIds.INTERSTITIAL
// : 'ca-app-pub-3940256099942544/4411468910';

// const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/4411468910', {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

// }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handleRewardedAd=async()=>{
  let loaded = false;
  const rewardedAdUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3940256099942544/5224354917';

  const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
    loaded = true;
    console.log("ads loaded");
    unsubscribeLoaded();
});

  const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log("User earned reward of ", reward);
      unsubscribeEarned();
  });

  const showAds = async () => {
    rewarded.load();
      while (!loaded) await sleep(1000);
      rewarded.show();
  };

  await showAds();
}

const handleRewardedInterstitialAd=async()=>{
  
  let loaded = false;

  const rewardedInterstitialUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(rewardedInterstitialUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(RewardedAdEventType.LOADED, () => {
    loaded = true;
    console.log("ads loaded");
    unsubscribeLoaded();
});

  const unsubscribeEarned = rewardedInterstitial.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log("User earned reward of ", reward);
      unsubscribeEarned();
  });

  const showAds = async () => {
    rewardedInterstitial.load();
      while (!loaded) await sleep(1000);
      rewardedInterstitial.show();
  };

  await showAds();

}

const MyAdsScreen = () => {
  const [loaded, setLoaded] = useState(false);

  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    interstitialUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      // navigation.navigate('NextScreen');
    }
  }, [isClosed]);

  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setLoaded(true);
  //   });
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       console.log('User earned reward of ', reward);
  //     },
  //   );

  //   // Start loading the rewarded ad straight away
  //   rewarded.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, []);

  // // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  return (
      <SafeAreaView>
        <View style={{alignItems:'center'}}>
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId={bannerUnitId}
          onAdLoaded={() => {
            console.log('Advertise loaded');
          }}
          onAdFailedToLoad={error => {
            console.error('Advertise failed to load: ', error);
          }}
        />
        </View>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 1,
          padding: 10,
        }}
        onPress={() => {
          if (isLoaded) {
            show();
          }
          // else {
          //   // No advert ready to show yet
          //   navigation.navigate('NextScreen');
          // }
        }}>
        <Text>InterstitialAd</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 1,
          padding: 10,
        }}
        onPress={handleRewardedAd}
        // onPress={()=>{
        //   rewarded.show()
        // }}
        >
        <Text>Rewarded Ad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 1,
          padding: 10,
        }}
        onPress={handleRewardedInterstitialAd}
        // onPress={()=>{
        //   rewarded.show()
        // }}
        >
        <Text>Rewarded Interstitial Ad</Text>
      </TouchableOpacity>
      </SafeAreaView>
  );
};

export default MyAdsScreen;

const styles = StyleSheet.create({});
