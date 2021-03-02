#include <windows.h>

HANDLE stdOut;

static void func(int number, const char* ansi_text, const wchar_t* utf16_text) {

   wchar_t        buf[200];
   wchar_t* out = buf;

   out += wsprintfW(out, L"number = %d, ansi_text = ", number);
//
// Convert ansi text to wtf16 and write directly
// to output buffer:
//
   out += MultiByteToWideChar(CP_ACP, 0, ansi_text, -1, out, 50)
       -  1; // subtract terminating zero

   out += wsprintfW(out, L", utf16_text = %-15s\n", utf16_text);

   DWORD charsWritten;
   WriteConsoleW(stdOut, buf, (DWORD) (out - buf) , &charsWritten, NULL);
}


ULONG __stdcall run(void* PEB) {

   stdOut = GetStdHandle(STD_OUTPUT_HANDLE);

   func( 7, "seven"    , L"sieben"        );
   func( 2, "two"      , L"zwei"          );
   func(42, "forty-two", L"zweiundvierzig");
   func( 5, "five"     , L"fünf"          );

   return 0;
}
