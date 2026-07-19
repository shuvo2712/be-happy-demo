import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/servicesData";
import AccommodationPage from "./AccommodationPage";
import ConciergePage from "./ConciergePage";
import TourPage from "./TourPage";
import BuyingPage from "./BuyingPage";
import RepairPage from "./RepairPage";

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

  if (service.id === "accommodation") {
    return <AccommodationPage service={service} />;
  }
  if (service.id === "concierge") {
    return <ConciergePage service={service} />;
  }
  if (service.id === "tour") {
    return <TourPage service={service} />;
  }
  if (service.id === "buying") {
    return <BuyingPage service={service} />;
  }
  if (service.id === "repair") {
    return <RepairPage service={service} />;
  }

  notFound();
}
