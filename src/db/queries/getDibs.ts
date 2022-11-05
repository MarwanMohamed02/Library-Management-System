

export function getDibs(username: any, book_name: any): string {
    let sql = `SELECT 
                    BIN_TO_UUID(Members.id) as member_id,
                    Members.username as username,
                    Reservations.book_id as book_id,
                    Books.book_name as book_name,
                    FROM_UNIXTIME(Reservations.reservation_date) as reservation_date
                FROM Reservations
                INNER JOIN Members ON Reservations.member_id = Members.id
                INNER JOIN Books ON Books.isbn = Reservations.book_id `
    
    const filters = [username, book_name];
    const filterNames = ["username", "book_name"];

    for (let i = 0; i < filters.length; i++) 
        if (filters[i])
            sql += sql.includes("WHERE") ? `AND ${filterNames[i]} = "${filters[i]}" ` : `WHERE ${filterNames[i]} = "${filters[i]}" `;
    
    sql += "; ";

    // console.log(sql);

    return sql;

}