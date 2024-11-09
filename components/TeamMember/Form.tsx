"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdClose } from "react-icons/md";

interface TeamMemberFormProps {
  existingMember?: {
    memberName: string;
    memberId: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    position: string;
    image: string;
    gitUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

interface FormData {
  memberName: string;
  memberId: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  position: string;
  image: string;
  gitUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ existingMember, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<FormData>({
    memberName: "",
    memberId: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    image: "",
    gitUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingMember) {
      setFormData(existingMember);
      setImagePreview(existingMember.image);
    }
  }, [existingMember]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Optional URL validation
    const urlFields = ["gitUrl", "linkedinUrl", "portfolioUrl"] as const;
    for (const field of urlFields) {
      if (formData[field] && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData[field]!)) {
        setError(`Invalid URL format for ${field.replace("Url", " URL")}`);
        return;
      }
    }

    try {
      await onSubmit(formData);
      router.push("/teamMembers"); // Navigate to the members list after submitting
    } catch (err) {
      setError("Failed to submit the form");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-10 w-full max-w-3xl rounded-xl shadow-lg text-gray-200">
        <h2 className="text-3xl font-semibold text-gray-100 mb-8 text-center">
          {existingMember ? "Edit Member" : "Create New Member"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="memberName" className="block text-gray-400 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="memberName"
              id="memberName"
              value={formData.memberName}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="memberId" className="block text-gray-400 font-medium mb-2">
              Member ID
            </label>
            <input
              type="text"
              name="memberId"
              id="memberId"
              value={formData.memberId}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="memberId" className="block text-gray-400 font-medium mb-2">
              Email Id
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="memberId" className="block text-gray-400 font-medium mb-2">
              Phone No.
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-400 font-medium mb-2">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              rows={4}
              value={formData.address}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-400 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="position" className="block text-gray-400 font-medium mb-2">
              Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-8 flex flex-col items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700"
              onClick={handleFileButtonClick}
            >
              <AiOutlineCloudUpload size={20} />
              Upload Image
            </button>

            {imagePreview && (
              <div className="relative">
                <img src={imagePreview} alt="Image Preview" className="w-32 h-32 rounded-full object-cover mb-4" />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-0 right-0 bg-gray-700 text-white rounded-full p-1"
                >
                  <MdClose size={20} />
                </button>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="gitUrl" className="block text-gray-400 font-medium mb-2">
              GitHub URL {/*(Optional) */}
            </label>
            <input
              type="url"
              name="gitUrl"
              id="gitUrl"
              value={formData.gitUrl || ""}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="linkedinUrl" className="block text-gray-400 font-medium mb-2">
              LinkedIn URL 
            </label>
            <input
              type="url"
              name="linkedinUrl"
              id="linkedinUrl"
              value={formData.linkedinUrl || ""}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="portfolioUrl" className="block text-gray-400 font-medium mb-2">
              Portfolio URL 
            </label>
            <input
              type="url"
              name="portfolioUrl"
              id="portfolioUrl"
              value={formData.portfolioUrl || ""}
              onChange={handleChange}
              className="w-full p-4 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamMemberForm;
