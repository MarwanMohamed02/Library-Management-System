import { getDigitalCode } from "node-verification-code"



export function callDibs(isbn: string, uuid: string): string {
    return `INSERT INTO Reservations(book_id, member_id, verification_code, reservation_date)
            VALUES ("${isbn}",UUID_TO_BIN("${uuid}"), ${getDigitalCode(3).join("")}, ${new Date().getTime() / 1000.000});`;
}