const { contextBridge, ipcRenderer } = require("electron");

const exposeMain = () => {
  contextBridge.exposeInMainWorld('frontWindow',{
    toFront: (check) => ipcRenderer.invoke('toFront', check),
    toCollapse: (check) => ipcRenderer.invoke('toCollapse', check),
    follow: (check) => ipcRenderer.invoke('follow', check),
  })
}

module.exports = {
  exposeMain
}