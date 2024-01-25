"use client";

import { useRouter } from "next/navigation";

import PromotionFormModal from "@/app/components/promotion-form-modal";

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: Readonly<PageProps>) {
  const router = useRouter();

  return (
    <PromotionFormModal
      companyId={params.id}
      show={true}
      onClose={() => router.back()}
    />
  );
}
