"use client";

import { Bug, PersonStanding, Speaker } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import Feedback from "./feedback";
import Report from "./report";
export default function QuickAccess() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="fixed bottom-4 right-10"
        >
          <PersonStanding className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-52 p-4">
        <DropdownMenuLabel className="text-xs text-muted-foreground mb-2">
          Quick Access
        </DropdownMenuLabel>
        <div className="w-full flex flex-col gap-2">
          <Feedback isSrOnly={false} />
          <Report isSrOnly={false} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
