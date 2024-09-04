
import { Logo } from "@/lib/icons";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";

export default function NavBarDashboard() {

    return (
        <NextUINavbar className="container mx-auto max-w-[1140px]" maxWidth="full" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center" href="/">
                        <Logo />
                        <p className="font-bold text-inherit">ANVEN AUCTION - Admin Dashboard</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>
        </NextUINavbar>
    );
}