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
      method: "shell.run",
      params: {
        message: "{{platform === 'win32' ? 'xcopy /E /I /Y web app\\\\web' : 'cp -r web app/'}}"
      }
    }
  ]
}
