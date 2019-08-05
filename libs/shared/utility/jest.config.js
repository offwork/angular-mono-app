module.exports = {
  name: 'shared-utility',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/utility',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
