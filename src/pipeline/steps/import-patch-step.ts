import {IPreprocessorInput, IPreprocessorOutput, IPreprocessorStep} from './facade';

export class ImportPatchStepToken {}

export class ImportPatchStep implements IPreprocessorStep {
 
  execute(input: IPreprocessorInput, output: IPreprocessorOutput): Promise<IPreprocessorOutput> {
    var fileContents = output.fileContents;
    var buildDirectoryPath = input.typescriptOptions.outDir;
    
    fileContents = 
      fileContents.split('\n')
        .map((line) => {
          if (line.indexOf('require') !== -1 || line.indexOf('define') !== -1) {
            return line.replace(/("|')(\.\/.*?)("|')/gi, '$1$2.ts$3');
          } else {
            return line;
          }
        })
        .join('\n');
    
    output.fileContents = fileContents;
    
    return Promise.resolve(output);
  }
}
 