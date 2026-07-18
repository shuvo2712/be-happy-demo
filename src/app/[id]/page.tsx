import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.id === resolvedParams.id);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Be Happy in Dhaka`,
    description: service.longDescription,
    openGraph: {
      title: `${service.title} | Be Happy in Dhaka`,
      description: service.longDescription,
      images: [{ url: service.heroImage }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.id === resolvedParams.id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
