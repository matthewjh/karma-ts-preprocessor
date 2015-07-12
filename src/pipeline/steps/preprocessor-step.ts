import {IStep} from '../facade';

export interface IPreprocessorInput {
  typescriptOptions: any;
  filePath: string;
}

export interface IPreprocessorOutput {
  filePath: string;
  fileContents: string;
}

export interface IPreprocessorStep extends IStep<IPreprocessorInput, IPreprocessorOutput> {}