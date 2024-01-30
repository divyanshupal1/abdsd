import jwt from "jsonwebtoken";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getActiveClass } from "../get_tokens/route";
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
    user = { ...user, docID: userDoc.docs[0].id };
    const activeClass = await getActiveClass(user);    
    return new Response(JSON.stringify({success:true,data:activeClass}), {
        status: 200,
    });
}