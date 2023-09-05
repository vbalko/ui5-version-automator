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

  describe('#incrementMajorVersion()', () => {
    it('should increment the major version number', () => {
      const currentVersion = '1.2.3';
      const expectedVersion = '2.0.0';
      const newVersion = versionManager.incrementMajorVersion(currentVersion);
      assert.strictEqual(newVersion, expectedVersion);
    });

    it('should reset the minor and patch version numbers to 0', () => {
      const currentVersion = '1.2.3';
      const expectedVersion = '2.0.0';
      const newVersion = versionManager.incrementMajorVersion(currentVersion);
      assert.strictEqual(newVersion, expectedVersion);
    });
  });
});