const { app, globalShortcut, BrowserWindow } = require('electron');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL('http://localhost:3000');
}

// let lastClipboardText = '';

// setInterval(() => {
//   const currentClipboardText = clipboard.readText();
//   if (currentClipboardText !== lastClipboardText) {
//     console.log('New copied text:', currentClipboardText);
//     win.webContents.send('clipboard-changed', currentClipboardText);
//     lastClipboardText = currentClipboardText;
//   }
// }, 1000);

app.whenReady().then(createWindow);

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
