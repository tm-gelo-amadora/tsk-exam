import {
  ApiGuruProvider,
  RawGuruProvider,
  RawGuruProviders,
} from "../types/ApiGuru";

export const fetchGuruProvider = async () => {
  const response = await fetch("https://api.apis.guru/v2/providers.json");
  const data: RawGuruProviders = await response.json();
  return data.data;
};

export const fetchGuruApi = async (domain: string) => {
  const response = await fetch(`https://api.apis.guru/v2/${domain}.json`);
  const json: RawGuruProvider = await response.json();
  const apis: ApiGuruProvider[] = Object.entries(json.apis).map(
    ([id, rawProvider]) => ({
      id,
      domain,
      title: rawProvider.info.title,
      description: rawProvider.info.description,
      swaggerUrl: rawProvider.swaggerUrl,
      contact: rawProvider.info.contact,
      logoUrl: rawProvider.info["x-logo"].url,
    }),
  );

  return apis;
};
