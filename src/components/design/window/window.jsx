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

    const savedInlineStyles = useRef(null);

    useEffect(() => {
      const el = nodeRef.current;
      if (!el) return;
      if (maximized) {
        savedInlineStyles.current = {
          transform: el.style.transform || "",
          left: el.style.left || "",
          top: el.style.top || "",
          position: el.style.position || "",
          width: el.style.width || "",
          minHeight: el.style.minHeight || "",
          margin: el.style.margin || "",
        };
        el.style.transform = "";
        el.style.left = "";
        el.style.top = "";
        el.style.position = "absolute";
        el.style.margin = "0";
      } else {
        const s = savedInlineStyles.current;
        if (s && el) {
          // restore positioning/transform if available
          el.style.position = s.position || "";
          el.style.left = s.left || "";
          el.style.top = s.top || "";
          el.style.transform = s.transform || "";
          // IMPORTANT: always restore size to the original props (width/height)
          // so un-maximize returns to passed dimensions (e.g. 1000 x 600)
          el.style.width = `${width}px`;
          el.style.minHeight = `${height}px`;
          el.style.margin = s.margin || "";
          savedInlineStyles.current = null;
        } else {
          // fallback: ensure correct size if no saved styles
          el.style.width = `${width}px`;
          el.style.minHeight = `${height}px`;
        }
      }
    }, [maximized, width, height]);

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
                      title={maximized ? "Restore" : "Toggle fullscreen"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMaximize && onToggleMaximize();
                      }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      aria-label={
                        maximized ? "Restore window" : "Maximize window"
                      }
                    >
                      <span className="fullscreen-icon" aria-hidden="true">
                        {maximized ? "🗗" : "⛶"}
                      </span>
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
