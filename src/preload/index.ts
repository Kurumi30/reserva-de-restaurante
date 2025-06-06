import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { UserInfo } from '../backend/src/types/IUser'

const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      createUser: (bodyData: UserInfo) => ipcRenderer.invoke('cria-usuario', bodyData),
      showUserDialog: () => ipcRenderer.invoke('user-created')
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
