import {getMockObjectGetter} from './util/test';
import {ICompiler} from './compiler';

export interface IPreprocessor {
	processFile(content: string, file: Ktsp.Internal.IFile, compilerOptions?: any): Promise<void>;
}

export class Preprocessor implements IPreprocessor {
  private _log: Ktsp.Internal.ILog;
  private _compiler: ICompiler;
  private _defaultCompilerOptions: any;

  constructor(log: Ktsp.Internal.ILog,
				      compiler: ICompiler,
              defaultCompilerOptions: any = {}) {
    this._log = log;
    this._compiler = compiler;
    this._defaultCompilerOptions = defaultCompilerOptions;
  }

  processFile(content: string, 
              file: Ktsp.Internal.IFile, 
              compilerOptions: any = {}): Promise<void> { 
    var options = this._mergeWithDefaultOptions(compilerOptions);
    
    this._log.info(`preprocessing: ${file} ---\n ${content}`);

    return this._compiler.compile(file.path, options).then((logs) => {
      logs.forEach((log) => {
        this._log.info(log);
      });
    }, (error) => {
      this._log.error(error);

      return Promise.reject(error);
    });
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