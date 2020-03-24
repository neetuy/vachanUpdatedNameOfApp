
'use strict';

import Realm from 'realm'

export default class BookmarksListModel extends Realm.Object {}
BookmarksListModel.schema = {
    name: 'BookmarksListModel',
    properties: {
        bookId:'string',
        chapterNumber:'int',
        versionCode:'string',
        languageName:'string'
    }
};