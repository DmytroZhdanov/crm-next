"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import StatusLabel from "@/app/components/status-label";

import { getCompany } from "@/lib/api";

export interface CompanyInfoProps {
  companyId: string;
}

export default function CompanyInfo({ companyId }: Readonly<CompanyInfoProps>) {
  const { data: company } = useQuery({
    queryKey: ["companies", companyId],
    queryFn: () => getCompany(companyId),
    staleTime: 10 * 1000,
  });

  if (!company) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center p-7 gap-5 bg-gray-900 rounded">
        <div className="w-20 h-20 rounded-full bg-blue-500">
          {company.attributes.avatar && (
            <Image fill src={company.attributes.avatar} alt="company avatar" />
          )}
        </div>

        <p className="pb text-base font-semibold text-white">
          {company.attributes.title}
        </p>

        <StatusLabel status={company.attributes.status} />
      </div>

      <div className="p-7 text-base text-gray-900 bg-gray-100 rounded">
        <p className="pb-5 text-xl font-semibold">About company</p>
        <p className="pb-3">{`Category: ${company.attributes.categoryTitle}`}</p>
        <p className="pb-3">{`Country: ${company.attributes.countryTitle}`}</p>
        <p className="pb-3">{`Joined date: ${new Date(
          company.attributes.joinedDate,
        ).toLocaleDateString("uk")}`}</p>
        <div className="w-full h-px my-8 bg-gray-300" />
        <p>{company.attributes.description}</p>
      </div>
    </div>
  );
}
