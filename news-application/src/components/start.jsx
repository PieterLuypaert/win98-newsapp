import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";

export const StartMenu = () => {
  return (
    <Popover>
          <div className="brand-panel">Pieter Luypaert</div>
          <div className="items-panel">
            <hr className="start-separator" />
          </div>
    </Popover>
  );
};
  