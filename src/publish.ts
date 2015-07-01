/// <reference path="../node_modules/typeioc/d.ts/typeioc.d.ts"/>

import typeiocModule = require('typeioc');
import preprocessorModule = require('./preprocessor');
import publisherModule = require('./publisher');
import diModule = require('./di');

// TypeScript only allows you to export types, so here we export an object directly via module.exports
declare var module: any;

var cb = typeiocModule.createBuilder();
diModule.configureContainerBuilder(cb);


module.exports = {
	'preprocessor:typescript': publisherModule.getPreprocessorFactory(cb, preprocessorModule.Preprocessor)
};