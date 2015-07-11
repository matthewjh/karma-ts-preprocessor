import {LogToken} from './util/log';
import {IPreprocessor, Preprocessor} from './preprocessor';
import {ICompiler, CompilerToken, CommandLineCompiler} from './compiler';
import {NodeExecutor, NodeExecutorToken} from './node-executor';
import {INodeExecutorWithArguments, NodeExecutorWithArguments, NodeExecutorWithArgumentsToken} from './node-executor-with-arguments';
import {ICommandLineArgumentsFormatter, CommandLineArgumentsFormatter, CommandLineArgumentsFormatterToken} from './command-line-arguments-formatter';

class DefaultCompilerOptionsToken {}

var defaultCompilerOptions = {
  outDir: 'built',
  module: 'amd',
  sourceMap: true
};

export function configureContainerBuilder(cb: Typeioc.IContainerBuilder): void {
  cb.register(DefaultCompilerOptionsToken)
    .as(() => defaultCompilerOptions);
  
  cb.register<IPreprocessor>(Preprocessor)
    .as((c) => {
      return new Preprocessor(
        c.resolve(LogToken),
        c.resolve(CompilerToken),
        c.resolve(DefaultCompilerOptionsToken)
       );
    });

  cb.register<ICompiler>(CompilerToken)
    .as((c) => {
      return new CommandLineCompiler(
        c.resolve(NodeExecutorWithArgumentsToken)
      );
    });

  cb.register<Ktsp.Internal.INodeExecutor>(NodeExecutorToken)
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