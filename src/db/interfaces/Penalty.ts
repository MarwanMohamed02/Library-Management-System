export interface Penalty {
    type: "no pickup" | "late return",
    fee?: number
}

export interface IWarnings {
    member_id?: string,
    book_isbn?: string,
    reservation_time?: string,
    pick_up_before?: string,
    verification_code?: string
}