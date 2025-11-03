import React, { useRef, useState, useEffect } from "react";
import { DesktopIcon } from "../../design/DesktopIcon/DesktopIcon";

export const DesktopIconContainer = ({
  id,
  icon,
  label,
  onClick,
  isImage = false,
  position,
  onPositionChange,
}) => {
  const iconRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (position && iconRef.current) {
      iconRef.current.style.left = `${position.x}px`;
      iconRef.current.style.top = `${position.y}px`;
      iconRef.current.style.position = "absolute";
    }
  }, [position]);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();

    const rect = iconRef.current.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;

    setDragOffset({
      x: clickX - rect.left,
      y: clickY - rect.top,
    });

    startPosRef.current = { x: clickX, y: clickY };
    setHasMoved(false);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const moveThreshold = 5;
    const deltaX = Math.abs(e.clientX - startPosRef.current.x);
    const deltaY = Math.abs(e.clientY - startPosRef.current.y);

    if (deltaX > moveThreshold || deltaY > moveThreshold) {
      setHasMoved(true);
    }

    const desktop = iconRef.current.parentElement;
    const desktopRect = desktop.getBoundingClientRect();

    let newX = e.clientX - desktopRect.left - dragOffset.x;
    let newY = e.clientY - desktopRect.top - dragOffset.y;

    const iconWidth = iconRef.current.offsetWidth;
    const iconHeight = iconRef.current.offsetHeight;

    newX = Math.max(0, Math.min(newX, desktopRect.width - iconWidth));
    newY = Math.max(0, Math.min(newY, desktopRect.height - iconHeight));

    iconRef.current.style.left = `${newX}px`;
    iconRef.current.style.top = `${newY}px`;
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);

      if (hasMoved && onPositionChange && iconRef.current) {
        const left = parseInt(iconRef.current.style.left, 10);
        const top = parseInt(iconRef.current.style.top, 10);
        onPositionChange(id, { x: left, y: top });
      }
    }
  };

  const handleClick = (e) => {
    if (!hasMoved && onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <DesktopIcon
      ref={iconRef}
      icon={icon}
      label={label}
      isImage={isImage}
      isDragging={isDragging}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    />
  );
};

export default DesktopIconContainer;
