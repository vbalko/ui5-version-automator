const versionManager = require('./versionManager');
const currentFolderPath = process.cwd();
const file = versionManager.findManifestJSON(currentFolderPath);

const DEBUG = true;
//read DEBUG env variable if it is set to true
const debug = process.env.DEBUG === 'true' || DEBUG ? true : false;

if (debug) {
    console.log("DEBUG: currentFolderPath: " + currentFolderPath);
    console.log("DEBUG: file: " + file);
} 

versionManager.welcomeMessage();
let manifestData = versionManager.readManifest(file);

let oldVersion = versionManager.readCurrentVersion(manifestData);

console.log(oldVersion);

let newVersion = versionManager.incrementVersion(oldVersion, 'patch');

console.log(newVersion);

//prepare manifest.json with new version
const newManifest = versionManager.prepareManifest(manifestData, newVersion);

//write manifest.json
versionManager.writeManifest(file, newManifest);


module.exports = {
  autoIncrement: versionManager.autoIncrement,
  // other functionalities
};
