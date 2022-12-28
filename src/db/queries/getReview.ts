
import { db } from "../connect";
import { ReviewTables, getQueryParams, IReviews } from "../interfaces/Reviews"


export async function getReviews(member_id: string, reviewed_item_id: string, reviewedItemTable: ReviewTables): Promise<IReviews[]> {

    const { id_name, id_type } = getQueryParams(reviewedItemTable);

    const sql = `  SELECT 
                            firstname, lastname,
                            comment, rating, review_timestamp
                    
                    FROM    ${reviewedItemTable}_Review
                    
                    JOIN    System_Users    ON      id::UUID = '${member_id}'
                    
                    WHERE   ${id_name}= '${reviewed_item_id}'${id_type} `
    
    console.log(sql)
    
    const { rows } = await db.query(sql);

    let reviews:IReviews[] = []
    rows.forEach(rvw => {
        const { firstname, lastname, comment, rating, review_timestamp } = rvw
        let review: IReviews = {
            member_name: firstname + " " + lastname,
            comment,
            rating,
            review_time: new Date(review_timestamp).toLocaleDateString()
        }
        reviews.push(review);
    })


    console.log(reviews);

    return reviews
}