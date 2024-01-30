import jwt from "jsonwebtoken";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";


export async function GET(request) {
  const token = request.cookies.get("token")?.value || "";
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  const decoded = jwt.decode(token, process.env.NEXTAUTH_SECRET, {
    expiresIn: "1d",
  });
  const userDoc = await getDocs(
    query(
      collection(db, `Users_${decoded.role}`),
      where("username", "==", decoded.username)
    )
  );
  var user = userDoc.docs[0].data();
  user = { ...user, docID: userDoc.docs[0].id };
  return new Response(JSON.stringify({success:true,data:user.classes}), {
    status: 200,
  });
}