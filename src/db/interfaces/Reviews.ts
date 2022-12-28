export interface QueryParams {
    id_name?: string,
    id_type?: string,
    original_table_id?: string
}

export type ReviewTables = "Author" | "Instructor" | "Workshop" | "Books";



export function getQueryParams(reviewedItemTable: ReviewTables): QueryParams {
    let params: QueryParams = {};

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



export interface IReviews {
    member_name: string,
    comment: string,
    rating: number,
    review_time: string
}