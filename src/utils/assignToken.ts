// import jwt from "jsonwebtoken"
// import { db } from "../db/connect"
// import { IMember } from "../db/interfaces/Member";
// import { memberSearch } from "../db/queries/memberSearch"
// import { updateMember } from "../db/updates/updateMember";

// export async function assignToken({ username }: { username: string }) {
//     const [found] = await db.query(memberSearch({ username })) ;

//     const member = (found as IMember[])[0];

//     member.token = jwt.sign({ uuid: member.uuid as string }, process.env.JWT_SECRET as string);

//     // console.log(member);

//     await db.query(updateMember(member.uuid, member));
// }