const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow;
let tray = null;

function createWindow() {
  // Splash screen
  const splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false
  });
  splash.loadFile(path.join(__dirname, 'splash.html'));

  // Main window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false, // show after ready
    backgroundColor: '#1e1b4b',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // When ready, close splash & show
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });

  // Tray icon & menu
  tray = new Tray(path.join(__dirname, 'build/icon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setToolTip('My Music Player');
  tray.setContextMenu(contextMenu);

  // Auto-updater (only in prod)
  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  // Handle close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App ready
app.whenReady().then(createWindow);

// macOS: reopen window when clicking dock icon
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Quit when all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
