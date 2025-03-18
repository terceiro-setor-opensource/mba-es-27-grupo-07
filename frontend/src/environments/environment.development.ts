export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
  functions: {
    profile: {
      createUrl: 'YOUR_PROFILE_CREATE_URL',
    },
    ads: {
      createUrl: 'YOUR_ADS_CREATE_URL',
      listUserAds: 'YOUR_LIST_USER_ADS_URL',
      getUserAds: 'YOUR_GET_USER_ADS_URL',
      updateAds: 'YOUR_UPDATE_ADS_URL',
      listAllAds: 'YOUR_LIST_ALL_ADS_URL',
      deleteAds: 'YOUR_DELETE_ADS_URL',
      listAdsByTitle: 'YOUR_LIST_ADS_BY_TITLE_URL',
      getAds: 'YOUR_GET_ADS_URL',
    },
  },
};
