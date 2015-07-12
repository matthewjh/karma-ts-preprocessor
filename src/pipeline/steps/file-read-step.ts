import {IPreprocessorInput, IPreprocessorOutput, IPreprocessorStep} from './facade';
import {IFileReader} from '../../file-reader';
import {IPathResolver} from '../../path-resolver';

export class FileReadStepToken {}

export class FileReadStep implements IPreprocessorStep {
  private _fileReader: IFileReader;
  private _pathResolver: IPathResolver;
  
  constructor(fileReader: IFileReader, pathResolver: IPathResolver) {
    this._fileReader = fileReader;
    this._pathResolver = pathResolver;
  }

  execute(input: IPreprocessorInput, output: IPreprocessorOutput): Promise<IPreprocessorOutput> {
    var filePath = this._getPreprocessedFilePath(input.filePath, input.typescriptOptions.outDir);

    return this._fileReader.readFile(filePath).then((contents) => {
      output.fileContents = contents;
      
      return output;
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
}
 