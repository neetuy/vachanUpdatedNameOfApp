// info such as our server URL
export const UserEmail = "email";
export const UserToken = "token";

module.exports = {
    BASE_URL: 'http://someurl.com',
    MarkerConstants: {
        MARKER_BOOK_NAME : "\\id",
        MARKER_CHAPTER_NUMBER : "\\c",
        MARKER_VERSE_NUMBER : "\\v",
        MARKER_NEW_PARAGRAPH : "\\p",
        MARKER_SECTION_HEADING : "\\s",
        MARKER_SECTION_HEADING_ONE : "\\s1",
        MARKER_SECTION_HEADING_TWO : "\\s2",
        MARKER_SECTION_HEADING_THREE : "\\s3",
        MARKER_SECTION_HEADING_FOUR : "\\s4",
        MARKER_CHUNK : "\\s5",
        MARKER_FOOT_NOTES_OPEN :'\\f',
        MARKER_FOOT_NOTES_CLOSE :'\\f*',
        MARKER_FOOT_NOTES_QUOTATION : '\\fq',
        MARKER_FOOT_NOTES_TEXT : '\\ft',
        MARKER_ITALIC_CLOSE : '\\it',
        MARKER_ITALIC_OPEN : '\\it**',
    },
    StylingConstants: {
        SPLIT_SPACE : "\\s+",
        NEW_LINE : "\n",
        NEW_LINE_WITH_TAB_SPACE : "\n    ",
        MARKER_Q : "\\q",
        REGEX_NOT_NUMBERS : "[^0-9]",
        REGEX_NUMBERS : "[0-9]",
        TAB_SPACE : "    ",
        REGEX_ESCAPE : "\\",
        CHAR_COLON : ":",
        FOOT_NOTE : "+",
        OPEN_FOOT_NOTE : "(",
        CLOSE_FOOT_NOTE : ")"
    },
    MarkerTypes: {
        SECTION_HEADING : "s",        
        SECTION_HEADING_ONE : "s1",
        SECTION_HEADING_TWO : "s2",
        SECTION_HEADING_THREE : "s3",
        SECTION_HEADING_FOUR : "s4",
        CHUNK : "s5",
        PARAGRAPH : "p",
        VERSE : "v",
        MARKER_FOOT_NOTES_TEXT:'ft',
        MARKER_FOOT_NOTES_QUOTATION:'fq'
    }
};