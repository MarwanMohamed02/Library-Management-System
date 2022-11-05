

export function borrow(isbn: string, uuid: string): string {
    return "INSERT INTO Borrows(book_id, member_id, borrow_date_u)"
        +  `VALUES ("${isbn}","${uuid}", ${new Date().getTime() / 1000.000});`;
}