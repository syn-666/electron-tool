const radio = document.getElementById('front')
const collapse = document.getElementById('collapse')
const follow = document.getElementById('follow')
radio.addEventListener('change', async (e) => {
  await window.frontWindow.toFront(radio.checked)
})
collapse.addEventListener('change', async (e) => {
  await window.frontWindow.toCollapse(collapse.checked)
})
follow.addEventListener('change', async (e) => {
  await window.frontWindow.follow(follow.checked)
})