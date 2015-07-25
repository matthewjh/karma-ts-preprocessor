import * as nodeunit from 'nodeunit';
import {CompileStep, IPreprocessorInput, IPreprocessorOutput} from './facade';
import {getMockCompiler, ICompiler} from '../../compiler';

var compileStep: CompileStep;
var mockCompiler: ICompiler;
var input: IPreprocessorInput = {
  typescriptOptions: {},
  filePath: 'some-file-path'
};
var output: IPreprocessorOutput = {};
var error = new Error();

export = {
  setUp: function (done: nodeunit.ICallbackFunction) {
    mockCompiler = getMockCompiler();
    compileStep = new CompileStep(mockCompiler);
    
    done();
  },
  
  'execute': {
    'it should compile the correct filepath with the correct options': function(test: nodeunit.Test) {
      mockCompiler.compile.returns(Promise.resolve([]));
      compileStep.execute(input, output);
      
      test.ok(mockCompiler.compile.withArgs(input.filePath, input.typescriptOptions).called);
      test.done();
    },
    
    'when the compile promise is resolved': {
      setUp: function(done: nodeunit.ICallbackFunction) {
        mockCompiler.compile.returns(Promise.resolve([]));
        done();
      },
      
      'it should resolve the returned promise': function(test: nodeunit.Test) {
         compileStep.execute(input, output).then(() => {
          test.done();
        });
      }
    },
    
    'when the compile promise is rejected': {
      setUp: function(done: nodeunit.ICallbackFunction) {
        mockCompiler.compile.returns(Promise.reject(error));
        done();
      },
      
      'it should reject the returned promise with the error': function(test: nodeunit.Test) {
        compileStep.execute(input, output).catch((rejectionError) => {
          test.equal(rejectionError, error);
          test.done();
        });
      }
    }
  }
}