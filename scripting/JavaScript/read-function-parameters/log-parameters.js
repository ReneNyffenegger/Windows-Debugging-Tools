var ctrl;

var log_file_name = "log.out"
var text_writer;


function create_log_file () {
   var log_file    = host.namespace.Debugger.Utility.FileSystem.CreateFile      (log_file_name, 'CreateNew');
   log_file.Close();
}


function log(text) {
   log_file    = host.namespace.Debugger.Utility.FileSystem.CreateFile      (log_file_name, 'OpenExisting');
//
// This lines seems actually necessary!
//
   log_file.Position = log_file.Size;

   text_writer = host.namespace.Debugger.Utility.FileSystem.CreateTextWriter(log_file     );

   text_writer.WriteLine(text);

   log_file.Close();
}


function func_breakpoint() {

   var reg        = host.currentThread.Registers.User;

   var num        =                            reg.ecx ; // 1st parameter in rcx/ecx
   var ansi_text  = host.memory.readString    (reg.rdx); // 2nd parameter in rdx/edx
   var utf16_text = host.memory.readWideString(reg.r8 ); // 3rd parameter in r8d/r8

   log(
     'num = '          + num +
     ', ansi_text = '  + ansi_text +
     ', utf16_text = ' + utf16_text);

   if (num != 42) {
   //
   // go on if num = 42
   //
      host.namespace.Debugger.Utility.Control.ExecuteCommand("g");

   }
}

function invokeScript() {

   ctrl = host.namespace.Debugger.Utility.Control;

   create_log_file();

   log('setting breakpoint');
   ctrl.ExecuteCommand('bp  prog!func "dx @$scriptContents.func_breakpoint()"')

   log('running program');
   ctrl.ExecuteCommand('g');

   log('Num is 42. Explore your environment.');
   log('Use g to continue');

}
