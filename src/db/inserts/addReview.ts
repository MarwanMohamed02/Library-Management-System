import { db } from "../connect";

interface QueryParams {
    id_name?: string,
    id_type?: string,
    original_table_id?: string
}

type ReviewTables = "Author" | "Instructor" | "Workshop" | "Books";



function getQueryParams(reviewedItemTable: ReviewTables): QueryParams {
    let params: QueryParams = {};

    switch (reviewedItemTable) {
        case 'Author':
            params = { id_name: "Author_ID", id_type: "::UUID::BYTES", original_table_id:"id" };
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

export async function addReview(reviewed_item_id: string, reviewedItemTable: ReviewTables, member_id: string, comment: string | null, rating: number) {

    const {id_name, id_type, original_table_id} = getQueryParams(reviewedItemTable);

    let sql = ` INSERT INTO ${reviewedItemTable}_Review (Member_ID, ${id_name}, comment, rating, review_timestamp)
                VALUES  ('${member_id}'::UUID::BYTES, '${reviewed_item_id}'${id_type}, '${comment}', ${rating}, ${Date.now()}); 
                
                UPDATE ${reviewedItemTable}
                SET  
                    avg_rating = (avg_rating * reviews_count::FLOAT + ${rating}::FLOAT) / (reviews_count::FLOAT + 1.0),
                    reviews_count = reviews_count + 1
                WHERE ${original_table_id} = '${reviewed_item_id}'${id_type}; `

    console.log(sql)
    await db.query(sql);
}