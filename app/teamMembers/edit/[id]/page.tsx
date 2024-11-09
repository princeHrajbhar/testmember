"use client";

import React, { useState } from "react";
import TeamMemberForm from "@/components/TeamMember/Form";
import { useRouter } from "next/navigation";

// Define the type for form data based on the expected fields
interface TeamMemberFormData {
  description: string;
  gitUrl: string;
  email: string;
  phone: string;
  address: string;
  linkedinUrl: string;
  memberId: string;
  memberName: string;
  portfolioUrl: string;
  position: string;
  image: string;
}

const CreateTeamMemberPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateMember = async (formData: TeamMemberFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/teamMembers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create team member");
      }

      router.push("/teamMembers");
    } catch (error) {
      console.error("Error creating team member:", error);
      setError("An error occurred while creating the team member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">Create New Team Member</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <TeamMemberForm
        onSubmit={handleCreateMember}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateTeamMemberPage;
