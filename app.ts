import {app,BrowserWindow} from 'electron';
import path from 'path';
import WalletGen from "./wallet-gen";


function createWindow(){
    const win = new BrowserWindow({
        width:600,
        height:480,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    });
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });

//var generator = new WalletGen();
//generator.autoGen();