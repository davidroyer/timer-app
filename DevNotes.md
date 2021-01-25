# DevNotes

## Electron

- Use `productName` in `package.json` to set app name
- App icon(s) go in the `build` directory. I believe this is an
  `electron-builder` thing.

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
