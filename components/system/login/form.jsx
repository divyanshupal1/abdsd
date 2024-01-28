/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { Eye} from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";

export function TabsDemo() {

  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  function SignMeIN(){
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:username, password:password ,type:type}),
      }).then((res) => res.json()).then((data)=>{
        if(data.success) {
          router.push("/")
        }
        else{ 
          alert("Invalid Credentials")
        }
      })
  }

  return (

        <Card className="w-[450px] -mt-10">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-4">
              <Label htmlFor="name">Username or Email</Label>
              <Input id="name" name="username" placeholder="Username" className="py-5 bg-primary-foreground" value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
            <div className="space-y-4 relative">
              {showPassword?
                <Eye className="absolute bottom-2 right-2 cursor-pointer" onClick={()=>setShowPassword(!showPassword)} onMouseLeave={()=>setShowPassword(!showPassword)}/>:
                <EyeClosedIcon className="absolute bottom-3 right-3 cursor-pointer" onClick={()=>setShowPassword(!showPassword)}/>
              }
              <Label htmlFor="username">Password</Label>
              <Input id="password" name="password" type={showPassword?"text":"password"} className="py-5 bg-primary-foreground" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="space-y-4">
              <Label htmlFor="username">Who are you ?</Label>
                <ToggleGroupDemo setVal={setType}/>
            </div>
          </CardContent>
          <CardFooter className="gap-x-4">
            <Button className="w-1/2 ml-auto" onClick={SignMeIN}>Login</Button>
            <Forgot current={type}/>
          </CardFooter>
        </Card>
  )
}

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupDemo({setVal}) {
  return (
    <ToggleGroup type="single" variant="outline" className="gap-x-4" onValueChange={(val)=>setVal(val)}>
      <ToggleGroupItem value="student" className="w-1/2" >
        Student
      </ToggleGroupItem>
      <ToggleGroupItem value="teacher" className="w-1/2">
        Teacher
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Forgot({current}) {
  return (
    <AlertDialog>
    <AlertDialogTrigger className="w-1/2">Forgot Password</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Contact {current=='student' ? "your teacher or ERP":"ERP"}</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction>OK</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  )
}
