"use client";
import React, { useEffect, useState, ChangeEvent } from "react";

interface Company {
  id?: number;
  company_name: string;
  establishment_year?: number;
  website?: string;
  email?: string;
  country_code?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  description?: string;
  logo?: string;
  authorized_person?: string;
  linkedin?: string;
  user_id?: string | number;
}

const editableFields: { label: string; name: keyof Company }[] = [
  { label: "Company Name", name: "company_name" },
  { label: "Email", name: "email" },
  { label: "Country Code", name: "country_code" },
  { label: "Phone", name: "phone" },
  { label: "City", name: "city" },
  { label: "Country", name: "country" },
  { label: "Website", name: "website" },
  { label: "LinkedIn", name: "linkedin" },
  { label: "Authorized Person", name: "authorized_person" },
  { label: "Establishment Year", name: "establishment_year" },
];

const CompanyProfile: React.FC = () => {
  const [company, setCompany] = useState<Company>({ company_name: "" });
  const [editMode, setEditMode] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const sellerId = typeof window !== "undefined" ? localStorage.getItem("seller_id") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (sellerId && token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok || data.message === "Company not found") {
            console.log("No company found, form ready for creation.");
            return;
          }
          setCompany(data);
          if (data.logo) {
            setLogoPreview(`${process.env.NEXT_PUBLIC_API_URL}/storage/${data.logo}`);
          }
        })
        .catch((err) => console.error("Error fetching company:", err));
    }
  }, [sellerId, token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name as keyof Company]: value }));
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!sellerId || !token) return;

    const formData = new FormData();
    formData.set("user_id", sellerId);

    Object.entries(company).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.set(key, value.toString());
      }
    });

    if (logoFile) {
      formData.set("logo", logoFile);
    }

    const isUpdate = company.id !== undefined;
    const method = "POST";
    if (isUpdate) {
      formData.set("_method", "PUT");
    }

    const url = isUpdate
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${sellerId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/companies`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert(isUpdate ? "Company updated successfully!" : "Company created successfully!");
        setEditMode(false);
        setCompany(data.data);
        if (data.data.logo) {
          setLogoPreview(`${process.env.NEXT_PUBLIC_API_URL}/storage/logos/${data.data.logo}`);
        }
        setLogoFile(null);
      } else {
        console.error(data);
        alert("Failed to save company");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div className="p-6 border rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Company Profile</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {editableFields.map(({ label, name }) => (
          <div key={name}>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            {editMode ? (
              <input
                name={name}
                value={company[name] ?? ""}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {company[name] ?? "-"}
              </p>
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Address</p>
          {editMode ? (
            <textarea
              name="address"
              value={company.address ?? ""}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {company.address ?? "-"}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Description</p>
          {editMode ? (
            <textarea
              name="description"
              value={company.description ?? ""}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {company.description ?? "-"}
            </p>
          )}
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Logo</p>
          {editMode ? (
            <>
              <input type="file" accept="image/*" onChange={handleLogoChange} />
              {logoPreview && <img src={logoPreview} alt="Preview" className="h-20 mt-2" />}
            </>
          ) : (
            logoPreview && (
              <img
                src={logoPreview}
                alt="Company Logo"
                className="h-20"
              />
            )
          )}
        </div>
      </div>

      <div className="mt-6">
        {editMode ? (
          <div className="flex gap-4">
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>
            <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
            Edit Company
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
