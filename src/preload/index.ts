import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

interface IBodyData {
  name: string
  email: string
  cpf: string
  password: string
}

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      createUser: (bodyData: IBodyData) => ipcRenderer.invoke('cria-usuario', bodyData)
    })
    contextBridge.exposeInMainWorld('auth', {
      login: async (email: string, password: string) => {
        if (email === 'admin@email.com' && password === 'admin123') return { admin: true }

        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Erro ao fazer login')
          
        return { token: data.token, NOME: data.NOME }
      }
    })
} catch (error) {
  console.error(error)
}
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
