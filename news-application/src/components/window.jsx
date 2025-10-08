import "../styles/layout/window.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { forwardRef, useState, useRef } from "react";
import Draggable from "react-draggable";

export const Window = forwardRef(
  ({ title, trigger, children, isOpen = false, className, ...props }, ref) => {
    const [open, setOpen] = useState(isOpen);
    const nodeRef = useRef(null);

    return (
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogPortal>
          <DialogContent
            ref={ref}
            {...props}
            className="dialog"
            onPointerDownOutside={(event) => {
              event.preventDefault();
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <Draggable
              handle=".title"
              cancel=".closeButton, .touch-close"
              nodeRef={nodeRef}
            >
              <div ref={nodeRef} className={`window ${className || ""}`}>
                <div className="title" style={{ position: "relative" }}>
                  {title}
                  <div className="actions">
                    <DialogClose
                      className="closeButton touch-close"
                      tabIndex={0}
                      aria-label="Close window"
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                    >
                      ×
                    </DialogClose>
                  </div>
                </div>
                <div className="body">{children}</div>
              </div>
            </Draggable>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
);
