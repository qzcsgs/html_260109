const { app, BrowserWindow, globalShortcut } = require('electron')
const startServer = require("./server")


// const ALLOW_URL = "https://phoneeatsfirst.top"   // ← 允许访问的网址域名
const ALLOW_URL = "http://localhost:3000"   // ← 允许访问的网址域名
let inputBuffer = ""           // 键盘输入缓存
const EXIT_CODE = "exit123"    // 你的退出密码
const REFRESH_CODE = "rrrrr" // 强制刷新

async function createWindow() {
  await startServer()
  const win = new BrowserWindow({
    kiosk: true,
    frame: false,
    autoHideMenuBar: true,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  win.loadURL(ALLOW_URL)

  // ===== 1️⃣ 禁止 F12 / DevTools =====
  globalShortcut.register('F12', () => { })
  globalShortcut.register('CommandOrControl+Shift+I', () => { })
  win.webContents.on('devtools-opened', () => {
    win.webContents.closeDevTools()
  })

  // ===== 2️⃣ 禁止右键菜单 =====
  win.webContents.on('context-menu', (e) => {
    e.preventDefault()
  })

  // ===== 3️⃣ 禁止跳转其他网站 =====
  // 阻止 window.open
  win.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' }
  })

  // 阻止页面跳转
  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(ALLOW_URL)) {
      event.preventDefault()
    }
  })

  // 阻止新窗口跳转
  win.webContents.on('new-window', (event, url) => {
    if (!url.startsWith(ALLOW_URL)) {
      event.preventDefault()
    }
  })

  // ===== 4️⃣ 隐藏退出密码 =====
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown') {

      // 只记录普通字符
      if (input.key.length === 1) {
        inputBuffer += input.key.toLowerCase()

        // 限制缓存长度（防止无限增长）
        if (inputBuffer.length > EXIT_CODE.length) {
          inputBuffer = inputBuffer.slice(-EXIT_CODE.length)
        }

        // 检测密码
        if (inputBuffer === EXIT_CODE) {
          inputBuffer = ""
          win.close()
        }

        // ===== 强制刷新页面 =====
        if (inputBuffer === REFRESH_CODE) {
          inputBuffer = ""
          win.webContents.reloadIgnoringCache() // 强制刷新（不使用缓存）
        }
      }
    }
  })
}

app.whenReady().then(createWindow)