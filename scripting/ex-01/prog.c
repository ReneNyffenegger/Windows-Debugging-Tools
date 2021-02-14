#include <windows.h>

ULONG __stdcall tq84(void* PEB) {

   char buf[100];
   int  lenUsed = wsprintfA(buf, "Address of PEB is %p\n", PEB);

   DWORD charsWritten;

   HANDLE stdOut = GetStdHandle(STD_OUTPUT_HANDLE);
   WriteConsoleA(stdOut, buf, lenUsed, &charsWritten, NULL);

   return 0;
}
