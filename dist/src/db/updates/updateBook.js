"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookData = void 0;
function updateBookData(updatedBookData) {
    const { book_name, avg_rating, quantity, ratings_count } = updatedBookData;
    const updates = [avg_rating, quantity, ratings_count];
    const updatesNames = ["avg_rating", "quantity", "ratings_count"];
    let sql = "UPDATE Books ";
    for (let i = 0; i < updates.length; i++) {
        if (updates[i]) {
            sql += sql.includes("SET") ? `${updatesNames[i]} = ${updates[i]}, ` : `SET ${updatesNames[i]} = ${updates[i]}, `;
        }
    }
    sql = sql.substring(0, sql.length - 2);
    sql += ` WHERE book_name = "${book_name}";`;
    console.log(sql);
    return sql;
}
exports.updateBookData = updateBookData;
