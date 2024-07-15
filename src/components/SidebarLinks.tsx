import styled from "styled-components"
import { NavLink } from "react-router-dom"
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

const NavLinks = styled(NavLink)`
    background-color: #ffffff;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavLinkArea = styled.li`
    background-color: #ffffff;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarLinks: React.FC<Props> = ({ children }) => {

    return (
        <NavLinkArea>
            <NavLinks to={"/profiles"}>
                {children}
            </NavLinks>
        </NavLinkArea>
    )
}

export default SidebarLinks