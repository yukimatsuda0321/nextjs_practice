import Link from "next/link"
import {Button} from "@/components/ui/button"

import {
NavigationMenu,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from "../ui/input"
import SearchBox from "../post/SearchBox"

export default function PublicHeader() {
    return(
        <div>
        <header className="border-b shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/" passHref>
                            <div className="font-bold text-xl">歩行評価アプリ（練習）</div>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4">
                    <SearchBox />
                    <Button variant="outline" asChild>
                        <Link href="/login">ログイン</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">登録</Link>
                    </Button>
                </div>
            </div>
        </header>
        </div>
    )
}