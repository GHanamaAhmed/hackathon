"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

type TeamMember = {
  name: string
  studentId: string
  email: string
  phone: string
}

type TeamMemberFormProps = {
  teamMembers: TeamMember[]
  setTeamMembers: (members: TeamMember[]) => void
}

export function TeamMemberForm({ teamMembers, setTeamMembers }: TeamMemberFormProps) {
  const handleChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setTeamMembers(updatedMembers)
  }

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", studentId: "", email: "", phone: "" }])
  }

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      const updatedMembers = [...teamMembers]
      updatedMembers.splice(index, 1)
      setTeamMembers(updatedMembers)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Team Members</h3>
        <Button type="button" variant="outline" size="sm" onClick={addTeamMember}>
          <Plus className="w-4 h-4 mr-1" />
          Add Member
        </Button>
      </div>

      {teamMembers.map((member, index) => (
        <div key={index} className="p-4 border rounded-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Team Member {index + 1}</h4>
            {teamMembers.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => removeTeamMember(index)}>
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Full Name (as on ID card)</Label>
              <Input
                id={`name-${index}`}
                value={member.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`studentId-${index}`}>Student ID</Label>
              <Input
                id={`studentId-${index}`}
                value={member.studentId}
                onChange={(e) => handleChange(index, "studentId", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`email-${index}`}>Email</Label>
              <Input
                id={`email-${index}`}
                type="email"
                value={member.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`phone-${index}`}>Phone Number</Label>
              <Input
                id={`phone-${index}`}
                type="tel"
                value={member.phone}
                onChange={(e) => handleChange(index, "phone", e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
