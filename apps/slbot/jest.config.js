module.exports = {
  name: "slbot",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/slbot/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
