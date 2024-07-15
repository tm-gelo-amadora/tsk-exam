import { FC, useContext, useEffect, useRef, useState } from "react";
import { ApiGuruProvider } from "../types/ApiGuru";
import { fetchGuruApi } from "../api/Api";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import arrowUrl from "../assets/arrow.png";
import { SidebarContext } from "../contexts/Sidebar";

type Props = {
  open?: boolean;
};

const ApiListItem = styled.div<Props>`
  margin: 10px;
  border-radius: var(--border-radius);
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: ${({ open }) => (open ? "var(--color-dark)" : "none")};
  transition:
    var(--transition-duration) background-color,
    var(--transition-duration) height;
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  gap: 1em;
`;

const DomainContainer = styled.div`
  font-size: var(--font-size-normal);
  flex:1
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const ArrowContainer = styled.img<Props>`
  flex: 0;
  transition: var(--transition-duration) transform;
  transform: ${({ open }) => (open ? "rotate(0)" : "rotate(180deg)")};
`;

const SubItems = styled.div`
  display: block;
  opacity: 1;
  transition: var(--transition-duration) opacity;
`;

const NavLinkContainer = styled(NavLink)`
  margin-top: 17px;
  display: block;
  opacity: 1;
  transition: var(--transition-duration) opacity;
`;

const SubItem = styled(NavLinkContainer)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
`;

const LogoContainer = styled.div`
  width: var(--logo-size-small);
  height: var(--logo-size-small);
  flex-basis: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const TitleContainer = styled.div`
  font-size: var(--font-size-title);
  flex: 1;
  text-align: left;
`;

export const GuruApiListItem: FC<{ domain: string }> = ({ domain }) => {
  const [providers, setProviders] = useState<ApiGuruProvider[] | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const apiListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchGuruApi(domain)
        .then((fetchedProviders) => {
          setProviders(fetchedProviders);
        })
        .catch((err) => {
          alert(`There was a problem loading API: ${err.message}`);
          setIsOpen(false);
        });
    }
  }, [domain, isOpen]);

  return (
    <ApiListItem open={isOpen}>
      <NameContainer onClick={() => setIsOpen((b) => !b)}>
        <DomainContainer>{domain}</DomainContainer>
        <ArrowContainer src={arrowUrl} open={isOpen} />
      </NameContainer>
      <SubItems ref={apiListRef}>
        {providers !== null &&
          providers.map((provider) => (
            <ProviderLink {...{ provider, isOpen }} key={provider.id} />
          ))}
      </SubItems>
    </ApiListItem>
  );
};

const ProviderLink: FC<{ provider: ApiGuruProvider; isOpen: boolean }> = ({
  provider,
  isOpen,
}) => {
  const { toggle } = useContext(SidebarContext);
  const logoUrl = provider.logoUrl;

  return (
    isOpen && (
      <SubItem
        onClick={() => toggle()}
        to={`/${provider.domain}/${provider.id}`}
      >
        <LogoContainer
          style={{ backgroundImage: `url(${logoUrl})` }}
        ></LogoContainer>
        <TitleContainer>{provider.title}</TitleContainer>
      </SubItem>
    )
  );
};
