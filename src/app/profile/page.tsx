"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/services/profile";
import { Claims } from "@/services/jwt";
import jwt from "@/services/jwt";
import { Profile } from "@/types/patient";
import Toast from "@/components/ui/Toast";

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    allergies: "",
    emergency_contact: "",
  });

  const [initialForm, setInitialForm] = useState({
    first_name: "",
    last_name: "",
    allergies: "",
    emergency_contact: "",
  });

  const isChanged =
    form.first_name !== initialForm.first_name ||
    form.last_name !== initialForm.last_name ||
    form.allergies !== initialForm.allergies ||
    form.emergency_contact !== initialForm.emergency_contact;

  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [claims, setClaims] = useState<Claims | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);

  const router = useRouter();

  // 🔐 Decode JWT
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwt(token);
      setClaims(decoded.claims);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // 📡 Fetch profile
  useEffect(() => {
    if (!claims?.sub) return;

    setProfileLoading(true);

    getProfile(claims.sub)
      .then((data) => {
        if (!data) throw new Error("No profile returned");

        setProfile(data);
      })
      .catch((err) => {
        setProfile(null);
      })
      .finally(() => {
        setProfileLoading(false);
      });
  }, [claims]);

  // 🧠 Hydrate form
  useEffect(() => {
    if (!profile) return;

    const mapped = {
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      allergies: profile.allergies?.join(", ") || "",
      emergency_contact: profile.emergency_contact || "",
    };

    setForm(mapped);
    setInitialForm(mapped); // 👈 store original
  }, [profile]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  if (!claims) return null;

  if (profileLoading) {
    return <p className="p-6 text-gray-500">Loading profile...</p>;
  }

  if (!profile) {
    return (
      <p className="p-6 text-red-500">Failed to load profile. Check console.</p>
    );
  }

  // HANDLE CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE PROFILE
  const handleSave = async () => {
    setSaving(true);

    try {
      await updateProfile({
        id: claims!.sub,
        first_name: form.first_name || undefined,
        last_name: form.last_name || undefined,
        allergies:
          form.allergies === undefined
            ? undefined
            : form.allergies.trim() === ""
              ? []
              : form.allergies.split(",").map((a) => a.trim()),
        emergency_contact: form.emergency_contact || undefined,
      });

      setInitialForm(form); // reset baseline

      // ✅ Show success toast
      setToast({ message: "Profile updated ✅", type: "success" });
    } catch (err) {
      setToast({ message: "Failed to update profile", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col relative overflow-visible">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="p-4 md:p-8 max-w-3xl w-full mx-auto space-y-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Profile
          </h1>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-800 p-6 space-y-4">
            <div>
              <label className="text-sm text-gray-500">First Name</label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 p-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Last Name</label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 p-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Allergies (comma separated)
              </label>
              <input
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 p-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Emergency Contact</label>
              <input
                name="emergency_contact"
                value={form.emergency_contact}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 p-3 rounded-lg border"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving || !isChanged}
              className={`w-full py-3 rounded-xl font-medium transition ${
                saving || !isChanged
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-emerald-800 active:scale-[0.98]"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
