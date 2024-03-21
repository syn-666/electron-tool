const { clipboard, ipcRenderer } = require("electron")
const list = {}

const listenClipboardCallback = () => {
  const text = clipboard.readText('clipboard')
  const _text = text.trim()
  if(_text && Object.values(list).indexOf(_text) === -1){
    const copyTag = crypto.randomUUID()
    list[copyTag] = _text
    addCopyNode(_text, copyTag)
  }
}

const addCopyNode = (text, tag) => {
  const dom = document.getElementById('content')
  if(dom && dom.appendChild && dom.insertBefore){
    const copy = document.createElement('div')
    copy.innerText = text
    copy.classList.add('copy')
    copy.copyTag = tag
    copy.addEventListener('click', () => {
      clipboard.writeText(list[copy.copyTag])
      showDialog('复制成功!')
    })
    const children = dom.childNodes
    children.length ? dom.insertBefore(copy,children[0]) : dom.appendChild(copy)
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