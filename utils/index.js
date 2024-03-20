const { clipboard, ipcRenderer } = require("electron")
const list = []

const listenClipboardCallback = () => {
  const text = clipboard.readText('clipboard')
  const _text = text.trim()
  if(_text && list.indexOf(_text) === -1){
    list.push(_text)
    addCopyNode(_text)
  }
}

const addCopyNode = (text) => {
  const dom = document.getElementById('content')
  if(dom && dom.appendChild){
    const copy = document.createElement('div')
    copy.innerText = text
    copy.classList.add('copy')
    copy.copyTag = list.length - 1
    copy.addEventListener('click', () => {
      clipboard.writeText(list[copy.copyTag])
      showDialog('复制成功!')
      // ipcRenderer.send('copy')
    })
    dom.appendChild(copy)
  }
}


const showDialog = (msg) => {
  const dialog = document.getElementById('mask')
  const msgNode = document.getElementById('msg')
  msgNode.innerText = msg
  dialog.style.display = 'block'
  setTimeout(() => {
    dialog.style.display = 'none'
  }, 1500);
}

module.exports = {
  listenClipboardCallback,
  showDialog,
  addCopyNode
}