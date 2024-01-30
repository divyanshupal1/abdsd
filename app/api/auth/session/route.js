import jwt from "jsonwebtoken";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
export async function GET(req){
    const token = req.cookies.get('token')?.value || false;
    if(!token) {
        return new Response(JSON.stringify({success:false}), {
            status: 302,
            message:"redirect"
        });
    }
    const decoded =  jwt.decode(token, process.env.NEXTAUTH_SECRET, {expiresIn: "1d"})
    const userDoc = await getDocs(
        query(
          collection(db, `Users_${decoded.role}`),
          where("username", "==", decoded.username)
        )
    );
    var user = userDoc.docs[0].data();
    user = { username:user.username,type:decoded.role,section:user.section, docID: userDoc.docs[0].id};
    return new Response(JSON.stringify({success:true,data:user}), {
        status: 200,
    });
}