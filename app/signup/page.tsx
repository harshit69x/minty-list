import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-600 mb-2">🌿 Minty List</h1>
          <p className="text-gray-600">Fresh notes, organized thoughts</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
