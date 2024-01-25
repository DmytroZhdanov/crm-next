import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import StatusLabel from "@/app/components/status-label";

import { Company } from "@/lib/api";

export interface CompanyRowProps {
  company: Company;
}

export default function CompanyRow({ company }: Readonly<CompanyRowProps>) {
  return (
    <tr className="h-14 text-center text-gray-900 bg-white">
      <td className="text-xs font-medium text-blue-700 rounded-l border-l-4 border-blue-700">
        {company.attributes.categoryTitle}
      </td>

      <td>
        <Link href={`/companies/${company.id}`}>
          {company.attributes.title}
        </Link>
      </td>

      <td>
        <StatusLabel status={company.attributes.status} />
      </td>

      <td>
        <div className="inline-flex items-center gap-1">
          <Image
            width={16}
            height={16}
            src={`/icons/${company.attributes.hasPromotions ? "check" : "x-mark"}.svg`}
            alt="promotion icon"
          />

          <span
            className={clsx(
              "text-sm font-medium",
              company.attributes.hasPromotions
                ? "text-green-700"
                : "text-red-700",
            )}
          >
            {company.attributes.hasPromotions ? "Yes" : "No"}
          </span>
        </div>
      </td>

      <td>{company.attributes.countryTitle}</td>

      <td className="rounded-r">
        {new Date(company.attributes.joinedDate).toLocaleDateString("uk-UA")}
      </td>
    </tr>
  );
}
