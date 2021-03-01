"use strict"

function invokeScript() {
   host.diagnostics.debugLog('Threads');
   var proc = host.currentProcess;
   for (var thr of proc.Threads) {
      host.diagnostics.debugLog("  " + thr + "\n");
   }
}
