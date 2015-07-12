 import {IPreprocessorInput, IPreprocessorOutput, IPreprocessorStep} from './facade';
 
 export class CompileStep implements IPreprocessorStep {
   constructor() {}
   
   execute(input: IPreprocessorInput, output: IPreprocessorOutput): Promise<IPreprocessorOutput> {
     return null;
   }
 }
 