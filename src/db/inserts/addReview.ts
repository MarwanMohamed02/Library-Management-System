import { db } from "../connect";

interface QueryParams {
    id_name?: string,
    id_type?: string
}

type ReviewTables = "Author" | "Instructor" | "Workshop" | "Book";



function getQueryParams(reviewedItemTable: ReviewTables): QueryParams {
    let params: QueryParams = {};

    switch (reviewedItemTable) {
        case 'Author':
            params = { id_name: "Author_ID", id_type: "::UUID::BYTES" };
            break;
        case 'Instructor':
            params = { id_name: "Instructor_ID", id_type: "::UUID::BYTES" };
            break;
        case 'Workshop':
            params = { id_name: "Workshop_Title", id_type: "" };
            break;
        case 'Book':
            params = { id_name: "Book_ISBN", id_type: "" };
            break;
        
    }

    return params;
}

export async function addReview(reviewed_item_id: string, reviewedItemTable: ReviewTables, member_id: string, comment: string | null, rating: number) {

    const {id_name, id_type} = getQueryParams(reviewedItemTable);

    let sql = ` INSERT INTO ${reviewedItemTable}_Review (Member_ID, ${id_name}, comment, rating, review_timestamp)
                VALUES  ('${member_id}'::UUID::BYTES, '${reviewed_item_id}'${id_type}, '${comment}', ${rating}, ${Date.now()}); `

    console.log(sql)
    await db.query(sql);
}