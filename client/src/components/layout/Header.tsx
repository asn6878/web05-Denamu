import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";

import RssRegistrationModal from "@/components/RssRegistration/RssRegistrationModal";
import { Chat } from "@/components/chat/Chat";
import SideBar from "@/components/layout/Sidebar";
import SearchButton from "@/components/search/SearchButton";
import SearchModal from "@/components/search/SearchModal";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { useKeyboardShortcut } from "@/hooks/common/useKeyboardShortcut";

import logo from "@/assets/logo-denamu-main.svg";

export default function Header() {
  const [modals, setModals] = useState({ search: false, rss: false, login: false });

  const toggleModal = (modalType: "search" | "rss" | "login") => {
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));
  };

  useKeyboardShortcut("k", () => toggleModal("search"), true);

  return (
    <div className="border-b border-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <img className="h-14 w-auto cursor-pointer" src={logo} alt="Logo" onClick={() => location.reload()} />
          </div>
          <DesktopNavigation toggleModal={toggleModal} />
          <MobileNavigation toggleModal={toggleModal} />
        </div>
      </div>
      <AnimatePresence>
        {modals.rss && <RssRegistrationModal onClose={() => toggleModal("rss")} rssOpen={modals.rss} />}
        {modals.search && <SearchModal onClose={() => toggleModal("search")} />}
      </AnimatePresence>
    </div>
  );
}

function DesktopNavigation({ toggleModal }: { toggleModal: (modalType: "search" | "rss" | "login") => void }) {
  return (
    <div className="hidden md:flex md:items-center">
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <div className="flex h-full items-center">
              <Chat />
            </div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <div className="flex h-full items-center">
              <SearchButton handleSearchModal={() => toggleModal("search")} />
            </div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} hover:text-primary hover:bg-primary/10`}
              onClick={() => toggleModal("login")}
              href="#"
            >
              로그인
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant="default" onClick={() => toggleModal("rss")} className="bg-primary hover:bg-primary/90">
              블로그 등록
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function MobileNavigation({ toggleModal }: { toggleModal: (modalType: "search" | "rss" | "login") => void }) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="hover:border-primary hover:text-primary">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-primary">메뉴</SheetTitle>
          </SheetHeader>
          <SideBar
            handleRssModal={() => toggleModal("rss")}
            handleSearchModal={() => toggleModal("search")}
            handleLoginModal={() => toggleModal("login")}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
