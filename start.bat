@echo off
chcp 65001 >nul
cd /d "%~dp0"
set NODE=C:\Users\35335\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe
set PNPM=C:\Users\35335\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\pnpm\bin\pnpm.cjs
echo 正在启动 CINIS 原型服务...
echo 手机与电脑连同一 Wi-Fi 后，用手机浏览器打开下面 Network 里的地址
echo.
"%NODE%" "%PNPM%" dev
pause
