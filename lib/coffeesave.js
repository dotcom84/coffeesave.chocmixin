// COMPILE COFFEESCRIPT ON SAVE
// Mixing for Chocolat.app
// 2013, Sebastian Stiffel <unacum@gmail.com>

var fs = require('fs')
var coffee = require('coffee-script')
var CS = {version: "0.6.0"}

CS.checkFileEnding = function() {
  // ONLY COMPILE .COFFEE FILES
  if (Document.current().rootScope().match(/coffee\.source/)) {
    // ONLY COMPILE SAVED FILES
    if (Document.current().path() != null) {
      CS.readFile()
    }
    else {
      Document.current().performSave()
    }
  }
  else {
    Document.current().performSave()
  }
}

CS.readFile = function() {
  // SAVE CHANGES PRIOR TO COMPILING
  Document.current().performSave()
  
  var convertDoc = Document.current().path()
  var targetFolderElems = Document.current().path().split('/')
  var targetFolder = targetFolderElems.slice(0,targetFolderElems.length-1).join('/')
  var targetFilename = targetFolder+'/'+targetFolderElems[targetFolderElems.length-1].replace(/\.coffee/g,".js")
  
  fs.readFile(convertDoc, 'utf8', function read(err, data) {
      if (err) {
          throw err
      }
      CS.processFile(data, targetFilename)
  })
}

CS.processFile = function(content, saveto) {
  // COMPILE USING COFFEE-SCRIPT
  try {
    var jsOutput = coffee.compile(content, {options: {header: ''}})
    
    fs.writeFile(saveto, jsOutput, function (err) {
      if (err) throw err
      console.log('It is saved!')
    })
  }
  catch(e) {
    // DID NOT COMPILE (OR WRITE) SUCCESSFULLY
    Alert.show('(Coffee)Save ERROR', e.message, ['OK'])
  }
}

// EXPORTS
exports.checkFileEnding = CS.checkFileEnding
