module.exports = {
  name: 'slbot-features',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/slbot/features',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
