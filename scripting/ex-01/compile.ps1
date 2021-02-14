cl   /nologo /c /W4 /GS- prog.c

link /nodefaultlib prog.obj /entry:tq84 /subsystem:console user32.lib kernel32.lib /out:prog.exe
