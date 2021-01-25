# DevNotes

- Setting up an environmental variable for the Github Token.
  ```shell
  export GH_TOKEN="githubtoken123"
  ```

## Electron

- Use `productName` in `package.json` to set app name
- App icon(s) go in the `build` directory. I believe this is an
  `electron-builder` thing.
- Icon can be PNG. The icon should be transparent.  
  s
- The script `build/notarize.js` is what will allow the app to be downloaded by
  others and not run into Mac security issues. It's set to run via electron
  builder config in `vue.config.js`

## Checking if app is notarized correctly

```bash
spctl --assess ~/Desktop/timer-app.app
```

## TODO

- [ ] electron-store
- [ ] Using ipcHandle & ipcInvoke
- [ ] Vuetify pulling in fonts that I need to copy strategy for Nuxt/Nuxtify
- [ ] The easy setting in `BrowserWindow` config to get frameless-looking window
      with it being one.
