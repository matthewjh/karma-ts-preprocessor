import {createBuilder} from 'typeioc';
import {configureContainerBuilder} from './ioc';
import {Preprocessor} from './preprocessor';
import {getPreprocessorFactory} from './publisher';

var cb = createBuilder();
configureContainerBuilder(cb);

export = {
  'preprocessor:typescript': getPreprocessorFactory(cb, Preprocessor)
};