import { db } from "../connect";





export async function getEvents(uuid?: string) {
    const todaysDate = new Date(Date.now());

        let query = `   SELECT

                            System_Users.firstname, 
                            System_Users.lastname, 
                            System_Users.email          as author_email,                      
                            author.avg_rating           as author_avg_rating, 
                            author.reviews_count        as author_reviews_count, 
                            Signing_Events.event_date   as event_date, 
                            start_time                  as event_start_time, 
                            end_time                    as event_end_time 

                        FROM Signing_Events 
                        JOIN Slots          ON  Signing_Events.event_slot = slot_name
                        JOIN Author         ON  author_id = author.id
                        JOIN System_Users   ON  author_id = System_Users.id`;
        
    query += uuid ? `   JOIN Attends ON  (Signing_Events.event_date = Attends.event_date AND Signing_Events.event_slot = Attends.event_slot AND Signing_Events.author_id = Attends.author_id)
                        WHERE member_id::UUID = '${uuid}' `
        :
                    `   WHERE      Signing_Events.event_date > '${todaysDate.toLocaleDateString()}'
                        OR          (Signing_Events.event_date >= '${todaysDate.toLocaleDateString()}' AND start_time::TIME >= '${todaysDate.toLocaleTimeString()}'::TIME) `;
        

                    
    query +=        `   ORDER BY event_date; `;
    
    const { rows: events } = await db.query(query);

    events.forEach(event => {
        event.event_date = new Date(event.event_date).toLocaleDateString();
    })

    return events;
}