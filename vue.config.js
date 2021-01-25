module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,

      builderOptions: {
        appId: "com.electron.tasktimer",
        afterSign: process.env.NOTARIZE === "true" ? "build/notarize.js" : null
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
