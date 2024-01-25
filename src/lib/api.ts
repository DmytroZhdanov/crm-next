export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

interface SummaryStatsResponse {
  id: string;
  attributes: SummaryStats;
}

export interface SummarySales {
  id: string;
  attributes: {
    companyId: string;
    companyTitle: string;
    sold: number;
    income: number;
  };
}

export interface Country {
  id: string;
  attributes: {
    title: string;
  };
}

export interface Category {
  id: string;
  attributes: {
    title: string;
  };
}

export enum CompanyStatus {
  Active = "active",
  NotActive = "notActive",
  Pending = "pending",
  Suspended = "suspended",
}

export interface Company {
  id: string;
  attributes: CompanyAttributes;
}

interface CompanyAttributes {
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar?: string;
}

export interface Promotion {
  id: string;
  attributes: PromotionAttributes;
}

interface PromotionAttributes {
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}

const PROJECT_API = process.env.NEXT_PUBLIC_PROJECT_API;

const buildUrl = (...paths: string[]) =>
  `http://${PROJECT_API}/${paths.join("/")}`;

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const { data } = await res.json();
  return data as T;
};

export const getSummaryStats = (init?: RequestInit) => {
  return sendRequest<SummaryStatsResponse>(
    buildUrl("summary-stats", "1"),
    init,
  );
};

export const getSummarySales = (init?: RequestInit) => {
  return sendRequest<SummarySales[]>(buildUrl("summary-sales"), init);
};

export const getCountries = (init?: RequestInit) => {
  return sendRequest<Country[]>(buildUrl("countries"), init);
};

export const getCategories = (init?: RequestInit) => {
  return sendRequest<Category[]>(buildUrl("categories"), init);
};

export const getCompanies = (init?: RequestInit) => {
  return sendRequest<Company[]>(buildUrl("companies"), init);
};

export const getCompany = (id: string, init?: RequestInit) => {
  return sendRequest<Company>(buildUrl("companies", id), init);
};

export const getPromotions = async (
  params: Record<string, string> = {},
  init?: RequestInit,
) => {
  const promotions = await sendRequest<Promotion[]>(
    buildUrl("promotions"),
    init,
  );

  return params.companyId
    ? promotions.filter(
        ({ attributes: { companyId } }) => companyId === params.companyId,
      )
    : promotions;
};

export const createCompany = async (
  data: Omit<CompanyAttributes, "hasPromotions">,
  init?: RequestInit,
) => {
  return sendRequest<Company>(buildUrl("companies"), {
    ...init,
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      ...init?.headers,
      "content-type": "application/json",
    },
  });
};

export const createPromotion = async (
  data: PromotionAttributes,
  init?: RequestInit,
) => {
  return sendRequest<Promotion>(buildUrl("promotions"), {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      ...init?.headers,
      "content-type": "application/json",
    },
  });
};
