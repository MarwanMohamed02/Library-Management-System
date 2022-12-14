"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookData = void 0;
const Book_1 = require("../interfaces/Book");
function updateBookData(updatedBookData, type) {
    let { isbn, avg_rating, ratings_count } = updatedBookData;
    let quantity, price;
    if (type === Book_1.BookType.LIBRARY_BOOK) {
        const { borrow_quantity } = updatedBookData;
        quantity = borrow_quantity;
    }
    else {
        const { selling_quantity, price: p } = updatedBookData;
        quantity = selling_quantity;
        price = p;
    }
    console.log(quantity);
    let sql = "";
    if (avg_rating || ratings_count) {
        const updates = [avg_rating, ratings_count];
        const updatesNames = ["avg_rating", "ratings_count"];
        sql += `UPDATE Books \nSET `;
        for (let i = 0; i < updates.length; i++) {
            if (updates[i])
                sql += `${updatesNames[i]} = ${updates[i]}, `;
        }
        sql = sql.substring(0, sql.length - 2);
        sql += ` WHERE isbn = '${isbn}'; `;
    }
    if (quantity !== undefined || price) {
        const [qty, refTable] = type == Book_1.BookType.LIBRARY_BOOK ? ["borrow_quantity", "Library_Books"] : ["selling_quantity", "Bookstore_Books"];
        sql += `\n  UPDATE  ${refTable} \nSET `;
        sql += quantity !== undefined ? ` ${qty} = ${quantity},` : "";
        sql += price ? ` price = ${price},` : "";
        sql = sql.substring(0, sql.length - 1);
        sql += `\n  WHERE   isbn = '${isbn}'; `;
    }
    console.log(sql);
    return sql;
}
exports.updateBookData = updateBookData;
