'use strict';

import Realm from 'realm'

export default class HighlightsModel extends Realm.Object {}
    HighlightsModel.schema = {
    name: 'HighlightsModel',
    properties: {
        languageName:'string',
        versionCode:'string',
        bookId:'string',
        chapterNumber:'int',
        verseNumber:'string'
    }
}