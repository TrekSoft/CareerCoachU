# CareerCoachU

## Dev Setup

1. yarn install
2. react-native link
3. Native setup for https://github.com/ivpusic/react-native-image-crop-picker
4. Native setup for https://rnfirebase.io/docs/v4.3.x/installation/android and /ios
5. Install these modules for Firebase:
  - https://rnfirebase.io/docs/v4.3.x/auth/android
  - https://rnfirebase.io/docs/v4.3.x/firestore/android
  - https://rnfirebase.io/docs/v4.3.x/database/android
6. In android/build.gradle set minSdkVersion to 21 to avoid the multidex support issue (https://developer.android.com/studio/build/multidex)
