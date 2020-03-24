'use strict';

import Realm from 'realm';
import LanguageModel from '../models/LanguageModel';
import VersionModel from '../models/VersionModel';
import BookModel from '../models/BookModel';
import NoteModel from '../models/NoteModel';
import ChapterModel from '../models/ChapterModel';
import VerseModel from '../models/VerseModel';
import NoteStylingModel from '../models/NoteStylingModel';
import VerseStylingModel from '../models/VerseStylingModel';
import ReferenceModel from '../models/ReferenceModel';
import BookmarksListModel from '../models/BookmarksListModel';
import HighlightsModel from '../models/HighlightsModel';
import HistoryModel from '../models/HistoryModel';
import VerseMetadataModel from '../models/VerseMetadataModel';


import {
	Platform,
} from 'react-native';
import { lang } from 'moment';
import { constColors } from './colors';
var RNFS = require('react-native-fs');

class DbHelper {

    async getRealm() {
    	try {
    		return await Realm.open({
				schemaVersion: 30,
				deleteRealmIfMigrationNeeded: true, 
				path:
					Platform.OS === 'ios'
					? RNFS.MainBundlePath + '/vachanApp.realm'
					: RNFS.DocumentDirectoryPath + '/vachanApp.realm',
				schema: [LanguageModel, VersionModel, BookModel, ChapterModel, VerseModel, NoteModel, NoteStylingModel,VerseStylingModel, ReferenceModel, HistoryModel,BookmarksListModel,HighlightsModel,VerseMetadataModel] });
				// console.log('create db:', db.path)
			} catch (err) {
			console.log("error in getItem"+err)
    		return null;
    	}
    }

    async query(model: string, filter?: string, sort?: string, desc?: bool) {
		
		let realm = await this.getRealm();
    	if(realm) {
			let results = realm.objects(model);
		    if(filter) {
		        results = results.filtered(filter);
			}
			if(sort) {
			return results = results.sorted(sort,desc);
			}
			return results;
		}
		return null;
	}

    async queryVersionWithCode(verCode: string, langCode: string) {
		let realm = await this.getRealm();
    	if (realm) {
			// let result = realm.objectForPrimaryKey("LanguageModel", langCode);
			// let resultsA = result.versionModels;
			// resultsA = resultsA.filtered('versionCode ==[c] "' + verCode + '"');
			// return resultsA;
		}
		return null;
	}

	async queryBooksWithCode(verCode: string, langCode: string, bookId?: string, text?: string) {
		let realm = await this.getRealm();
    	if (realm) {
			let result = realm.objectForPrimaryKey("LanguageModel", langCode);
			if (result) {
				let resultsA = result.versionModels;
				resultsA = resultsA.filtered('versionCode ==[c] "' + verCode + '"');
				if (resultsA.length > 0) {
					let resultsB = resultsA[0].bookModels;				
					if (bookId) {
						resultsB = resultsB.filtered('bookId ==[c] "' + bookId + '"');
						return resultsB;
					}
					if (text) {
						 resultsB = resultsB.filtered('bookName CONTAINS[c] "' + text + '"').sorted("bookNumber");
						 return resultsB
						}
					return resultsB.sorted("bookNumber");
				}
				return null;
			}
			return null;
		}
		return null;
	}

