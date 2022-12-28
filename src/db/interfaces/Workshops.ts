

export interface IWorkshop {
    workshop_title: string,
    price: number,
    avg_rating: number,
    reviews_count: number,
    sponsor: string,
    instructor: string,
    instructor_id: string,
    instructor_email: string,
    workshop_date: string,
    workshop_start_time: string,
    workshop_end_time: string,
}


export interface IEnrollment extends IWorkshop {
    enrollment_date: string,
    enrollment_time: string
}