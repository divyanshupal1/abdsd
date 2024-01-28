import jwt from "jsonwebtoken";
import { collection, query, where, getDocs, updateDoc,doc, addDoc,getDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { v4 } from "uuid";

async function getActiveClass(section){
    const sectionDoc = await getDoc(collection(db,`Section`,section));
    const section = sectionDoc.data();
    return section
}

export async function GET(request) {
    const token = request.cookies.get('token')?.value || ''
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    const decoded =  jwt.decode(token, process.env.NEXTAUTH_SECRET, {expiresIn: "1d"})

    const userDoc = await getDocs(query(collection(db,`Users_${decoded.role}`), where("username", "==", decoded.username)));
    var user = userDoc.docs[0].data();

    const tokens = {
        value:[v4(),v4(),v4(),v4(),v4()],
        lastUpdated: Date.now(),
        classID: 1242412
    }

    await updateDoc(doc(db, `Users_${decoded.role}`, userDoc.docs[0].id), {
        tokens:tokens
    });


    return new Response(
        JSON.stringify({ message: "successful", data: tokens}),
        {
        status: 200,
        }
    );
}