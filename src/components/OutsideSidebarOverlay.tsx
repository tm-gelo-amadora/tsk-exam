import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

type Props = {
  show: boolean;
  onClick?: MouseEventHandler;
};

const OverlayContainer = styled.div<{ show: boolean }>`
  z-index: 100;
  position: fixed;
  inset: 0;
  background-color: var(--color-overlay);
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  transition: none; // No transition for instant visibility change
`;

export const Overlay: FC<Props> = ({ show, onClick }) => {
  return <OverlayContainer show={show} onClick={onClick} />;
};