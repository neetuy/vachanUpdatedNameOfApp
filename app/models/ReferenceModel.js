'use strict';

import Realm from 'realm'

export default class ReferenceModel extends Realm.Object {}
ReferenceModel.schema = {
    name: 'ReferenceModel',
    properties: {
        bookId:'string',
        bookName:'string',
        chapterNumber:'int',
        verseNumber:'string',
        verseText:'string',
        versionCode:'string',
        languageName:'string'
    }
};