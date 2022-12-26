import { db } from "../connect";
import { IWorkshop } from "../interfaces/Workshops";


export async function getAvailableWorkshops(): Promise<IWorkshop[]> {

    const todaysDate = new Date(Date.now());

    const query = ` SELECT 

                        workshop_title,
                        price,
                        workshop.avg_rating             as avg_rating,
                        workshop.reviews_count          as reviews_count,
                        org_name                        as sponsor,
                        instructor_id,
                        firstname                       as instructor_firstname,
                        lastname                        as instructor_lastname,
                        System_Users.email              as instructor_email,
                        HELD_ON.workshop_date           as workshop_date,
                        start_time                      as workshop_start_time,
                        end_time                        as workshop_end_time
                        
                    FROM HELD_ON
                    JOIN Workshop       ON  workshop_title = workshop_name
                    JOIN Slots          ON  slot_name = slot
                    JOIN Organisation   ON  sponsor_id = Organisation.id
                    JOIN Instructor     ON  instructor_id = instructor.id
                    JOIN System_Users   ON  instructor_id = System_Users.id 

                    WHERE       HELD_ON.workshop_date > '${todaysDate.toLocaleDateString()}'
                    OR          (HELD_ON.workshop_date >= '${todaysDate.toLocaleDateString()}' AND start_time::TIME >= '${todaysDate.toLocaleTimeString()}'::TIME)
                    ORDER   BY  workshop_date; `
    
    console.log(query);

    const { rows } = await db.query(query);

    let workshops: IWorkshop[] = [];

    rows.forEach(t => {
        t.workshop_date = new Date(t.workshop_date).toLocaleDateString();

        const {
            workshop_title,
            price,
            avg_rating,
            reviews_count,
            sponsor,
            instructor_firstname,
            instructor_lastname,
            instructor_email,
            workshop_date,
            workshop_start_time,
            workshop_end_time,
        } = t;

        const workshop: IWorkshop = {
            workshop_title,
            price,
            avg_rating,
            reviews_count,
            sponsor,
            instructor: `${instructor_firstname} ${instructor_lastname}`,
            instructor_email,
            workshop_date,
            workshop_start_time,
            workshop_end_time,
        }

        workshops.push(workshop)
    })

    return workshops;
}