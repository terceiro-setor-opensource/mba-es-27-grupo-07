export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCVKev68vI88HQn9c_0f26Jw2EhPC0zkzc',
    authDomain: 'mba-es27-condominio-conectado.firebaseapp.com',
    projectId: 'mba-es27-condominio-conectado',
    storageBucket: 'mba-es27-condominio-conectado.firebasestorage.app',
    messagingSenderId: '',
    appId: 'mba-es27-condominio-conectado',
  },
  functions: {
    profile: {
      createUrl: 'https://createuserwithdetails-7wa5cxxgza-uc.a.run.app',
    },
    ads: {
      createUrl: 'https://createads-7wa5cxxgza-uc.a.run.app',
      listUserAds: 'https://listuserads-7wa5cxxgza-uc.a.run.app',
      getUserAds: 'https://getuserads-7wa5cxxgza-uc.a.run.app',
      updateAds: 'https://updateads-7wa5cxxgza-uc.a.run.app',
      listAllAds: 'https://listads-7wa5cxxgza-uc.a.run.app',
      listAdsByTitle: 'https://listadsbytitle-7wa5cxxgza-uc.a.run.app',
      getAds: 'https://getads-7wa5cxxgza-uc.a.run.app',
    },
  },
};
