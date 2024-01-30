import jwt from "jsonwebtoken";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 } from "uuid";


export async function GET(request,{params}) {
    const {id} = params;
    console.log(id);
    const sectionDocs = await getDocs(
        query(
          collection(db, `Section`),
          where("classIDs", "array-contains", id)
        )
    );
    console.log(sectionDocs.size);
    return new Promise((resolve, reject) => {
        const sections = [];
        let index = 0;
        sectionDocs.forEach((sectionDoc) => {
            const section = sectionDoc.data();
            sections.push({
                ...section,
                id: sectionDoc.id                
            });
            console.log(index);
            if(sectionDocs.size - 1 === index){
                resolve(new Response(JSON.stringify({success:true,data:sections}), {
                    status: 200,
                }));
            }
            index++;
        });
        
    });

}