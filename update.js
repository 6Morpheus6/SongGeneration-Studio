module.exports = {
  run: [
    // Update the launcher scripts
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    // Update the SongGeneration app
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    // Re-copy custom files (api.py, web/) to app folder
    {
      method: "fs.copy",
      params: {
        src: "api.py",
        dest: "app/api.py"
      }
    },
    {
      method: "fs.mkdir",
      params: {
        path: "app/web/static"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "web/static/index.html",
        dest: "app/web/static/index.html"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "web/static/Logo_1.png",
        dest: "app/web/static/Logo_1.png"
      }
    }
  ]
}
