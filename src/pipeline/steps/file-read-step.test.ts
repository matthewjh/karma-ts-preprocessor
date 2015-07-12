import * as nodeunit from 'nodeunit';
import {FileReadStep, IPreprocessorInput, IPreprocessorOutput} from './facade';
import {IPathResolver, getMockPathResolver} from '../../path-resolver';

import {IFileReader, getMockFileReader} from '../../file-reader';

var fileReadStep: FileReadStep;
var mockFileReader: IFileReader;
var mockPathResolver: IPathResolver;
var input: IPreprocessorInput = {
  typescriptOptions: {
    outDir: 'build'
  },
  filePath: '/folder/src/my-file.ts'
};  
var output: IPreprocessorOutput = {};
var error = new Error();

export = {
  setUp: function (done: nodeunit.ICallbackFunction) {
    mockFileReader = getMockFileReader();
    mockPathResolver = getMockPathResolver();
    fileReadStep = new FileReadStep(mockFileReader, mockPathResolver);
    
    // Set up mock paths junk
    mockPathResolver.getRelativePath.withArgs('./', input.typescriptOptions.outDir).returns(`./build`);
    mockPathResolver.getRelativePath.withArgs('./src', input.filePath).returns('./my-file.ts');
    mockPathResolver.getJoinedPath.withArgs(`./build`, './my-file.ts').returns('build/my-file.ts');
    mockPathResolver.getAbsolutePath.withArgs('./', 'build/my-file.ts').returns('/folder/build/my-file.ts');
    
    done();
  },
  
  'execute': {
    'it should read the file from the correct filepath': function(test: nodeunit.Test) {
      var filePath = "/folder/build/my-file.js";
      mockFileReader.readFile.returns(Promise.resolve(''));
      
      fileReadStep.execute(input, output);
      
      test.ok(mockFileReader.readFile.withArgs(filePath).called);
      test.done();
    },
    
    'when the file reader promise is resolved with the file contents': {
      setUp: function(done: nodeunit.ICallbackFunction) {
        mockFileReader.readFile.returns(Promise.resolve('file-contents'));
        done();
      },
      
      'it should resolve the returned promise with the correct output': function(test: nodeunit.Test) {
         fileReadStep.execute(input, output).then((output) => {
          test.equal(output.fileContents, 'file-contents');
          test.done();
         });
      }
    },
    
    'when the file reader promise is rejected': {
      setUp: function(done: nodeunit.ICallbackFunction) {
        mockFileReader.readFile.returns(Promise.reject(error));
        done();
      },
      
      'it should reject the returned promise with the error': function(test: nodeunit.Test) {
        fileReadStep.execute(input, output).catch((rejectionError) => {
          test.equal(rejectionError, error);
          test.done();
        });
      }
    }
  }
}