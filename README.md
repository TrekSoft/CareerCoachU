# CareerCoachU

## Dev Setup

- npm install
- react-native link
- Native setup for https://rnfirebase.io/docs/v4.3.x/installation/android and /ios
- Native setup for https://github.com/react-community/react-native-image-picker#install
- Install these modules for Firebase:
  - https://rnfirebase.io/docs/v4.3.x/auth/android
  - https://rnfirebase.io/docs/v4.3.x/firestore/android
  - https://rnfirebase.io/docs/v4.3.x/database/android
  - https://rnfirebase.io/docs/v4.3.x/storage/android
  - https://rnfirebase.io/docs/v4.3.x/crashlytics/android
- In android/build.gradle set minSdkVersion to 21 to avoid the multidex support issue (https://developer.android.com/studio/build/multidex)
