"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryParams = void 0;
function getQueryParams(reviewedItemTable) {
    let params = {};
    switch (reviewedItemTable) {
        case 'Author':
            params = { id_name: "Author_ID", id_type: "::UUID::BYTES", original_table_id: "id" };
            break;
        case 'Instructor':
            params = { id_name: "Instructor_ID", id_type: "::UUID::BYTES", original_table_id: "id" };
            break;
        case 'Workshop':
            params = { id_name: "Workshop_Title", id_type: "", original_table_id: "Workshop_Title" };
            break;
        case 'Books':
            params = { id_name: "Book_ISBN", id_type: "", original_table_id: "isbn" };
            break;
    }
    return params;
}
exports.getQueryParams = getQueryParams;
