require("dotenv").config();
const { notarize } = require("electron-notarize");

const appleId = process.env.APPLE_ID;
const appleIdPassword = process.env.PASSWORD;

exports.default = async context => {
  if (process.platform !== "darwin") return;

  const appName = context.packager.appInfo.productFilename;
  const appDir = context.appOutDir;

  return await notarize({
    appBundleId: "com.electron.tasktimer",
    appPath: `${appDir}/${appName}.app`,
    appleId,
    appleIdPassword
  });
};
