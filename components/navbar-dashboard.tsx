import { Logo } from "@/lib/icons";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from "@nextui-org/navbar";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";

export default function NavBarDashboard() {

    return (
        <NextUINavbar className="container mx-auto max-w-[1140px]" maxWidth="full" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center" href="/0191ba6b-7443-75f3-8c5c-da766df93c5e">
                        <Logo />
                        <p className="font-bold text-inherit">ANVEN AUCTION - Admin Dashboard</p>
                    </NextLink>
                    <ul className="hidden md:flex gap-4 justify-start ml-2">
                        <NavbarItem key="upload-listing">
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                                )}
                                color="foreground"
                                href="/0191ba6b-7443-75f3-8c5c-da766df93c5e/upload-listing"
                            >
                                Upload Listing
                            </NextLink>
                        </NavbarItem>
                        <NavbarItem key="upload-img">
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                                )}
                                color="foreground"
                                href="/0191ba6b-7443-75f3-8c5c-da766df93c5e/upload-img"
                            >
                                Upload Image
                            </NextLink>
                        </NavbarItem>
                    </ul>
                </NavbarBrand>
            </NavbarContent>
        </NextUINavbar>
    );
}