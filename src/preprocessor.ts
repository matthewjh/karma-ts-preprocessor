import {IPreprocessorStep, IPreprocessorInput, IPreprocessorOutput} from './pipeline/steps/facade';

export interface IPreprocessor {
  preprocessFile(content: string, file: Ktsp.Internal.IFile, compilerOptions?: any): Promise<string>;
}

export class PreprocessorToken {}

export class Preprocessor implements IPreprocessor {
  private _preprocessorStep: IPreprocessorStep;
  private _typescriptOptions: any; 
  
  constructor(preprocessorStep: IPreprocessorStep, typescriptOptions: any) {
    this._preprocessorStep = preprocessorStep;
    this._typescriptOptions = typescriptOptions;
  }
  
  preprocessFile(content: string, file: Ktsp.Internal.IFile, compilerOptions?: any): Promise<string> {
    var input = this._getStepInput(file.path, this._typescriptOptions);
    var output = this._getInitialStepOutput();
    
    return this._preprocessorStep.execute(input, output).then((output) => {
      return output.fileContents;
    });
  }
  
  private _getStepInput(filePath: string, compilerOptions: any): IPreprocessorInput {
    return {
      filePath: filePath,
      typescriptOptions: compilerOptions
    };
  }
  
  private _getInitialStepOutput(): IPreprocessorOutput {
    return {};
  }
}