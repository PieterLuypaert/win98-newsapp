import "./window.css";
import { Dialog, DialogClose, DialogContent, DialogPortal, DialogTitle, DialogDescription, } from "@radix-ui/react-dialog";
import { forwardRef, useRef } from "react";
import Draggable from "react-draggable";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Window = forwardRef(
  ({ title, children, onClose, width = 800, height = 600, ...props }, ref) => {
    const nodeRef = useRef(null);

    return (
      <Dialog
        open={true}
        onOpenChange={(open) => !open && onClose()}
        modal={false}
      >
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
            <VisuallyHidden>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{title} window content</DialogDescription>
            </VisuallyHidden>
            <Draggable
              handle=".title"
              cancel=".closeButton, .touch-close"
              nodeRef={nodeRef}
            >
              <div
                ref={nodeRef}
                className="window"
                style={{ width: `${width}px`, minHeight: `${height}px` }}
              >
                <div className="title" style={{ position: "relative" }}>
                  {title}
                  <div className="actions">
                    <DialogClose
                      className="closeButton touch-close"
                      tabIndex={0}
                      aria-label="Close window"
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      onClick={onClose}
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

Window.displayName = "Window";
