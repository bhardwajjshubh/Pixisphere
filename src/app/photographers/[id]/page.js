"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPhotographerById } from "../../../services/api";
import ProfileHeader from "../../../components/PhotographerProfile/ProfileHeader";
import Gallery from "../../../components/PhotographerProfile/Gallery";
import Reviews from "../../../components/PhotographerProfile/Reviews";
import InquiryModal from "../../../components/PhotographerProfile/InquiryModal";

export default function PhotographerProfilePage() {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      setLoading(true);
      const data = await getPhotographerById(id);
      setPhotographer(data);
      setLoading(false);
    };

    if (id) {
      fetchPhotographer();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Photographer not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader
        photographer={photographer}
        openInquiryModal={() => setIsInquiryOpen(true)}
      />

      <Gallery images={photographer.portfolio} />

      <Reviews reviews={photographer.reviews} />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        photographerName={photographer.name}
      />
    </div>
  );
}
