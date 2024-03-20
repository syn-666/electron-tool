const radio = document.getElementById('front')
radio.addEventListener('change', async (e) => {
  await window.frontWindow.toFront(radio.checked)
})