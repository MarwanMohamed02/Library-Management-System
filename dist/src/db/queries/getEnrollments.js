"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnrollments = void 0;
const connect_1 = require("../connect");
function getEnrollments(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `  SELECT

                        held_on.workshop_name   as workshop_title, 
                        price, 
                        workshop.avg_rating     as avg_rating, 
                        workshop.reviews_count  as reviews_count, 
                        org_name                as sponsor,
                        System_Users.firstname  as instructor_firstname, 
                        System_Users.lastname   as instructor_lastname, 
                        System_Users.email      as instructor_email,                      
                        held_on.workshop_date   as workshop_date, 
                        start_time              as workshop_start_time, 
                        end_time                as workshop_end_time, 
                        enrollment_timestamp 

                    FROM Enrollments 
                    JOIN HELD_ON        ON  Enrollments.workshop_name = HELD_ON.workshop_name AND  Enrollments.slot = HELD_ON.slot AND Enrollments.workshop_date = HELD_ON.workshop_date
                    JOIN Workshop       ON  held_on.workshop_name = Workshop_Title
                    JOIN Slots          ON  held_on.slot = slot_name
                    JOIN Organisation   ON  sponsor_id =  Organisation.id
                    JOIN Instructor     ON  instructor_id = instructor.id
                    JOIN System_Users   ON  instructor_id = System_Users.id

                    WHERE member_id::UUID = '${uuid}' 
                    ORDER BY workshop_date; `;
        const { rows } = yield connect_1.db.query(query);
        let enrollments = [];
        rows.forEach(t => {
            let { workshop_title, price, avg_rating, reviews_count, sponsor, instructor_firstname, instructor_lastname, instructor_id, instructor_email, workshop_date, workshop_start_time, workshop_end_time, enrollment_timestamp } = t;
            const timestamp = new Date(enrollment_timestamp);
            workshop_date = new Date(workshop_date).toLocaleDateString();
            const enrollment = {
                workshop_title,
                price,
                avg_rating,
                reviews_count,
                sponsor,
                instructor: `${instructor_firstname} ${instructor_lastname}`,
                instructor_id,
                instructor_email,
                workshop_date,
                workshop_start_time,
                workshop_end_time,
                enrollment_date: timestamp.toLocaleDateString(),
                enrollment_time: timestamp.toLocaleTimeString()
            };
            enrollments.push(enrollment);
        });
        return enrollments;
    });
}
exports.getEnrollments = getEnrollments;
