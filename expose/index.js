const { contextBridge, ipcRenderer } = require("electron");

const exposeMain = () => {
  contextBridge.exposeInMainWorld('frontWindow',{
    toFront: (check) => ipcRenderer.invoke('toFront', check)
  })
}

module.exports = {
  exposeMain
}