import connectDB from "@/lib/db";
import { dbInstance } from "@/lib/db";
import { Student } from "@/models/auth/student.model";
import { Teacher } from "@/models/auth/teacher.model";

export async function GET(req,res){
    const connect = await connectDB();
    const db = dbInstance;
    const student = await Student.findOne({username:"student"})
    return new Response(JSON.stringify(student));
}