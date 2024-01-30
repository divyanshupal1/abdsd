import jwt from "jsonwebtoken";
import { collection, query, where,arrayUnion, getDocs, updateDoc,doc} from "firebase/firestore";
import { db } from '@/lib/firebase';
import { v4 } from "uuid";


export async function POST(request) {
    const token = request.cookies.get('token')?.value || ''
    if (!token) {
      return new Response(JSON.stringify({
        message: "unauthorized",
        success: false
      }))
    }
    const decoded =  jwt.decode(token, process.env.NEXTAUTH_SECRET, {expiresIn: "1d"})
    if(!decoded){
        return new Response(
            JSON.stringify({ message: "invalid token", success:false }),
            {
            status: 200,
            }
        );
    }
    const body = await request.json();
    const userDoc = await getDocs(query(collection(db,`Users_${decoded.role}`), where("username", "==", decoded.username)));
    var user = userDoc.docs[0].data();
    user = {...user,docID:userDoc.docs[0].id}
    
    let tokens = user.tokens;
    let verify_count = tokens.verified?tokens.verified:0;
    const token_to_verify = body.token;
    

    if(tokens.value.includes(token_to_verify)){
        tokens.value = tokens.value.filter(token => token !== token_to_verify);
        tokens.verified = verify_count + 1;
        verify_count++
        if(verify_count >= 5){
            
            const date_text = new Date().toDateString();

            await updateDoc(doc(db, 'Section', user.section.id , "attendance" ,body.classId), {
                [date_text]:arrayUnion({user:user.docID,username:user.username}),
            });

            await updateDoc(doc(db, `Users_${decoded.role}`, user.docID), {
                tokens:{}
            });

            return new Response(
                JSON.stringify({ message: "all tokens verified attendance marked", success:"done" }),
                {
                status: 200,
                }
            );
        }
        else{
            await updateDoc(doc(db, `Users_${decoded.role}`, user.docID), {
                tokens:tokens
            });
        }
        return new Response(
            JSON.stringify({ message: `verified token number ${tokens.verified}`, success:true }),
            {
            status: 200,
            }
        );
    }
    else{
        return new Response(
            JSON.stringify({ message: "invalid token", success:false }),
            {
            status: 200,
            }
        );
    }


}