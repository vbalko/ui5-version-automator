const versionManager = require('./versionManager');
const jsonfile = require('jsonfile');
const path = require('path');
const currentFolderPath = process.cwd();
const file = versionManager.findManifestJSON(currentFolderPath);

versionManager.welcomeMessage();
let manifestData;
try {
    manifestData = jsonfile.readFileSync(file);
} catch (err) {
    console.error('Error: Manifest file not found.');
    process.exit(1);
}
let oldVersion = versionManager.readCurrentVersion(manifestData);

console.log(oldVersion);

module.exports = {
  autoIncrement: versionManager.autoIncrement,
  // other functionalities
};
