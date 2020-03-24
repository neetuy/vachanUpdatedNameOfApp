import {getBookNameFromMapping,getBookNumberFromMapping} from './UtilFunctions';


export const AsyncStorageConstants = {
    Keys: {
        ColorMode : 'color_mode',
        SizeMode: 'size_mode',
        VerseViewMode:'verse_view_mode',
        LastReadReference:'last_read_reference',
        LanguageCode:'language_code',
        VersionCode:'version_code',
        LanguageName:'language_name',
        VersionName:'version_name',
        BookId:'book_id',
        BookName:'book_name',
        BackupRestoreEmail:'backup_restore_email',
        ChapterNumber:"chapter_number",
        BookNumber:"book_number",
        SourceId:"source_id",
        Downloaded:"downloaded",
        TotalChapters:'total_chapters',
        TotalVerses:'total_verses',
        VerseNumber:'verseNumber',
        FontFamily:"font_family"
    },
    Values: {
        DayMode: 1,
        NightMode: 0,

        SizeModeXSmall: 0,
        SizeModeSmall: 1,
        SizeModeNormal: 2,
        SizeModeLarge: 3,
        SizeModeXLarge: 4,

        VerseInLine:false,
        FontFamily:{
        english:"NotoSans-Regular ",
        kannada:"NotoSansKannadaUI-Regular",
        hindi:" NotoSansDevanagariUI-Regular",
        tamil:"NotoSansTamilUI-Regular",
        telugu:"NotoSansTeluguUI-Regular",
        marathi:"NotoSansDevanagariUI-Regular",
        punjabi:"NotoSansGurmukhiUI-Regular",
        assamese:"NotoSansBengaliUI-Regular",
        bengali:"NotoSansBengaliUI-Regular",
        urdu:"NotoNastaliqUrdu-Regular",
        odiya:"NotoSansOriyaUI-Regular",
        gujarati:"NotoSansGujaratiUI-Regular",
        malayalam:"NotoSansMalayalamUI-Regular"

        },
        LastReadReference: {
            languageCode:'Hindi',
            versionCode:'IRV',
            bookId:'1JN',
            chapterNumber:1,
        },

        DefLanguageCode:'hin',
        DefLanguageName:'Hindi',
        DefVersionCode:'IRV',
        DefVersionName:'Indian Revised Version',
        DefBookId:"3jn",
        DefBookName:getBookNameFromMapping("3jn","Hindi"),
        DefBookChapter:1,
        DefBookNumber:getBookNumberFromMapping("3jn"),
        DefSourceId:45,
        DefDownloaded:false
       
    }
}



