call npm run build
rmdir /S /Q ..\backend7\build\
xcopy /S /I build ..\backend7\build
pause