	async queryInVerseText(verCode: string, langName: string, text: string) {
		let realm = await this.getRealm();
    	if (realm) {
			let result1 = realm.objects("VerseModel");
			result1 = result1.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '"');
			result1 = result1.filtered('text CONTAINS[c] "' + text + '"');
			return result1;
		}
		return null;
	}
	async queryHighlights(langName, verCode, bookId){
		let realm = await this.getRealm();
		if (realm){
			var result1 = realm.objects("HighlightsModel");
			if(bookId == null ){
				let highlightList = result1.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '"' )
				if(Object.keys(highlightList).length > 0){
					return highlightList
				}
				else{
					return null
				}
			}
			else{
				let highlight = result1.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" && bookId ==[c]   "' + bookId + '"' )
				if(Object.keys(highlight).length > 0){
					return highlight
				}
				else{
					return null
				}
			}
			
		}
				
	}
	async updateHighlightsInVerse(langName, verCode, bId, cNum, vNum, isHighlight){
		let realm = await this.getRealm()
		let  result1= realm.objects('HighlightsModel');
		let highlight = result1.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" &&  bookId == "' + bId + '" && chapterNumber == "'+cNum+'" && verseNumber == "'+vNum+'"')
		// console.log("LANG CODE "+langName+"bVER CODE "+verCode+" BID "+bId+" CNUM "+cNum+" VNUM "+vNum+" ISHIGHLIGHT "+isHighlight)
		if (realm) {
			realm.write(() => {
				if(isHighlight == true){
				if(Object.keys(highlight).length === 0){
				console.log("highlight length",Object.keys(highlight).length)
				console.log("highlight ",highlight)

					realm.create('HighlightsModel', {
						languageName: langName,
						versionCode: verCode,
						bookId: bId,
						chapterNumber: cNum,
						verseNumber: vNum
					})
				}
				}
				else{
					realm.delete(highlight); 
				}
				})
		}

		
	}

	async insert(model: string, value) {
		let realm = await this.getRealm();
		if (realm) {
	  		realm.write(() => {
				realm.create(model, value);
			});
	  	}
	}
	
	async insertNewBook(bookModel, versionModel, languageModel) {
		// console.log("bookModel "+JSON.stringify(bookModel)+ " version modal "+JSON.stringify(versionModel)+ "language modal "+JSON.stringify(languageModel))
		let realm = await this.getRealm();
		if (realm) {
            var ls = realm.objectForPrimaryKey('LanguageModel', languageModel.languageName);
            if (ls) {
                var pos = -1;
                for (var i=0; i<ls.versionModels.length; i++) {
                    var vModel = ls.versionModels[i];
                    if (vModel.versionCode == versionModel.versionCode) {
                        pos = i;
                        break;
                    }
                }
                if (pos > -1) {
                    var bModels = ls.versionModels[pos].bookModels;
                    // need to push bookmodel
                    for (var j=0; j<bModels.length; j++) {
                        if (bModels[j].bookId == bookModel.bookId) {
                            return;
                        }
                    }
                    realm.write(() => {
						ls.versionModels[pos].bookModels.push(bookModel);
						console.log("BOOK ADDED ")
                    });
                } else {
                    realm.write(() => {
						ls.versionModels.push(versionModel);
						console.log("verion model added ")    
                    });
                }
            } else {
                realm.write(() => {
					realm.create('LanguageModel', languageModel);
					console.log("langauge added")
                });
            }
	  	}
	}

	async queryBookIdModels(verCode: string, langName: string) {
		let realm = await this.getRealm();
    	if (realm) {
			let result = realm.objectForPrimaryKey("LanguageModel", langName);
			let resultsA = result.versionModels;
			resultsA = resultsA.filtered('versionCode == [c] "' + verCode + '"');
			if (resultsA.length > 0) {
				let resultsB = resultsA[0].bookModels.sorted("bookNumber");
				let bookIdModels = [];
				for (var i=0; i<resultsB.length; i++) {
					var bModel = {bookId:resultsB[i].bookId, bookName:resultsB[i].bookName,
						section: resultsB[i].section, bookNumber: resultsB[i].bookNumber,
						languageName: langName, versionCode: verCode, numOfChapters:resultsB[i].chapterModels.length };
						bookIdModels.push(bModel);
				}		
				return bookIdModels;
			}
			return null;
		}
		return null;
	}

	

	async updateBookmarkInBook(langName,verCode,bId,cNum, isBookmark) {
		console.log(" langName,verCode,bId,cNum, isBookmark) ",langName,verCode,bId,cNum, isBookmark)
		let realm = await this.getRealm();
		if(realm){
			realm.write(() => {
			let chapter = realm.objects('BookmarksListModel').filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" &&  bookId == "' + bId + '" && chapterNumber == "'+cNum+'"')
			console.log("book mark chappter ",chapter)
			if(isBookmark){
			console.log("do book mark chappter ",)
				if(Object.keys(chapter).length == 0){
				console.log("chaper already present ",)
					realm.create('BookmarksListModel',{
						bookId:bId,
						chapterNumber:cNum,
						versionCode:verCode,
						languageName:langName
					})
				}
			}
			else{
			// let bookmarkData = realm.objects('BookmarksListModel').filtered('chapterNumber = $0', cNum)
			realm.delete(chapter); 
			}
			})
		}

	}
	async queryBookmark(langName,verCode,bId){

		let realm = await this.getRealm()

			if (realm){
				let result1 = realm.objects("BookmarksListModel");
				if(bId == null){
					let bookmarksList = result1.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" ')
					// if(object.keys())
					if(Object.keys(bookmarksList).length > 0){
						return bookmarksList
					}
					else{
						return null
					}
				}
				else{
					let bookmarks = result1.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" && bookId =="' + bId + '"')
					if(Object.keys(bookmarks).length>0){
						return bookmarks
					}
					else{
						return null
					}
				}
			}
	}
	async queryNotes() {
		let realm = await this.getRealm();
    	if (realm) {
			let results = realm.objects('NoteModel');
			return results.sorted('modifiedTime', true);
		}
		return null;
	}

	async addOrUpdateNote(index, body, createdTime, modifiedTime, refList){
		// console.log("verse list ",refList)
		let realm = await this.getRealm();
		if (realm) {
			let results = realm.objects('NoteModel').filtered('createdTime = $0', createdTime);
			realm.write(() => {
				if (index == -1) {
					realm.create('NoteModel', {body:body, createdTime:createdTime, modifiedTime:modifiedTime, 
						references:refList})
					console.log("write.. new notes..")
				} else {
					if (results.length > 0) {
						results[0].body = body;
						results[0].modifiedTime = modifiedTime;
						results[0].references = refList;
						console.log("update.. notes..")
					}
				}
		  });
		}
	}

	async deleteNote(createdTime){
		let realm = await this.getRealm();
		console.log("delete note : " + createdTime);
		realm.write(() => {
			let allNotes = realm.objects('NoteModel').filtered('createdTime = $0', createdTime);
			console.log("len note : " + allNotes.length);
			realm.delete(allNotes); // Deletes all
		});
	}
	async notesCharStyle(charIndex,styleOption){
		let realm = await this.getRealm();
		if(realm){
			console.log("value in db help "+charIndex+ " style option "+styleOption)
		}
	}

	async addHistory(sourceId,langName,langCode, verCode, bId, cNum,downloaded, timeStamp) {
		let realm = await this.getRealm();
		if (realm) {
			realm.write(() => {
				realm.create('HistoryModel', {
					sourceId:sourceId,
					languageName: langName,
					languageCode:langCode,
					versionCode: verCode,
					bookId: bId,
					chapterNumber: cNum,
					downloaded:JSON.parse(downloaded),
					time: timeStamp
				})
				console.log("write.. history complete..")
		  });
		}
	}

	async queryHistory() {
		let realm = await this.getRealm();
    	if (realm) {
			let results = realm.objects('HistoryModel')
			return results.sorted('time');
		}
		return null
	}

	async clearHistory() {
		let realm = await this.getRealm();
		realm.write(() => {
			let historyData = realm.objects('HistoryModel')
			realm.delete(historyData); 
		});
	}

    async deleteLanguage(langCode,verCode){
		let realm = await this.getRealm();
		realm.write(() => {
			let result = realm.objectForPrimaryKey("LanguageModel", langCode)
			let resultsA = result.versionModels
			let resultsB = resultsA.filtered('versionCode ==[c] "' + verCode + '"')
			realm.delete(resultsB)
			if (resultsA.length == 0) {
				realm.delete(result)
			}
		})
	}

	async addLangaugeList(languages){
		let realm = await this.getRealm()
			
		if(realm){
			for(var i=0; i<languages.length; i++){
				realm.write(() => {
					console.log("langauge added")
					realm.create('LanguageModel', languages[i])
				})
			}
		}
	}
	
	async getLangaugeList(){
		let realm = await this.getRealm();
		if(realm){
		let result = realm.objects('LanguageModel');
		if(Object.keys(result).length > 0){
		console.log("result language list found")
			return result
		}
		else{
		console.log("result language list not found")
			return null
		}
		}
	}
	// async updateLanguageList(langCode,verCode,bookList){
	// 	let realm = await this.getRealm()
	// 	if(realm){
	// 	let result = realm.objectForPrimaryKey("LanguageModel", langCode)
	// 	if(Object.keys(result).length>0){
	// 		let resultsA = result.versionModels;
	// 		let resultB = resultsA.filtered('versionCode == "'+verCode+'" ')
	// 		console.log("version code from db ",resultB[0].downloaded,resultB[0].sourceId)
	// 		realm.write(() => {
	// 			if (Object.keys(resultB).length > 0) {
	// 				if(resultB[0].downloaded === true){
	// 				}
	// 				else{
	// 					resultB[0].downloaded = true
	// 					resultB[0].bookNameList = bookList
	// 				}
				
	// 			}
	// 		});
	// 	}
	// 	}
	// }
	//get all available booklist
	async getDownloadedBook(langName,verCode){
		console.log("languaeg name ",langName,"version code ",verCode)
		let realm = await this.getRealm();
		console.log("realm ",realm)
		if(realm){
			console.log("realm  inside")
					let result = realm.objectForPrimaryKey("LanguageModel", langName);
					let resultsA = result.versionModels;
					let resultB = resultsA.filtered('versionCode == "'+verCode+'" ');
					return resultB[0].bookNameList
		}
	}
	//download version
	
	async addNewVersion(langName,verCode,bookmodel,sourceId,bookListData){
		// langName,verCode,bookmodel,sourceId
      console.log("add new version ",langName,verCode,sourceId)

		let realm = await this.getRealm();
		if(realm){
			let result = realm.objectForPrimaryKey("LanguageModel",langName)
			let resultsA = result.versionModels
			var resultsB = resultsA.filtered('sourceId  =="' + sourceId + '"')

			var resultBoook = realm.objects('BookModel').filtered('languageName ==[c] "' + langName +'" ')
			console.log("resultBoook  ",resultBoook)
			if(bookmodel.length == 0){
				alert("no data to add")
			}
			else{
				console.log("resultBoook ",bookmodel.length)
			var bookIdList =[]
			
			if(Object.keys(resultBoook).length == 0){
				// direct adding data to db 
				realm.write(() => {
						for(var i=0;i<bookmodel.length;i++){
						realm.create('BookModel', bookmodel[i])
						bookIdList.push(bookmodel[i].bookId)
						}
					resultsB[0].bookNameList = bookIdList
					resultsB[0].downloaded = true;
				})
			}
			else{
			var found = false;
			for(var i=0;i<resultBoook.length;i++){
				console.log("book is version Code  " ,resultBoook[i].languageName)
				if(resultBoook[i].versionCode == verCode){
					console.log("VERSION ALREADY ADDED")
					found = true
				}
			}
			if(found==false){
				console.log("add version ")
					realm.write(() => {
						for(var i=0;i<bookmodel.length;i++){
						realm.create('BookModel', bookmodel[i].bookId)
					}
					resultsB[0].bookNameList = bookmodel[i].bookId
					resultsA[0].downloaded = true;
					})
					
			}
		}
	}
	}
	}
	//query  chapter
	async queryVersions(langName,verCode,bookId){
		console.log("query version ",langName,verCode,bookId)
		let realm = await this.getRealm()
		
		if(realm){
			let result = realm.objects('BookModel')
			let data = result.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" && bookId =="' + bookId + '"' )
			// let resultsA = result.chapters[0]
			if(Object.keys(data).length > 0){
				console.log('downloaded book found ',Object.keys(data).length)
				return data
			}
			else{
				return null
			}
		}
	}
	async queryTextForNote(langName,verCode,bookId,chapterNumber,verseNumber){
		console.log("query version ",langName,verCode,bookId,chapterNumber,verseNumber)
		let realm = await this.getRealm()
		
		if(realm){
			let result = realm.objects('BookModel')
			let data = result.filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" && bookId =="' + bookId + '"' )[0]
			let verse = data.chapters.filtered('chapterNumber =="' +chapterNumber+'"')[0]

			if(Object.keys(verse).length > 0){
				let val = verse.verses[verseNumber-1].text
				return val
			}
			else{
				return null
			}
		}
	}
	//query book
	// async queryBook(langName,verCode,bookId){
	// 	console.log("query version ",langName,verCode,bookId)
	// 	let realm = await this.getRealm()
	// 	if(realm){
	// 	var book = realm.objects('BookModel').filtered('languageName ==[c] "' + langName + '" && versionCode ==[c] "' + verCode + '" && bookId ==   "' + bookId + '"' )
	// 	if(book){
	// 		console.log(book," book from db ")
	// 	}
	// 	else{
	// 		console.log(" sorry no data present")

	// 	}
	// 	}
	// }
}

export default new DbHelper();