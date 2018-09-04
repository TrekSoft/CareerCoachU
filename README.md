# CareerCoachU

## Dev Setup

- yarn install
- react-native link
- Native setup for https://rnfirebase.io/docs/v4.3.x/installation/android and /ios
- Install these modules for Firebase:
  - https://rnfirebase.io/docs/v4.3.x/auth/android
  - https://rnfirebase.io/docs/v4.3.x/firestore/android
  - https://rnfirebase.io/docs/v4.3.x/database/android
- In android/build.gradle set minSdkVersion to 21 to avoid the multidex support issue (https://developer.android.com/studio/build/multidex)
