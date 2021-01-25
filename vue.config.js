module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,

      builderOptions: {
        appId: "com.electron.tasktimer",
        publish: [
          {
            provider: "github",
            vPrefixedTagName: true
          }
        ],
        afterSign: process.env.NOTARIZE === "true" ? "build/notarize.js" : null
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
