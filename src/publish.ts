import {createBuilder} from 'typeioc';
import {configureContainerBuilder} from './ioc';
import {PreprocessorToken} from './preprocessor';
import {getPreprocessorFactory} from './publisher';

var cb = createBuilder();
configureContainerBuilder(cb);

export = {
  'preprocessor:typescript': getPreprocessorFactory(cb, PreprocessorToken)
};