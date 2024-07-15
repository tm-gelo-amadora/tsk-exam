import { FC, useContext, MouseEvent } from "react";
import { SidebarContext } from "../contexts/Sidebar";
import styled from "styled-components";

const OpenSidebarButtonContainer = styled.button`
  border: 0;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: var(--font-size-normal);
  background-color: var(--color-button);
  color: var(--color-text);
  padding: 12px 18px;
`;

export const OpenSidebarButton: FC = () => {
  const { isOpen, toggle } = useContext(SidebarContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggle(!isOpen);
  };

  return (
    <OpenSidebarButtonContainer
      className="open-sidebar-button"
      onClick={handleClick}
    >
      Explore web APIs
    </OpenSidebarButtonContainer>
  );
};
