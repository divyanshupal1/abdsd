import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

 

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login'

  const token = request.cookies.get('token')?.value || ''
  console.log("token", token)
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  const decoded =  jwt.decode(token, process.env.NEXTAUTH_SECRET, {expiresIn: "1d"})
  const role = decoded?.role || ''


  if(path=="/" && role) {
    return NextResponse.redirect(new URL(`/${role}`, request.nextUrl))
  }
  if(path.split("/")[1] !== role) {
    request.cookies.set("token", '', {
        expiresIn: -1
    })
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/teacher/:path*',
    '/student/:path*',
    '/verifyemail'
  ]
}