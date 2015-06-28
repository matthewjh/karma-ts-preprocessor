import {IPreprocessor} from 'preprocessor';
import {File} from 'util/file';
import {ILog} from 'util/log';
import {ICompiler} from 'compiler';
import {Promise} from 'es6-promise';

export class TypeScriptPreprocessor implements IPreprocessor {
	constructor(private log: ILog,
				private compiler: ICompiler) {
	}

	processFile(content: string, file: File): Promise<string> {
		this.log.info(`preprocessing: ${file} ---\n ${content}`);

		return this.compiler.compile(file.path).then((logs) => {
			logs.forEach((log) => {
				this.log.info(log);
			});

			return null;
		}, (error) => {
			this.log.error(error);
		});
	}

	private handleError(error: any) {
		this.log.error(error);
	}
}