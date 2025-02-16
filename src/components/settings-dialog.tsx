"use client";

import * as React from "react";
import { ChevronRight, Settings } from "lucide-react";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import GeneralSettingsDialog from "./general-settings-dialog";
import Branding from "./branding";

const data = {
  nav: [{ name: "General", icon: Settings }],
};

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(
    "General"
  );

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          How to use the app
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup >
                <SidebarGroupContent >
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.name === selectedItem}
                          onClick={() => handleItemClick(item.name)}
                        >
                          <a
                            href="#"
                            className="flex items-center gap-2 w-full justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] c flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <Branding isSrOnly={true} />
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{selectedItem}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0 ">
              <p className="text-sm text-muted-foreground">
                *Note: This website is not affiliated with OpenAI. This is a
                personal project made by CarlosDevJs, you can see the source
                code or contribute to improve the app.
              </p>
              {selectedItem === "General" && <GeneralSettingsDialog />}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
