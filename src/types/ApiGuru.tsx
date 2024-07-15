export type RawGuruProviders = {
  data: string[];
};

export type RawGuruProvider = {
  apis: {
    [apiKey: string]: {
      added: string;
      info: {
        contact: RawGuruProviderContact;
        description: string;
        title: string;
        version: string;
        "x-apisguru-categories": string[];
        "x-logo": { url: string };
        "x-origin": Array<{ format: string; url: string; version: string }>;
        "x-providerName": string;
        "x-serviceName": string;
        "x-unofficialSpec": boolean;
      };
      updated: string;
      swaggerUrl: string;
      swaggerYamlUrl: string;
      openapiVer: string;
      link: string;
    };
  };
};

export type ApiGuruProvider = {
  id: string;
  domain: string;
  title: string;
  description: string;
  swaggerUrl: string;
  contact: RawGuruProviderContact;
  logoUrl: string;
};

export type RawGuruProviderContact = {
  email?: string;
  name?: string;
  "x-twitter"?: string;
  url?: string;
};
