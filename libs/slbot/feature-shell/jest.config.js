module.exports = {
  name: 'slbot-feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/slbot/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
