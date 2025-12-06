module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    // 1. Clone the repository
    {
      method: "shell.run",
      params: {
        message: "git clone https://github.com/tencent-ailab/SongGeneration.git app"
      }
    },
    // 2. Install PyTorch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app"
        }
      }
    },
    // 3. Install Python dependencies
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt",
          "uv pip install -r requirements_nodeps.txt --no-deps",
          "uv pip install fastapi uvicorn python-multipart aiofiles"
        ]
      }
    },
    // 4. Download runtime models (ckpt + third_party)
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "huggingface-cli download lglg666/SongGeneration-Runtime --local-dir runtime"
      }
    },
    // 5. Create junction links for ckpt and third_party
    {
      method: "fs.link",
      params: {
        src: "app/runtime/ckpt",
        dest: "app/ckpt"
      }
    },
    {
      method: "fs.link",
      params: {
        src: "app/runtime/third_party",
        dest: "app/third_party"
      }
    },
    // 6. Download base model (~24GB)
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "huggingface-cli download lglg666/SongGeneration-base --local-dir songgeneration_base"
      }
    },
    // 7. Download base-new model
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "huggingface-cli download lglg666/SongGeneration-base-new --local-dir songgeneration_base_new"
      }
    },
    // 8. Download base-full model
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: "huggingface-cli download lglg666/SongGeneration-base-full --local-dir songgeneration_base_full"
      }
    },
    // 9. Copy API file
    {
      method: "fs.copy",
      params: {
        src: "api.py",
        dest: "app/api.py"
      }
    },
    // 10. Create web/static directory and copy files
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
