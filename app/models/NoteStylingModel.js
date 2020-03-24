'use strict';

import Realm from 'realm'

export default class NoteStylingModel extends Realm.Object {}
NoteStylingModel.schema = {
    name: 'NoteStylingModel',
    properties: {
        characterIndex:'int',
        // format: 'int[]',
        bold: {type: 'bool', default: false},
        italics: {type: 'bool', default: false},
        underline: {type: 'bool', default: false},
    }
};