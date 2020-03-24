'use strict';

import Realm from 'realm'

export default class VersionModel extends Realm.Object {}
VersionModel.schema = {
    name: 'VersionModel',
    properties: {
		sourceId:'int',
    	versionName: 'string',
		versionCode: 'string',
    	license: 'string',
		year: 'int',
		downloaded:'bool',
		bookNameList:'string[]',
		// bookModels:'BookModel[]',
        versionOwner: {type: 'linkingObjects', objectType: 'LanguageModel', property: 'versionModels' }
    }
};

