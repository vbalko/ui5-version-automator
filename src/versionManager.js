const fs = require('fs');
const path = require('path');

const readCurrentVersion = (manifestData) => {
    if (manifestData) {
        return manifestData["sap.app"].applicationVersion.version;
      }
};

const incrementVersion = (currentVersion, type) => {
  // Increment version based on type (major, minor, patch)
};

const updateVersion = (filePath, newVersion) => {
  // Update manifest.json with new version
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
        if ((file === 'node_modules' || file === 'dist') && fs.statSync(filePath).isDirectory()) {
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
  updateVersion,
  welcomeMessage,
  findManifestJSON
};
