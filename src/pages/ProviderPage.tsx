import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGuruApi } from "../api/Api";
import { ApiGuruProvider, RawGuruProviderContact } from "../types/ApiGuru";
import styled from "styled-components";
import { OpenSidebarButton } from "../components/OpenSidebarButton";

type UrlParams = {
  domain: string;
  id: string;
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ProviderContainer = styled.div`
  width: 100%;
  max-width: 800px; /* Limit the maximum width for better readability */
  padding: 20px;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  justify-items: center;
  align-items: start;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LogoImg = styled.img`
  height: var(--logo-size-large);
  width: auto;
`;

const TitleContainer = styled.div`
  font-size: var(--font-size-large);
`;

const TextGroupContainer = styled.div`
  width: 100%; /* Ensure the container takes full width */
`;

const HeadingText = styled.div`
  font-size: var(--font-size-large);
  margin-bottom: 12px;
`;

const DescriptionText = styled.p`
  text-align: justify;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
`;

const ButtonContainer = styled.div`
  padding: 40px 0;
  display: flex;
  justify-content: center;
`;

const ContactDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1em 2em;
  width: 100%;
`;

const ContactItemKey = styled.div`
  word-wrap: break-word;
`;

const ContactItemValue = styled.div`
  font-weight: bold;
  word-wrap: break-word;
`;

export const ProviderPage: FC = () => {
  const params = useParams<UrlParams>();
  const id: string = params.id ?? "default id";
  const domain: string = params.domain ?? "default domain";
  const navigate = useNavigate();

  const [provider, setProvider] = useState<ApiGuruProvider | null>(null);
  const logoUrl = provider?.logoUrl;

  useEffect(() => {
    fetchGuruApi(domain)
      .then((fetchedProviders) => {
        const matchProvider = fetchedProviders.find((prov) => prov.id === id);
        if (typeof matchProvider === "undefined")
          throw new Error("API not found");
        setProvider(matchProvider);
      })
      .catch((err) => {
        alert(`There was a problem loading API: ${err.message}`);
        navigate("/");
      });
  }, [domain, id, navigate]);

  if (provider === null) return <div>Loading</div>;

  return (
    <PageContainer>
      <ProviderContainer>
        <ContentContainer>
          <LogoContainer>
            <LogoImg src={logoUrl} />
            <TitleContainer className="title">{provider.title}</TitleContainer>
          </LogoContainer>
          <TextGroupContainer className="text-group">
            <HeadingText className="heading">Description</HeadingText>
            <DescriptionText
              dangerouslySetInnerHTML={{ __html: provider.description }}
            ></DescriptionText>
          </TextGroupContainer>
          <TextGroupContainer>
            <HeadingText>Swagger</HeadingText>
            <a
              href={provider.swaggerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="swagger-link"
            >
              {provider.swaggerUrl}
            </a>
          </TextGroupContainer>
          <TextGroupContainer>
            <HeadingText>Contact</HeadingText>
            <ContactDetails contact={provider.contact} />
          </TextGroupContainer>
        </ContentContainer>
        <ButtonContainer>
          <OpenSidebarButton />
        </ButtonContainer>
      </ProviderContainer>
    </PageContainer>
  );
};

const ContactDetails: React.FC<{ contact: RawGuruProviderContact }> = ({
  contact,
}) => {
  const hasValidData = contact && Object.keys(contact).length > 0;

  if (!hasValidData) {
    return <div>No contact information available.</div>;
  }

  return (
    <ContactDetailsContainer>
      {Object.entries(contact).map(([key, value]) => (
        <React.Fragment key={key}>
          <ContactItemKey>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </ContactItemKey>
          <ContactItemValue>{value}</ContactItemValue>
        </React.Fragment>
      ))}
    </ContactDetailsContainer>
  );
};
