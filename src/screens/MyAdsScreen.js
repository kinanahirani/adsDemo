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
import CButton from '../components/CButton';
import { verticalScale } from '../helpers/sizeHelpers';

const bannerUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-3940256099942544/6300978111';

const interstitialUnitId = __DEV__
? TestIds.INTERSTITIAL
: 'ca-app-pub-3940256099942544/4411468910';

const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/4411468910', {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handleInterstitialAd=async()=>{
  let loaded = false;
  const interstitialUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-3940256099942544/1033173712';

  const interstitial = InterstitialAd.createForAdRequest(interstitialUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    loaded=true
    console.log("ads loaded");
    unsubscribeLoaded();
  });

  const showAds = async () => {
    interstitial.load();
      while (!loaded) 
        await sleep(1000);
        interstitial.show();
  };

  await showAds();
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
  : 'ca-app-pub-3940256099942544/5354046379';

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
      <SafeAreaView style={{alignItems:'center'}}>
        <View style={{marginTop:verticalScale(10)}}>
        <BannerAd
          size={BannerAdSize.BANNER}
          unitId={bannerUnitId}
          onAdLoaded={() => {
            console.log('Advertise loaded');
          }}
          onAdFailedToLoad={error => {
            console.error('Advertise failed to load: ',error);
          }}
        />
        </View>
          <CButton title={"InterstitialAd"} 
            // onPress={() => {
            // if (isLoaded) {
            //   show();
            // }
            // // else {
            // //   // No advert ready to show yet
            // //   navigation.navigate('NextScreen');
            // // }
            // }}
            onPress={handleInterstitialAd}
        extraStyles={{marginTop:verticalScale(20)}}
        />
        <CButton title={'Rewarded Ad'} onPress={handleRewardedAd} extraStyles={{marginVertical:verticalScale(10)}}/>
        <CButton onPress={handleRewardedInterstitialAd} title={'Rewarded Interstitial Ad'}/>
      </SafeAreaView>
  );
};

export default MyAdsScreen;

const styles = StyleSheet.create({});
