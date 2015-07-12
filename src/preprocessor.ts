import {getMockObjectGetter} from './util/test';
import {IPathResolver} from './path-resolver';
import {IFileReader} from './file-reader';
import {ICompiler} from './compiler';
import {ILog} from './util/log';

export interface IPreprocessor {
	processFile(content: string, file: Ktsp.Internal.IFile, compilerOptions?: any): Promise<IPreprocessorResult>;
}

export interface IPreprocessorResult {
  outputPath: string;
  output: string;
}

export class Preprocessor implements IPreprocessor {
  private _log: ILog;
  private _pathResolver: IPathResolver;
  private _fileReader: IFileReader;
  private _compiler: ICompiler;
  private _defaultCompilerOptions: any;
  
  constructor(log: ILog,
              pathResolver: IPathResolver,
              fileReader: IFileReader,
				      compiler: ICompiler,
              defaultCompilerOptions: any = {}) {
    this._log = log;
    this._pathResolver = pathResolver;
    this._fileReader = fileReader;
    this._compiler = compiler;
    this._defaultCompilerOptions = defaultCompilerOptions;
  }

  processFile(content: string, 
              file: Ktsp.Internal.IFile, 
              compilerOptions: any = {}): Promise<IPreprocessorResult> { 
    var options = this._mergeWithDefaultOptions(compilerOptions);
    
    this._log.info(`preprocessing: ${file} ---\n ${content}`);

    return this._compiler.compile(file.path, options).then((logs) => {
      var preprocessedFilePath = this._getPreprocessedFilePath(file.path, options.outDir);
      this._log.warn(preprocessedFilePath);
      logs.forEach((log) => {
        this._log.info(log);
      });
      
      return this._fileReader.readFile(preprocessedFilePath).then((fileContents) => {
        return {
          outputPath: preprocessedFilePath,
          output: fileContents
        };
      });
    }, (error) => {
      this._log.error(error);
      
      return Promise.reject(error);
    });
  }
  
  private _getPreprocessedFilePath(originalFilePath: string, outputDirectoryPath: string) {
    var relativePathToOutputDirectory = this._pathResolver.getRelativePath('./', outputDirectoryPath);
    var relativePathToOriginalFilePath = this._pathResolver.getRelativePath('./src', originalFilePath);
    var relativePreprocessedFilePath = this._pathResolver.getJoinedPath(relativePathToOutputDirectory, relativePathToOriginalFilePath);
    var absolutePreprocessedFilePath = this._pathResolver.getAbsolutePath('./', relativePreprocessedFilePath)
                                            .replace(/\.ts$/, '.js');

    
    return absolutePreprocessedFilePath;
  }
  
  private _mergeWithDefaultOptions(customOptions: any): any {
     var options = {};
     
     Object.keys(this._defaultCompilerOptions).forEach((k) => {
       options[k] = this._defaultCompilerOptions[k];
     });
     
     Object.keys(customOptions).forEach((k) => {
       options[k] = customOptions[k];
     });
     
     return options;
  }
}

export var getMockPreprocessor = getMockObjectGetter<IPreprocessor>(Preprocessor);