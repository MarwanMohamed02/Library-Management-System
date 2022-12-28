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
exports.getEvents = void 0;
const connect_1 = require("../connect");
function getEvents(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const todaysDate = new Date(Date.now());
        let query = `   SELECT

                            System_Users.firstname      as author_firstname, 
                            System_Users.lastname       as author_lastname, 
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
        query += `   ORDER BY event_date; `;
        const { rows } = yield connect_1.db.query(query);
        let events = [];
        rows.forEach(event => {
            event.event_date = new Date(event.event_date).toLocaleDateString();
            events.push(event);
        });
        return events;
    });
}
exports.getEvents = getEvents;
