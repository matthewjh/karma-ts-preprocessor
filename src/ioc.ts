import * as typeioc from 'typeioc';
import {TypeScriptPreprocessor} from 'typescript-preprocessor';
import {IPreprocessor} from 'preprocessor';
import {ICompiler, CompilerToken, CommandLineCompiler} from 'compiler';
import {LogToken} from 'util/log';

export function configureContainerBuilder(cb: typeioc.IContainerBuilder): void {
	cb.register<IPreprocessor>(TypeScriptPreprocessor)
		.as((c) => {
			return new TypeScriptPreprocessor(
				c.resolve(LogToken),
				c.resolve(CompilerToken)
			);
		});

	cb.register<ICompiler>(CompilerToken)
		.as(() => new CommandLineCompiler());
}