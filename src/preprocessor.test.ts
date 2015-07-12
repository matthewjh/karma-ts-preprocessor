// import * as nodeunit from 'nodeunit';
// import * as sinon from 'sinon';
// import {IPreprocessor, Preprocessor} from './preprocessor';
// import {ICompiler, getMockCompiler} from './compiler';
// import {IPathResolver, getMockPathResolver} from './path-resolver';
// import {IFileReader, getMockFileReader} from './file-reader';
// import {ILog, getLogMock} from './util/log';

// var preprocessor: IPreprocessor;
// var mockCompiler: ICompiler;
// var mockLog: ILog;
// var mockPathResolver: IPathResolver;
// var mockFileReader: IFileReader;

// var compilerCompilePromise: Promise<string[]>;
// var logs: string[] = ['log1', 'log2'];
// var file: Ktsp.Internal.IFile;
// var contents: string;
// var defaultCompilerOptions: any;

// export = {
//   setUp: function(done: nodeunit.ICallbackFunction) {
//     mockLog = getLogMock();
//     mockCompiler = getMockCompiler();
//     mockPathResolver = getMockPathResolver();
//     mockFileReader = getMockFileReader();
  
//     file = {
//       path: 'some-file-path'
//     };
    
//     defaultCompilerOptions = {
//       defaultOption: 'some-option-value'
//     };
  
//     contents = 'some-contents';
  
//     preprocessor = new Preprocessor(
//       mockLog,
//       mockPathResolver,
//       mockFileReader,
//       mockCompiler,
//       defaultCompilerOptions
//     );
  
//     done();
//   },
  
//   'processFile': {
//     'when the compiler.compile promise is resolved': {
//       setUp: function(done: nodeunit.ICallbackFunction) {
//         compilerCompilePromise = Promise.resolve(logs);
//         done();
//       },
      
//       'it should pass default options to the compiler when no custom options are passed': function(test: nodeunit.Test) {
//         mockCompiler.compile.withArgs(file.path, defaultCompilerOptions).returns(compilerCompilePromise);
        
//         preprocessor.processFile(contents, file).then(() => {
//           test.done();
//         });
//       },
      
//       'it should pass augmented default options to the compiler when custom options are passed': function(test: nodeunit.Test) {
//         var customOptions = {
//           customOption: 'some-option-value'
//         };
        
//         var expectedOptions = {
//           customOption: 'some-option-value',
//           defaultOption: 'some-option-value'
//         };
        
//         mockCompiler.compile.withArgs(file.path, expectedOptions).returns(compilerCompilePromise);
        
//         preprocessor.processFile(contents, file, customOptions).then(() => {
//           test.done();
//         });
//       },
      
//       'it should resolve the returned promise and log the results': function(test: nodeunit.Test) {
//         mockCompiler.compile.withArgs(file.path).returns(compilerCompilePromise);
      
//         preprocessor.processFile(contents, file).then(() => {
//           test.ok(mockLog.info.withArgs(logs[0]).called);
//           test.ok(mockLog.info.withArgs(logs[1]).called);
//           test.done();
//         });
//       }, 
//     },
    
//     'when the compiler.compile promise is rejected, it should log the error': function(test: nodeunit.Test) {
//       var error: any = {};
    
//       compilerCompilePromise = Promise.reject(error);
//       mockCompiler.compile.withArgs(file.path).returns(compilerCompilePromise);
    
//       preprocessor.processFile(contents, file).catch((actualError) => {
//         test.ok(mockLog.error.withArgs(error).called);
//         test.equal(error, actualError);
//         test.done();
//       });
//     }
//   }
// };