import "./window.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { forwardRef, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Window = forwardRef(
  (
    {
      title,
      children,
      onClose,
      width = 800,
      height = 600,
      maximized = false,
      onToggleMaximize,
      ...props
    },
    ref
  ) => {
    const nodeRef = useRef(null);

    useEffect(() => {
      const el = nodeRef.current;
      if (!el) return;
      if (maximized) {
        el.style.transform = "";
        el.style.left = "";
        el.style.top = "";
        el.style.position = "absolute";
        el.style.margin = "0";
      } else {
       
      }
    }, [maximized]);

    const windowStyle = maximized
      ? {}
      : { width: `${width}px`, minHeight: `${height}px` };

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
            className={`dialog ${maximized ? "maximized" : ""}`}
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
              cancel=".closeButton, .touch-close, .fullscreenButton"
              nodeRef={nodeRef}
              disabled={maximized} 
            >
              <div ref={nodeRef} className="window" style={windowStyle}>
                <div className="title" style={{ position: "relative" }}>
                  {title}
                  <div className="actions">
                    <button
                      className="fullscreenButton"
                      title="Toggle fullscreen"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMaximize && onToggleMaximize();
                      }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                    >
                      ⛶
                    </button>

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
