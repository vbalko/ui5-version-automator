const assert = require('assert');
const versionManager = require('../src/versionManager');

describe('versionManager', () => {
  describe('#readCurrentVersion()', () => {
    it('should return the current version from the manifest data', () => {
      const manifestData = {
        "sap.app": {
          "applicationVersion": {
            "version": "1.2.3"
          }
        }
      };
      const expectedVersion = '1.2.3';
      const currentVersion = versionManager.readCurrentVersion(manifestData);
      assert.strictEqual(currentVersion, expectedVersion);
    });

    it('should return "0.0.1" if the manifest data is missing the version', () => {
      const manifestData = {};
      const expectedVersion = '0.0.1';
      const currentVersion = versionManager.readCurrentVersion(manifestData);
      assert.strictEqual(currentVersion, expectedVersion);
    });
  });

  describe('#incrementVersion()', () => {
    it('should increment the major version number', () => {
      const currentVersion = '1.2.3';
      const expectedVersion = '2.0.0';
      const newVersion = versionManager.incrementVersion(currentVersion, "major");
      assert.strictEqual(newVersion, expectedVersion);
    });

    it('should increment the minor version number', () => {
      const currentVersion = '1.2.3';
      const expectedVersion = '1.3.0';
      const newVersion = versionManager.incrementVersion(currentVersion, "minor");
      assert.strictEqual(newVersion, expectedVersion);
    });

    it('should increment the patch version number', () => {
      const currentVersion = '1.2.3';
      const expectedVersion = '1.2.4';
      const newVersion = versionManager.incrementVersion(currentVersion, "patch");
      assert.strictEqual(newVersion, expectedVersion);
    });
  }
  );

  describe('#readAndWriteManifest()', () => {
    it('should read the manifest data from the manifest file and write the new version to the manifest data', () => {
      const manifestFile = './test/webapp/manifest.json';
      const manifestData = versionManager.readManifest(manifestFile);
      //assert that file exists
      assert.ok(manifestData);
    });
  } 
  );





});