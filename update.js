module.exports = {
  run: [
    // 1. Update the launcher scripts (this repo)
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    // 2. Update the upstream SongGeneration app
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    // 3. Re-sync custom files from root to app/
    // This re-applies our customizations after pulling upstream changes
    { method: "fs.copy", params: { src: "main.py", dest: "app/main.py" } },
    { method: "fs.copy", params: { src: "generation.py", dest: "app/generation.py" } },
    { method: "fs.copy", params: { src: "model_server.py", dest: "app/model_server.py" } },
    { method: "fs.copy", params: { src: "models.py", dest: "app/models.py" } },
    { method: "fs.copy", params: { src: "gpu.py", dest: "app/gpu.py" } },
    { method: "fs.copy", params: { src: "config.py", dest: "app/config.py" } },
    { method: "fs.copy", params: { src: "schemas.py", dest: "app/schemas.py" } },
    { method: "fs.copy", params: { src: "sse.py", dest: "app/sse.py" } },
    { method: "fs.copy", params: { src: "timing.py", dest: "app/timing.py" } },
    { method: "fs.copy", params: { src: "web/static/index.html", dest: "app/web/static/index.html" } },
    { method: "fs.copy", params: { src: "web/static/styles.css", dest: "app/web/static/styles.css" } },
    { method: "fs.copy", params: { src: "web/static/app.js", dest: "app/web/static/app.js" } },
    { method: "fs.copy", params: { src: "web/static/components.js", dest: "app/web/static/components.js" } },
    { method: "fs.copy", params: { src: "web/static/hooks.js", dest: "app/web/static/hooks.js" } },
    { method: "fs.copy", params: { src: "web/static/api.js", dest: "app/web/static/api.js" } },
    { method: "fs.copy", params: { src: "web/static/constants.js", dest: "app/web/static/constants.js" } },
    { method: "fs.copy", params: { src: "web/static/icons.js", dest: "app/web/static/icons.js" } },
    { method: "fs.copy", params: { src: "web/static/Logo_1.png", dest: "app/web/static/Logo_1.png" } },
    { method: "fs.copy", params: { src: "web/static/default.jpg", dest: "app/web/static/default.jpg" } },
    // 4. Re-apply flash attention fix for Windows compatibility
    { method: "fs.copy", params: { src: "patches/builders.py", dest: "app/codeclm/models/builders.py" } }
  ]
}
