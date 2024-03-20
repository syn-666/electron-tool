const { app, BrowserWindow, clipboard, Notification, ipcMain } = require("electron")
const path = require('path')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 414,
    height: 896,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
    },
  })
  win.loadFile('./index.html')

  ipcMain.handle('toFront', (e,check) => {
    win.setAlwaysOnTop(check)
  })
  // win.webContents.openDevTools({activate: false})
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// ipcMain.handle('copy', () => {
//   const notification = new Notification({body: '复制成功!'})
//   notification.show()

// })



// const { clipboard } = require("electron")


