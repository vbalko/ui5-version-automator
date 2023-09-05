const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

const DEBUG = true;
//read DEBUG env variable if it is set to true
const debug = process.env.DEBUG === 'true' || DEBUG ? true : false;

/**
 * Reads the current version from the manifest data.
 * @param {Object} manifestData - The manifest data object.
 * @returns {string} The current version.
 */
const readCurrentVersion = (manifestData) => {
    if (manifestData && manifestData["sap.app"] && manifestData["sap.app"].applicationVersion && manifestData["sap.app"].applicationVersion.version) {
        return manifestData["sap.app"].applicationVersion.version;
    } else {
        return "0.0.1";
    }
};

//increment major version
const incrementMajorVersion = (currentVersion) => {
    // Increment major version
    let versionArray = currentVersion.split(".");
    versionArray[0] = parseInt(versionArray[0]) + 1;
    versionArray[1] = 0;
    versionArray[2] = 0;
    return versionArray.join(".");
};

//increment minor version
const incrementMinorVersion = (currentVersion) => {
    // Increment minor version
    let versionArray = currentVersion.split(".");
    versionArray[1] = parseInt(versionArray[1]) + 1;
    versionArray[2] = 0;
    return versionArray.join(".");
};

//increment patch version
const incrementPatchVersion = (currentVersion) => {
    // Increment patch version
    let versionArray = currentVersion.split(".");
    versionArray[2] = parseInt(versionArray[2]) + 1;
    return versionArray.join(".");
};

/**
 * Increments the version based on the specified type (major, minor, or patch).
 * @param {string} currentVersion - The current version in the format "x.y.z".
 * @param {string} [type='patch'] - The type of version to increment (major, minor, or patch).
 * @returns {string} The new version in the format "x.y.z".
 */
const incrementVersion = (currentVersion, type = 'patch') => {
  // Increment version based on type (major, minor, patch)
    // Return new version

    // Example:
    // currentVersion = "1.0.0"
    // type = "minor"
    // newVersion = "1.1.0"

    // Example:
    // currentVersion = "1.0.0"
    // type = "major"
    // newVersion = "2.0.0"

    // Example:
    // currentVersion = "1.0.0"
    // type = "patch"
    // newVersion = "1.0.1"
    let newVersion = currentVersion;
    switch (type) {
        case "major":
            // Increment major version
            newVersion = incrementMajorVersion(currentVersion);
            break;
        case "minor":
            // Increment minor version
            newVersion = incrementMinorVersion(currentVersion);
            break;
        case "patch":
            // Increment patch version
            newVersion = incrementPatchVersion(currentVersion);
            break;
        default:
            // Invalid type
            console.error("Error: Invalid version type.");
            process.exit(1);
            break;
    }

    return newVersion;

};

/**
 * Reads the manifest.json file and returns its contents.
 * @param {string} filePath - The path to the manifest.json file.
 * @returns {Object} - The contents of the manifest.json file.
 */
const readManifest = (filePath) => {
    // Read the manifest.json file
    let manifestData;
    try {
        manifestData = jsonfile.readFileSync(filePath);
    } catch (err) {
        console.error('Error: Manifest file not found.');
        process.exit(1);
    }
    return manifestData;
};

/**
 * Writes the manifest data to the manifest.json file.
 *
 * @param {string} filePath - The path to the manifest.json file.
 * @param {object} manifestData - The data to write to the manifest.json file.
 */
const writeManifest = (filePath, manifestData) => {
  // Write the manifest data to the manifest.json file
    jsonfile.writeFileSync(filePath, manifestData, { spaces: 4 });
};


/**
 * Prepares the manifest data by adding or updating the sap.app.applicationVersion property with the new version.
 * @param {Object} manifestData - The manifest data object.
 * @param {string} newVersion - The new version to be added or updated in the manifest data.
 * @returns {Object} The updated manifest data object.
 */
const prepareManifest = (manifestData, newVersion) => {
    //check if manifestData contains sap.app.applicationVersion, if not add it
    if (!manifestData["sap.app"].applicationVersion) {
        manifestData["sap.app"].applicationVersion = {
            "version": newVersion,
            "buildTimestamp": new Date().toISOString()
        };
    } else {
        //update manifestData with new version
        manifestData["sap.app"].applicationVersion.version = newVersion;
    }
    return manifestData;
};


/**
 * Write an welcome message in the console
 */
function welcomeMessage() {
    console.log();
    for (let i = 0; i < 2; i++) {
      console.log("|-----------------------------|");
    }
    console.log(
      "       \x1b[1mThanks \x1b[32m4 \x1b[33musing \x1b[35mme \x1b[0m"
    );
    for (let i = 0; i < 2; i++) {
      console.log("|-----------------------------|");
    }
    console.log();
  }

/**
 * Recursively searches through a folder structure for a manifest.json file
 * @param {string} folderPath - The path of the folder to search in
 * @returns {string|null} - The path of the manifest.json file if found, null otherwise
 */
function findManifestJSON(folderPath) {
    // Read the contents of the current folder
    const files = fs.readdirSync(folderPath);

    // Loop through all files in the current folder
    for (const file of files) {
        const filePath = path.join(folderPath, file);

        // Ignore the "node_modules" and "dist" folders
        if ((file === 'node_modules' || file === 'dist') || file === 'test' && fs.statSync(filePath).isDirectory()) {
            continue;
        }

        // Check if the filename matches "manifest.json"
        if (file === 'manifest.json') {
            return filePath; // File found, return the full path
        }

        // Check if the file is a subfolder
        if (fs.statSync(filePath).isDirectory()) {
            // Recursively search in the subfolder
            const foundFilePath = findManifestJSON(filePath);
            if (foundFilePath) {
                return foundFilePath; // File found, return the full path
            }
        }
    }

    // File not found, return null
    return null;
}

module.exports = {
  readCurrentVersion,
  incrementVersion,
  readManifest,
  writeManifest,
  welcomeMessage,
  findManifestJSON,
  prepareManifest
};
