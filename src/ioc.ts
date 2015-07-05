/// <reference path="../node_modules/typeioc/d.ts/typeioc.d.ts"/>
/// <reference path="../definitions/ktsp.internal.d.ts"/>

import preprocessorModule = require('./preprocessor');
import compilerModule = require('./compiler');
import logModule = require('./util/log');
import nodeExecutorModule = require('./node-executor');
import commandLineArgumentsFormatterModule = require('./command-line-arguments-formatter');

export function configureContainerBuilder(cb: Typeioc.IContainerBuilder): void {
  cb.register<Ktsp.Internal.IPreprocessor>(preprocessorModule.Preprocessor)
    .as((c) => {
      return new preprocessorModule.Preprocessor(
        c.resolve(logModule.LogToken),
        c.resolve(compilerModule.CompilerToken)
       );
    });

  cb.register<compilerModule.ICompiler>(compilerModule.CompilerToken)
    .as((c) => {
      return new compilerModule.CommandLineCompiler(
        c.resolve(nodeExecutorModule.NodeExecutorToken)
      );
    });

  cb.register<Ktsp.Internal.INodeExecutor>(nodeExecutorModule.NodeExecutorToken)
    .as(() => new nodeExecutorModule.NodeExecutor());

  cb.register<commandLineArgumentsFormatterModule.ICommandLineArgumentsFormatter>(commandLineArgumentsFormatterModule.CommandLineArgumentsFormatterToken)
    .as(() => new commandLineArgumentsFormatterModule.CommandLineArgumentsFormatter());
}