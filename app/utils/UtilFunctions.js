import id_name_map from '../assets/mappings.json'
const Constants = require('./constants')



export function getBookNameFromMapping(id,language) {
        var obj = id_name_map.id_name_map;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var bookId =  id.toUpperCase()
                if (key == bookId) {
                    var val = obj[key];
                    var matchedValue = ''
                    for(var key2 in val.book_name){
                        var lang =  language.toLowerCase()
                        if(lang == key2){
                            matchedValue = val.book_name[key2]
                        }
                    }
                    if(matchedValue !== ''){
                        return matchedValue
                    }
                    else{
                        return val.book_name['english']
                    }
                }
            }
        }
        return null;
  }
  

export function getBookNumberFromMapping(id) {
    var obj = id_name_map.id_name_map;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var bookId =  id.toUpperCase()

            if (key == bookId) {
                var val = obj[key];
                return val.number;
            }
        }
    }
    return null;
}

export function getBookChaptersFromMapping(id){
    var obj = id_name_map.id_name_map;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            // console.log("bookid in get Book Chapters From Mapping ",id)
            var bookId =  id.toUpperCase()
            if (key == bookId) {
                var val = obj[key];
                return val.total_chapters.length;
            }
        }
    }
    return null;
}
export function getBookNumOfVersesFromMapping(id,chapterNumber){
    var obj = id_name_map.id_name_map;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            // console.log("bookid in get Book Chapters From Mapping ",id)
            var bookId =  id.toUpperCase()
            if (key == bookId) {
                var val = obj[key];
                return val.total_chapters[chapterNumber-1]
            }
        }
    }
    return null;
}

export function getBookSectionFromMapping(id) {
    var obj = id_name_map.id_name_map;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
        var bookId =  id.toUpperCase()
            if (key == bookId) {
                var val = obj[key];
                return val.section;
            }
        }
    }
    return null;
}

export function getResultText(text) {
    if (text == null) {
        return "";
    }
    var initString = text;
    var temp = initString.split(' ');
    var footNote = false;
    var tempRes = [];
    for (var i=0; i<temp.length; i++) {
      switch (temp[i]) {
        case Constants.MarkerConstants.MARKER_NEW_PARAGRAPH: {
          tempRes.push("\n");
          break;
        }
        case Constants.StylingConstants.MARKER_Q: {
          tempRes.push("\n    ");
          break;
        }
        default: {
          if (temp[i].startsWith(Constants.StylingConstants.MARKER_Q)) {
            var str = temp[i];
            var intString = str.replace(/[^0-9]/g, "");
            var number = intString == "" ? 1 : intString;
            tempRes.push("\n");
            for (var o = 0; o < parseInt(number, 10); o++) {
                tempRes.push(Constants.StylingConstants.TAB_SPACE);
            }
          } else if (temp[i].startsWith(Constants.StylingConstants.REGEX_ESCAPE)) {
              break;
          } else if (temp[i].startsWith(Constants.StylingConstants.FOOT_NOTE)) {
              footNote = true;
              tempRes.push(Constants.StylingConstants.OPEN_FOOT_NOTE);
          } else if (temp[i] == ("\\b")) {
            break;
          } else {
            tempRes.push(temp[i] + " ");
          }
          break;
        }
      }
    }
    if (footNote) {
      tempRes.push(Constants.StylingConstants.CLOSE_FOOT_NOTE+" ");
    }
    return tempRes.join("");
}