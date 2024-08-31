import MobileNav from "@/components/ui/MobileNav";
import SideBar from "@/components/ui/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = { firstName: 'Nem', LastName: 'C.'}

  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}/>

        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image     
              src="/icons/logo.svg"
              height={30}
              width={30}
              alt="menu icon"
            />
            <div>
              <MobileNav user={loggedIn}/>
            </div>
          </div>
        {children}          
        </div>
    </main>
  )
}
