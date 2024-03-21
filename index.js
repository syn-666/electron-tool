const {
  app,
  BrowserWindow,
  clipboard,
  Notification,
  ipcMain,
  screen,
} = require("electron")
const path = require("path")
const { getAppBoundsInfo } = require("./main")
let timer = null


const createWindow = () => {
  const { windowWidth, windowHeight, newX, newY } = getAppBoundsInfo()
  const win = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: newX,
    y: newY,
    transparent: false,
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
    },
  })
  win.loadFile("./index.html")

  ipcMain.handle("toFront", (e, check) => {
    win.setAlwaysOnTop(check)
  })
  ipcMain.handle("toCollapse", (e, check) => {
    win.setContentSize(414, check ? 34 : 896, true)
  })
  ipcMain.handle("follow", (e, check) => {
    if(check) {
      timer = setInterval(() => {
        const {newX, newY} = getAppBoundsInfo()
        win.setPosition(newX, newY)
      }, 50);
    } else{
      if(timer){
        clearInterval(timer)
        timer = null
      }
    }
  })

  

}

app.whenReady().then(() => {
  createWindow()
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
  if (timer) clearInterval(timer)
})

const isDev = !app.isPackaged
if (isDev) {
  require("electron-reload")(".")
}
