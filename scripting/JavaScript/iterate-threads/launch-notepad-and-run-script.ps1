start-process notepad

while($true) {
  #
  # Wait until notepad is started
  #
    $status = get-process notepad -errorAction silentlyContinue
    if (! $status) {
      start-sleep -milliSeconds 66
    }
    else {
      break
    }
}


#
#  Attach to process and run script
#  to display threads.
#
cdb -pn notepad.exe -c ".scriptrun script.js"
