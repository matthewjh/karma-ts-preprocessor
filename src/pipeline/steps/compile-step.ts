import {IPreprocessorInput, IPreprocessorOutput, IPreprocessorStep} from './facade';
import {ICompiler} from '../../compiler';

export class CompileStepToken {}

export class CompileStep implements IPreprocessorStep {
  private _compiler: ICompiler;
  
  constructor(compiler: ICompiler) {
    this._compiler = compiler;
  }

  execute(input: IPreprocessorInput, output: IPreprocessorOutput): Promise<IPreprocessorOutput> {
    return this._compiler.compile(input.filePath, input.typescriptOptions);
  }
}
 