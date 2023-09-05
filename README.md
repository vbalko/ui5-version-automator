# ui5-version-automator

An npm package that automates versioning for SAP UI5 applications, streamlining the release process and ensuring version consistency.

## Installation

To install the package, run the following command:

```javascript
npm install ui5-version-automator
```

## Usage

To use the package, follow these steps:

1. Import the module into your code using 
```javascript
const versionManager = require('ui5-version-automator')
```
2. Call the `readManifest` function to read the manifest.json file. For example:

```javascript
const manifestPath = './manifest.json';
const manifestData = versionManager.readManifest(manifestPath);
```

3. Call the readCurrentVersion function to get the current version number from the manifest data. For example:

```javascript
const currentVersion = versionManager.readCurrentVersion(manifestData);
```

4. Call the incrementMajorVersion or incrementMinorVersion function to increment the version number. For example:

```javascript
const newVersion = versionManager.incrementMajorVersion(currentVersion);
```

5. Call the prepareManifest function to prepare a new manifest.json file with the updated version number. For example:

```javascript
const newManifest = versionManager.prepareManifest(manifestData, newVersion);
```

6. Write the new manifest.json file to disk using the writeManifest function. For example:

```javascript
versionManager.writeManifest(manifestPath, newManifest);
```

7. Use any other functionalities provided by the module as needed.

#Contributing
Contributions are welcome! To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

#License
This project is licensed under the MIT License. See the LICENSE file for details.

Let me know if you have any questions or need further assistance!