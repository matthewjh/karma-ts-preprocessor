/// <reference path="../node_modules/typeioc/d.ts/typeioc.d.ts"/>
/// <reference path="../definitions/node.d.ts"/>

import typeiocModule = require('typeioc');
import preprocessorModule = require('./preprocessor');
import publisherModule = require('./publisher');
import iocModule = require('./ioc');

var cb = typeiocModule.createBuilder();
iocModule.configureContainerBuilder(cb);

export = {
  'preprocessor:typescript': publisherModule.getPreprocessorFactory(cb, preprocessorModule.Preprocessor)
};