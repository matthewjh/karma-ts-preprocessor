/// <reference path="../node_modules/typeioc/d.ts/typeioc.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import preprocessorModule = require('./preprocessor');
import compilerModule = require('./compiler');
import logModule = require('./util/log');
import nodeExecutorModule = require('./node-executor');
import nodeExecutorWithArgumentsModule = require('./node-executor-with-arguments');
import commandLineArgumentsFormatterModule = require('./command-line-arguments-formatter');

class DefaultCompilerOptionsToken {}

var defaultCompilerOptions = {
  outDir: 'built',
  module: 'amd',
  sourceMap: true
};

export function configureContainerBuilder(cb: Typeioc.IContainerBuilder): void {
  cb.register(DefaultCompilerOptionsToken)
    .as(() => defaultCompilerOptions);
  
  cb.register<preprocessorModule.IPreprocessor>(preprocessorModule.Preprocessor)
    .as((c) => {
      return new preprocessorModule.Preprocessor(
        c.resolve(logModule.LogToken),
        c.resolve(compilerModule.CompilerToken),
        c.resolve(DefaultCompilerOptionsToken)
       );
    });

  cb.register<compilerModule.ICompiler>(compilerModule.CompilerToken)
    .as((c) => {
      return new compilerModule.CommandLineCompiler(
        c.resolve(nodeExecutorWithArgumentsModule.NodeExecutorWithArgumentsToken)
      );
    });

  cb.register<Ktsp.Internal.INodeExecutor>(nodeExecutorModule.NodeExecutorToken)
    .as(() => new nodeExecutorModule.NodeExecutor());
    
  cb.register<nodeExecutorWithArgumentsModule.INodeExecutorWithArguments>(nodeExecutorWithArgumentsModule.NodeExecutorWithArgumentsToken)
    .as((c) => {
      return new nodeExecutorWithArgumentsModule.NodeExecutorWithArguments(
        c.resolve(nodeExecutorModule.NodeExecutorToken),
        c.resolve(commandLineArgumentsFormatterModule.CommandLineArgumentsFormatterToken)
      );
    });


  cb.register<commandLineArgumentsFormatterModule.ICommandLineArgumentsFormatter>(commandLineArgumentsFormatterModule.CommandLineArgumentsFormatterToken)
    .as(() => new commandLineArgumentsFormatterModule.CommandLineArgumentsFormatter());
}