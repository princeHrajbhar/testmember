import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import TeamMember from "@/lib/models/TeamMember";

// Define Params interface for ID parameter
interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const { id } = context.params;

  await connectToDB();

  try {
    const member = await TeamMember.findById(id);
    if (!member) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    console.error("[GET] Error fetching member:", error);
    return NextResponse.json({ message: 'Error fetching member' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Params }) {
  const { id } = context.params;
  const body = await request.json();

  await connectToDB();

  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(id, body, { new: true });
    if (!updatedMember) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 });
    }
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error("[PUT] Error updating member:", error);
    return NextResponse.json({ message: 'Error updating member' }, { status: 500 });
  }
}

export const DELETE = async (_: NextRequest, context: { params: Params }) => {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ message: "Team member ID is required" }, { status: 400 });
  }

  await connectToDB();

  try {
    const deletedTeamMember = await TeamMember.findByIdAndDelete(id);

    if (!deletedTeamMember) {
      return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Team member deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("[DELETE] Error deleting team member:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
