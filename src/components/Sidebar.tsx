import styled from "styled-components";
import { SidebarContext } from "../contexts/Sidebar";
import { useContext, useEffect, useRef } from "react";
import { GuruApiList } from "./GuruApiList";
type Props = {
  open?: boolean;
};

const SidebarArea = styled.div<Props>`
  z-index: 300;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: fixed;
  right: ${({ open }) => (open ? "0" : "-100%")};
  transition: ${({ open }) => (open ? "450ms" : "850ms")};
  background-color: var(--color-background);
  padding: 16px;
  width: 100%;
  max-width: var(--sidebar-width);
`;

const LeftOverlay = styled.div<Props>`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity ${({ open }) => (open ? "450ms" : "850ms")} ease;
  z-index: 199;
`;

const SidebarHeader = styled.div`
  font-size: var(--font-size-normal);
  text-align: center;
  color: var(--color-text);
  margin-bottom: 20px;
`;

const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useContext(SidebarContext);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).classList.contains("open-sidebar-button")
    ) {
      toggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <LeftOverlay open={isOpen} />
      <SidebarArea ref={sidebarRef} open={isOpen}>
        <SidebarHeader>Select Provider</SidebarHeader>
        <GuruApiList />
      </SidebarArea>
    </>
  );
};

export default Sidebar;
