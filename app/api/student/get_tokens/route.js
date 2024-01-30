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

export async function getActiveClass(user) {
  const sectionDoc = await getDoc(doc(db, `Section`, user.section.id));
  const section = sectionDoc.data();
  if (!section.students.includes(user.docID)) return false;
  const classes = section.classes;
  return new Promise((resolve, reject) => {
    classes.forEach(async (classItem, index) => {
      if (
        !(
          new Date(classItem.startsAt) <= Date.now() &&
          new Date(classItem.endAt) >= Date.now()
        )
      ) {
        resolve(classItem);
      }
      if (index === classes.length - 1) {
        resolve(false);
      }
    });
  });
}

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
  const activeClass = await getActiveClass(user);
  if (
    !user.tokens &&
    activeClass &&
    new Date(user.tokens.lastUpdated).getDate() == new Date().getDate() &&
    user.tokens.class.id === activeClass.id
  ) {
    return new Response(
      JSON.stringify({ message: "tokens already generated", success: false }),
      {
        status: 200,
      }
    );
  }

  const tokens = {
    value: [v4(), v4(), v4(), v4(), v4()],
    lastUpdated: Date.now(),
    class: activeClass,
    verified: 0,
  };

  await updateDoc(doc(db, `Users_${decoded.role}`, userDoc.docs[0].id), {
    tokens: tokens,
  });

  return new Response(JSON.stringify({ message: "successful", data: tokens,success:true }), {
    status: 200,
  });
}
