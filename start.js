module.exports = {
  daemon: true,
  run: [
    // Sync tracked files (api.py, web/) to app folder before starting
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
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          PYTHONPATH: "{{cwd}}/app;{{cwd}}/app/codeclm/tokenizer/Flow1dVAE",
          PYTHONUTF8: "1"
        },
        path: "app",
        message: "python api.py --host 127.0.0.1 --port {{port}}",
        on: [{
          event: "/(http:\/\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
