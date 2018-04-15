// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://api.tradeskillmaster.com/v1/item',
  apiKey: 'J_1JjDK3aZinZsU9oJYFnkkwyp4le7oA',
  realm: 'draenor',
  region: 'EU',
  firebase: {
    apiKey: "AIzaSyCCLz8LEDs27QSnctBvHGRGlTDwwoCpmK4",
    authDomain: "timo-wow.firebaseapp.com",
    databaseURL: "https://timo-wow.firebaseio.com",
    projectId: "timo-wow",
    storageBucket: "timo-wow.appspot.com",
    messagingSenderId: "568383982422"
  }
};
