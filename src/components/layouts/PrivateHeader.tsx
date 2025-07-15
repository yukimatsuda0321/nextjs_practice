import Link from "next/link"

import {
NavigationMenu,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Setting from "./Setting"
import {auth} from "@/auth"

export default async function PrivateHeader(){
    const session = await auth();
    if(!session?.user?.email) throw new Error("不正なリクエストです")
    return(
        <div>
            <header className="border-b bg-blue-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <NavigationMenu>
                            <Link href="/dashboard" passHref>
                            <p className="font-bold text-xl">管理ページ</p>
                            </Link>
                    </NavigationMenu>
                    <Setting session={session}/>
                </div>   
            </header>

        </div>
    )
}