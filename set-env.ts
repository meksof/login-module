const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');
require('dotenv').load();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
  apiUrl: '${process.env.API_URL}',
  production: false,
  firebaseConfig: {
    apiKey: '${process.env.FIREBASE_APIKEY}',
    authDomain: '${process.env.FIREBASE_AUTHDOMAIN}'
  }
};
`;
console.log(
  colors.magenta(
    'The file `environment.ts` will be written with the following content: \n'
  )
);
console.log(colors.grey(envConfigFile));
fs.writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    );
  }
});
