import {LogToken} from './util/log';
import {IPreprocessor, Preprocessor, PreprocessorToken} from './preprocessor';
import {ICompiler, CompilerToken, CommandLineCompiler} from './compiler';
import {IPathResolver, PathResolverToken, NodePathResolver} from './path-resolver';
import {IFileReader, FileReaderToken, NodeFileReader} from './file-reader';
import {INodeExecutor, NodeExecutor, NodeExecutorToken} from './node-executor';
import {INodeExecutorWithArguments, NodeExecutorWithArguments, NodeExecutorWithArgumentsToken} from './node-executor-with-arguments';
import {ICommandLineArgumentsFormatter, CommandLineArgumentsFormatter, CommandLineArgumentsFormatterToken} from './command-line-arguments-formatter';
import {StepPipeline} from './pipeline/facade';
import {CompileStep, FileReadStep, IPreprocessorStep, CompileStepToken, FileReadStepToken} from './pipeline/steps/facade';

class GlobalToken {}
class DefaultCompilerOptionsToken {}
class PreprocessStepToken {}

var defaultCompilerOptions = {
  outDir: 'built',
  module: 'amd',
  sourceMap: true,
  sourceRoot: 'built',
  // project: '.'
};

export function configureContainerBuilder(cb: Typeioc.IContainerBuilder): void {
  cb.register<IGlobal>(GlobalToken)
    .as(() => global);
  
  cb.register(DefaultCompilerOptionsToken)
    .as(() => defaultCompilerOptions);
  
  cb.register<IPreprocessorStep>(PreprocessStepToken)
    .as((c) => new StepPipeline([
      c.resolve(CompileStepToken),
      c.resolve(FileReadStepToken)
    ]));
    
  cb.register<IPreprocessorStep>(CompileStepToken)
    .as((c) => new CompileStep(
      c.resolve(CompilerToken)
    ));

  cb.register<IPreprocessorStep>(FileReadStepToken)
    .as((c) => new FileReadStep(
      c.resolve(FileReaderToken),
      c.resolve(PathResolverToken)
    ));
  
  cb.register<IPreprocessor>(PreprocessorToken)
    .as((c) => new Preprocessor(
        c.resolve(PreprocessStepToken),
        c.resolve(DefaultCompilerOptionsToken)
    ));
    
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