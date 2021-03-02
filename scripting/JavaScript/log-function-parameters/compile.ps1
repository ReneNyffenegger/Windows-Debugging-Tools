cl   /nologo /Zi /c /W4 /wd4100 /GS- prog.c
link /nologo /debug /nodefaultlib prog.obj /entry:run /subsystem:console user32.lib kernel32.lib /out:prog.exe
