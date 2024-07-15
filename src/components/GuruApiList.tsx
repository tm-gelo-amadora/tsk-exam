import { FC, useEffect, useState } from "react";
import { fetchGuruProvider } from "../api/Api";
import styled from "styled-components";
import { GuruApiListItem } from "./GuruApiListItem";

const GuruApiListContainer = styled.div`
  --arrow-size: 32px;
  --transition-duration: 300ms;
`;

export const GuruApiList: FC = () => {
  const [domains, setDomains] = useState<string[]>([]);

  useEffect(() => {
    fetchGuruProvider().then((data) => {
      setDomains(data);
    });
  }, []);

  return (
    <GuruApiListContainer>
      {domains.map((domain) => (
        <GuruApiListItem domain={domain} key={domain} />
      ))}
    </GuruApiListContainer>
  );
};
