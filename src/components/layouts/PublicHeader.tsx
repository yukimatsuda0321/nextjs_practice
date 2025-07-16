import Link from "next/link"
import { Button } from "@/components/ui/button"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from "../ui/input"
import SearchBox from "../post/SearchBox"

export default function PublicHeader() {
    return (
        <>
            <header className="border-b shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" passHref>
                                    <div className="font-bold text-2xl">歩行評価システム</div>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-4 items-strech">
                        <AccountCircleIcon className="h-full w-auto" />
                        <div className="font-bold text-xl">Dr. 松田</div>
                    </div>
                </div>
            </header>
        </>
    )
}