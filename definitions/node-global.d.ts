/// <reference path="./node.d.ts"/>

// Abstract out references to NodeJS global

interface IGlobal extends NodeJS.Global {}

declare var global: IGlobal; 