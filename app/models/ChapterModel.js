'use strict';

import Realm from 'realm'

export default class ChapterModel extends Realm.Object {}
ChapterModel.schema = {
    name: 'ChapterModel',
    properties: {
      chapterNumber: 'int',
      numberOfVerses:'int',
      // totalChapters:'int',
      verses: 'VerseModel[]',
      // chapterOwner: {type: 'linkingObjects', objectType: 'BookModel', property:'chapters' }
    }
};

