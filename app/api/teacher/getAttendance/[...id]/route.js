import { doc,getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request,{params}) {
    const {id} = params;
    const section = id[0]
    const classID = id[1]
    // console.log(id);
    const sectionDocs = await getDoc(doc(db, "Section", section, "attendance", classID));
    const data = sectionDocs.data();
    return new Response(JSON.stringify({success:true,data}), {
        status: 200,
    });
}