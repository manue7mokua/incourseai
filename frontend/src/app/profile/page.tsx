import { Navbar } from "@/components/navbar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            Profile
          </h1>
          <div className="bg-white rounded-xl shadow-md p-8">
            <p className="text-muted-foreground">Profile page coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
