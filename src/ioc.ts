import {LogToken} from './util/log';
import {IPreprocessor, Preprocessor} from './preprocessor';
import {ICompiler, CompilerToken, CommandLineCompiler} from './compiler';
import {IPathResolver, PathResolverToken, NodePathResolver} from './path-resolver';
import {IFileReader, FileReaderToken, NodeFileReader} from './file-reader';
import {INodeExecutor, NodeExecutor, NodeExecutorToken} from './node-executor';
import {INodeExecutorWithArguments, NodeExecutorWithArguments, NodeExecutorWithArgumentsToken} from './node-executor-with-arguments';
import {ICommandLineArgumentsFormatter, CommandLineArgumentsFormatter, CommandLineArgumentsFormatterToken} from './command-line-arguments-formatter';

class GlobalToken {}
class DefaultCompilerOptionsToken {}

var defaultCompilerOptions = {
  outDir: 'built',
  module: 'amd',
  sourceMap: true
};

export function configureContainerBuilder(cb: Typeioc.IContainerBuilder): void {
  cb.register<IGlobal>(GlobalToken)
    .as(() => global);
  
  cb.register(DefaultCompilerOptionsToken)
    .as(() => defaultCompilerOptions);
  
  cb.register<IPreprocessor>(Preprocessor)
    .as((c) => {
      return new Preprocessor(
        c.resolve(LogToken),
        c.resolve(PathResolverToken),
        c.resolve(FileReaderToken),
        c.resolve(CompilerToken),
        c.resolve(DefaultCompilerOptionsToken)
       );
    });
    
  cb.register<IPathResolver>(PathResolverToken)
    .as((c) => new NodePathResolver());
    
  cb.register<IFileReader>(FileReaderToken)
    .as((c) => new NodeFileReader());

  cb.register<ICompiler>(CompilerToken)
    .as((c) => {
      return new CommandLineCompiler(
        c.resolve(NodeExecutorWithArgumentsToken)
      );
    });

  cb.register<INodeExecutor>(NodeExecutorToken)
    .as(() => new NodeExecutor());
    
  cb.register<INodeExecutorWithArguments>(NodeExecutorWithArgumentsToken)
    .as((c) => {
      return new NodeExecutorWithArguments(
        c.resolve(NodeExecutorToken),
        c.resolve(CommandLineArgumentsFormatterToken)
      );
    });

  cb.register<ICommandLineArgumentsFormatter>(CommandLineArgumentsFormatterToken)
    .as(() => new CommandLineArgumentsFormatter());
}