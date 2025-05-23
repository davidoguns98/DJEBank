"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="ham menu "
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link href="/" className="  cursor-pointer items-center gap-1 px-4">
            <Image
              src="/icons/djelogo.jfif"
              className="size-[24px] max-xl:size-14 rounded-full"
              alt="logo"
              width={34}
              height={34}
            />
            <h1 className=" text-26 font-ibm-plex-serif font-bold text-black-1">
              DJE Bank
            </h1>
            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                  {sidebarLinks.map((link, index) => {
                    const isActive =
                      pathname === link.route ||
                      pathname.startsWith(`${link.route}/`);

                    return (
                      <SheetClose asChild key={link.route}>
                        <Link
                          href={link.route}
                          key={index}
                          className={cn("mobilenav-sheet_close w-full", {
                            "bg-bankGradient": isActive,
                          })}
                        >
                          {
                            <Image
                              src={link.imgURL}
                              width={20}
                              height={20}
                              alt={link.label}
                              className={cn({
                                "brightness-[3] invert-0": isActive,
                              })}
                            />
                          }

                          <p
                            className={cn(
                              "text-16 font-semibold text-black-2",
                              {
                                "!text-white": isActive,
                              }
                            )}
                          >
                            {link.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  User
                </nav>
              </SheetClose>
              <Footer user={user} type="mobile" />
            </div>
          </Link>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
