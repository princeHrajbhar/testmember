import { NextRequest, NextResponse } from "next/server";
import TeamMember from '@/lib/models/TeamMember';
import cloudinary from '@/lib/cloudinary';
import { connectToDB } from '@/lib/mongoDB';

export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const { description, gitUrl, email, phone, address, linkedinUrl, memberId, memberName, portfolioUrl, position, image } = await req.json();

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, { folder: 'team_members' });

    console.log("Cloudinary image URL:", uploadResult.secure_url);

    // Create a new team member document
    const newTeamMember = new TeamMember({
      description,
      gitUrl,
      linkedinUrl,
      email,
      phone,
      address,
      memberId,
      memberName,
      portfolioUrl,
      position,
      image: uploadResult.secure_url
    });

    // Save to the database
    await newTeamMember.save();

    return NextResponse.json({
      message: 'Team member created successfully',
      teamMember: newTeamMember
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

export const GET = async () => {  // Removed 'req' from parameters
  try {
    await connectToDB();

    const teamMember = await TeamMember.find().sort({ createdAt: "desc" });

    return NextResponse.json(teamMember, {
      status: 200,
    });
  } catch (err) {
    console.log("[teamMembers_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
