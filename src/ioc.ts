import {IContainerBuilder} from 'typeioc';
import {TypeScriptPreprocessor} from 'typescript-preprocessor';
import {IPreprocessor} from 'preprocessor';
import {LogToken} from 'util/log';

export function configureContainerBuilder(cb: IContainerBuilder): void {
	cb.register<IPreprocessor>(TypeScriptPreprocessor)
		.as((c) => {
			return new TypeScriptPreprocessor(
				c.resolve(LogToken)
			);
		});
}