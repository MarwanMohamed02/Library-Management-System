import { db } from "../connect";
import { ReviewTables, getQueryParams } from "../interfaces/Reviews"


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