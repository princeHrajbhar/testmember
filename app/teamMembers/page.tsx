"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

interface TeamMemberType {
    _id: string;
    memberName: string;
    memberId: string;
    description: string;
    position: string;
    image: string;
    gitUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
}

const TeamMembersList = () => {
    const [members, setMembers] = useState<TeamMemberType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');  // Used for error handling
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const router = useRouter();

    const fetchMembers = async () => {
        setLoading(true);
        setError(''); // Clear previous errors
        try {
            const response = await axios.get('/api/teamMembers');
            setMembers(response.data);
        } catch (error) {
            setError("Failed to fetch team members.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleCreateMember = () => {
        router.push('/teamMembers/create');
    };

    const handleEditMember = (id: string) => {
        router.push(`/teamMembers/edit/${id}`);
    };

    const handleDeleteMember = async () => {
        if (!deleteId) return;
        try {
            await axios.delete(`/api/teamMembers/${deleteId}`);
            setMembers(members.filter((member) => member._id !== deleteId));
            setDeleteId(null);
        } catch (error) {
            setError("Failed to delete member.");
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-gray-800 text-white">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-100">Members List</h1>
                <button
                    className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-200"
                    onClick={handleCreateMember}
                >
                    <AiOutlinePlus size={20} />
                    Create New Member
                </button>
            </div>

            {/* Display error message if there's an error */}
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <hr className="my-4 border-gray-600" />

            {loading ? (
                <div className="text-center text-blue-500">Loading members...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-gray-700 shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Member ID</th>
                                <th className="p-4 text-left">Position</th>
                                <th className="p-4 text-left">GitHub</th>
                                <th className="p-4 text-left">LinkedIn</th>
                                <th className="p-4 text-left">Portfolio</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member._id} className="border-b last:border-0 hover:bg-gray-600 transition">
                                    <td className="p-4">{member.memberName}</td>
                                    <td className="p-4">{member.memberId}</td>
                                    <td className="p-4">{member.position}</td>
                                    <td className="p-4">
                                        {member.gitUrl ? (
                                            <a
                                                href={member.gitUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                GitHub
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {member.linkedinUrl ? (
                                            <a
                                                href={member.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                LinkedIn
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {member.portfolioUrl ? (
                                            <a
                                                href={member.portfolioUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                Portfolio
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    <td className="p-4 flex items-center gap-4">
                                        <button
                                            className="text-yellow-500 hover:text-yellow-600 transition"
                                            onClick={() => handleEditMember(member._id)}
                                            aria-label={`Edit ${member.memberName}`}
                                        >
                                            <AiOutlineEdit size={20} />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-600 transition"
                                            onClick={() => setDeleteId(member._id)}
                                            aria-label={`Delete ${member.memberName}`}
                                        >
                                            <AiOutlineDelete size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 text-white rounded-lg p-6 w-80 text-center shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this member?</p>
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-gray-600 text-gray-100 py-2 px-4 rounded hover:bg-gray-500"
                                onClick={() => setDeleteId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                onClick={handleDeleteMember}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamMembersList;
