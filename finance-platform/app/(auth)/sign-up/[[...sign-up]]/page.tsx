import{SignUp,ClerkLoading} from "@clerk/nextjs";
import Image from "next/image";
export default function Page () {
  return (
    
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <div className="text-center space-y-4 pt-16">
      <h1 className="font-bold text-3xl text-[2E4A47]">Welcome back!</h1>
    
      <p className="text-gray-500">Log in or Create account to get back to your dashboard!</p>
      <br />
      <ClerkLoading>
        <p className="text-gray-500">Loading...</p>
      </ClerkLoading>
    <div className="flex justify-center"><SignUp path="/sign-up" ></SignUp></div>
    </div>
    <div className="h-full bg-purple-400 hidden lg:flex items-center justify-center">
      <Image src="/logo_carifi.svg" alt="Logo" width={300} height={300} className="rounded-lg shadow-lg" />
    </div>
    </div>
    
  )
}