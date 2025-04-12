import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const { subject, message, pdf } = await req.json();

    // Validate required fields
    if (!subject || !message || !pdf) {
      return NextResponse.json(
        { error: "Missing subject, message, or pdf" },
        { status: 400 }
      );
    }

    // Fetch all projects routed to interface 3
    const projects = await db.project.findMany({
      where: {
        state: "ROUTED_TO_UI",
        currentStep: 2,
      },
      include: { teamMembers: true },
    });

    // Extract unique emails from team members
    const emailSet = new Set<string>();
    projects.forEach((project) => {
      project.teamMembers?.forEach((member: any) => {
        if (member.email) {
          emailSet.add(member.email);
        }
      });
    });
    const emails = Array.from(emailSet);

    if (emails.length === 0) {
      return NextResponse.json(
        { error: "No email addresses found for training program recipients" },
        { status: 404 }
      );
    }

    // Create a nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare the email options with PDF attachment (assumed pdf is Base64 encoded)
    const mailOptions = {
      from: process.env.SMTP_FROM, // sender address
      to: emails, // list of recipients
      subject,
      text: message,
      attachments: [
        {
          filename: "training-program.pdf",
          content: pdf,
          encoding: "base64",
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Training program email sent successfully",
    });
  } catch (error: any) {
    console.error("Error sending training program email:", error);
    return NextResponse.json(
      { error: "Failed to send training program email" },
      { status: 500 }
    );
  }
}
