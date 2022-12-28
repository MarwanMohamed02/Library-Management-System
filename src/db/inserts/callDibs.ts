import { getDigitalCode } from "node-verification-code"
import { Socket } from "socket.io";
import { checkBookAvailability } from "../../utils/checkBookAvailability";
import { checkForPenalty } from "../../utils/checkForPenalty"
import { checkMembershipLimit } from "../../utils/checkMembershipLimit";
import { db } from "../connect";
import { BookType, IBook, ILibraryBook } from "../interfaces/Book";
import { IMember } from "../interfaces/Member";
import { createNotification } from "../interfaces/Notifications";
import { updateBookData } from "../updates/updateBook";



export async function callDibs(isbn: string, member: IMember, socket: Socket) {

    // Checks if book is available
    const book = await checkBookAvailability(isbn) as ILibraryBook;

    console.log("reserved book: " + book)

    if (!book)
        return { error: new Error("Sorry... Book is unavailable") };


    // Checks if there are any unpaid penalties related to a dibs that was not picked up
    const hasPenalty: number = await checkForPenalty(member.uuid as string, "no pickup");

    console.log("Penalties:" + hasPenalty)

    if (hasPenalty > 0)
        return { error: new Error("Please pay past penalties before calling dibs") };

    // Checks if the member has reached the limit specified by his/her membership
    const dibsTimeLimit = await checkMembershipLimit(member.uuid as string, member.membership_type)

    console.log("membership time limit: " + dibsTimeLimit)

    if (dibsTimeLimit === null)
        return { error: new Error("Dibs Limit Exceeded") };

    const currTime = Date.now();
    const verification_code = getDigitalCode(3).join("");

    let callDibsSQL = `   INSERT INTO Transactions(member_id, book_isbn, transaction_timestamp)
                            VALUES  ('${member.uuid}'::UUID::BYTES, '${isbn}', ${currTime}); 
                            
                            INSERT INTO CALL_DIBS_ON(member_id, book_isbn, CALL_DIBS_ON_Timestamp, pick_up_before, verification_code)
                            VALUES  ('${member.uuid}'::UUID::BYTES, '${isbn}', ${currTime}, ${currTime + dibsTimeLimit}, '${verification_code}'); `


    book.borrow_quantity = book.borrow_quantity ? book.borrow_quantity - 1 : book.borrow_quantity;

    const bookUpdates = {
        isbn: book.isbn,
        borrow_quantity: book.borrow_quantity
    }

    console.log("book updates: " + bookUpdates);

    callDibsSQL += updateBookData(bookUpdates, BookType.LIBRARY_BOOK);

    console.log(callDibsSQL)

    await db.query(callDibsSQL);

    const pckpTime = new Date(currTime + dibsTimeLimit);
    const data = {
        isbn: book.isbn,
        book_name: book.book_name,
        pick_up_before: pckpTime.toLocaleTimeString() + " " + pckpTime.toLocaleDateString(),
        verification_code
    }

    const confirmationNotification = await createNotification(data, "confirmation");

    socket.emit("confirmation-notification", confirmationNotification);

    return { verification_code };
}

