if (!localStorage.getItem('token')) location.href = '/login.html'

function init(): void {
  window.addEventListener('DOMContentLoaded', () => {
    versions()
  })

  // fetch("http://localhost:3000/mesas", { method: 'GET' })
  //   .then(r => r.json())
  //   .then(data => console.log(data))
  //   .catch(err => console.error('Error fetching API:', err))
}

function versions(): void {
  const versions = window.electron.process.versions
  replaceText('.electron-version', `Electron v${versions.electron}`)
  replaceText('.chrome-version', `Chromium v${versions.chrome}`)
  replaceText('.node-version', `Node v${versions.node}`)

  const ipcHandlerBtn = document.getElementById('ipcHandler')
  ipcHandlerBtn?.addEventListener('click', () => {
    window.electron.ipcRenderer.send('ping')
  })
}

function replaceText(selector: string, text: string): void {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) element.innerText = text
}

init()
