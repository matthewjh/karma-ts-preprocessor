import * as nodeunit from 'nodeunit';
import {ImportPatchStep, IPreprocessorInput, IPreprocessorOutput} from './facade';

var importPatchStep: ImportPatchStep;

var input: IPreprocessorInput = {
  typescriptOptions: {
    outDir: 'build'
  },
  filePath: '/folder/src/my-file.ts'
};  

export = {
  setUp: function (done: nodeunit.ICallbackFunction) {
    importPatchStep = new ImportPatchStep();
    
    done();
  },
  
  'execute': {
    'it should replace requirejs import paths with paths to the built files': function(test: nodeunit.Test) {
      var output: IPreprocessorOutput = {
        fileContents: `
         define(['require', 'exports', './file1', './file2', "./a/file3"], function(require, exports, f1, f2, f3) {
            console.log('./hello-world');
         })
         `.trim()
      }
      
      importPatchStep.execute(input, output).then((output) => {
        test.equal(output.fileContents, `
          define(['require', 'exports', './file1.ts', './file2.ts', "./a/file3.ts"], function(require, exports, f1, f2, f3) {
            console.log('./hello-world');
         })
        `.trim());
        
        test.done();
      });
    },
    
    'it should replace commonjs import paths with paths to the built files': function(test: nodeunit.Test) {
      var output: IPreprocessorOutput = {
        fileContents: `
          var m1 = require('./m1');
          var m2 = require('./m2');
          var m3 = require("./a/m3");
          console.log('./hello-world');
          exports.x = 5 + 3;
         `.trim()
      }
      
      importPatchStep.execute(input, output).then((output) => {
        test.equal(output.fileContents,`
          var m1 = require('./m1.ts');
          var m2 = require('./m2.ts');
          var m3 = require("./a/m3.ts");
          console.log('./hello-world');
          exports.x = 5 + 3;
         `.trim());
        
        test.done();
      });
    }
  }
}