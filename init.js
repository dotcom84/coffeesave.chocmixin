var CS = require('./lib/coffeesave');

Hooks.setShortcutForMenuItem("File/Save", "control-command-s");
Hooks.addMenuItem('File/(Coffee)Save', 'command-s', function() { CS.checkFileEnding(); });
