import * as del from 'del';
import {IPreprocessorInput, IPreprocessorOutput, IPreprocessorStep} from './facade';

export class OutputDirectoryDeleteStepToken {}

export class OutputDirectoryDeleteStep implements IPreprocessorStep {
 
  execute(input: IPreprocessorInput, output: IPreprocessorOutput): Promise<IPreprocessorOutput> {
    return new Promise((resolve, reject) => {
      del([input.typescriptOptions.outDir], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(output);
        }
      })
    });
  }
}
 