const { app, shell } = require("electron");
const { isOSX } = require("./util");

module.exports = function(mainWindow, options) {
  const gamepadMappingMenu = [
    {
      label: "Standard",
      type: "radio",
      checked: true
    },
    {
      label: "GameCube",
      type: "radio"
    }
  ];

  const menu = [
    {
      label: "File",
      submenu: [
        {
          label: "Open ROM...",
          accelerator: "CmdOrCtrl+O",
          click: options.openROMDialog.show
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          role: "reload"
        },
        {
          type: "separator"
        },
        {
          role: "toggledevtools"
        }
      ]
    },
    {
      label: "Gamepads",
      submenu: [
        {
          label: "Mapping",
          submenu: gamepadMappingMenu
        }
      ]
    }
  ];

  if (isOSX()) {
    menu.unshift({
      label: app.getName(),
      submenu: [
        {
          label: "About",
          click() {
            shell.openExternal("https://github.com/ardean/jsGBC");
          }
        },
        {
          label: "View License",
          click() {
            shell.openExternal(
              "https://github.com/ardean/jsGBC/blob/master/LICENSE"
            );
          }
        },
        {
          type: "separator"
        },
        {
          label: "Relaunch",
          accelerator: "Alt+CmdOrCtrl+R",
          click() {
            app.relaunch();
            app.exit(0);
          }
        },
        {
          role: "quit"
        }
      ]
    });
  }

  return menu;
};