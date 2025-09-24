import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    summary: "",
    shift: "",
    availability: "Available",
    specialty: "",
    company: "",
    expLocation: "",
    role: "",
    expStartDate: "",
    expEndDate: "",
    responsibilities: "",
    degree: "",
    university: "",
    eduStartDate: "",
    eduEndDate: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.email) {
        try {
            const res = await fetch(`https://disaster-management-website-server.vercel.app/rescuerProfile/${user.email}`);
          const data = await res.json();

          if (data && data.email === user.email) {
            setFormData({
              ...data,
              phone: data.phone || "",
              location: data.location || "",
              summary: data.summary || ""
            });
            setIsSubmitted(true); // existing data found, block resubmit
          } else {
            // No existing data, allow new entry
            setIsSubmitted(false);
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitted) return;

    try {
      const response = await fetch("https://disaster-management-website-server.vercel.app/rescuerProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, email: user.email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile saved successfully!");
        setIsSubmitted(true);
      } else {
        alert("Profile already exists or error occurred.");
        console.error("Server response:", data);
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error("Error submitting profile:", err);
    }
  };

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl text-center font-semibold text-black capitalize dark:text-white">
        Rescue Member Profile
      </h2>
      <section className="lg:w-[950px] w-[350px] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        {isSubmitted && (
          <p className="text-center text-green-600 font-medium mb-4">
            Profile already submitted.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          {/* PERSONAL INFORMATION */}
          <div className="border-b-2 pb-10">
            <h2 className="text-xl font-semibold text-black capitalize dark:text-white">Personal Information</h2>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <InputField id="fullName" label="Full Name" value={user.displayName} readOnly />
              <InputField id="email" label="Email Address" type="email" value={user.email} readOnly />
              <InputField id="phone" label="Phone Number" value={formData.phone} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="location" label="Current Location / Station" value={formData.location} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="summary" label="Personal Summary" value={formData.summary} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="shift" label="Shift Schedule" value={formData.shift} onChange={handleChange} required disabled={isSubmitted} />
              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="availability">Availability Status</label>
                <select
                  id="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  disabled={isSubmitted}
                  className="block w-full px-4 py-2 mt-2 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                >
                  <option>Available</option>
                  <option>On Mission</option>
                  <option>Off Duty</option>
                </select>
              </div>
            </div>
          </div>

          {/* EXPERIENCE AND SKILLS */}
          <div className="border-b-2 pb-10">
            <h2 className="text-xl font-semibold text-black capitalize dark:text-white">Experience and Skills</h2>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <InputField id="specialty" label="Specialty / Skills" value={formData.specialty} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="company" label="Company" value={formData.company} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="expLocation" label="Location" value={formData.expLocation} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="role" label="Role" value={formData.role} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="expStartDate" label="Start Date" type="date" value={formData.expStartDate} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="expEndDate" label="End Date" type="date" value={formData.expEndDate} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="responsibilities" label="Responsibilities" value={formData.responsibilities} onChange={handleChange} required disabled={isSubmitted} />
            </div>
          </div>

          {/* EDUCATION */}
          <div className="border-b-2 pb-10">
            <h2 className="text-xl mt-8 font-semibold text-black capitalize dark:text-white">Education</h2>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <InputField id="degree" label="Degree" value={formData.degree} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="university" label="College/University" value={formData.university} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="eduStartDate" label="Start Date" type="date" value={formData.eduStartDate} onChange={handleChange} required disabled={isSubmitted} />
              <InputField id="eduEndDate" label="End Date" type="date" value={formData.eduEndDate} onChange={handleChange} required disabled={isSubmitted} />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 w-full text-white bg-gray-700 rounded-md hover:bg-gray-600"
              disabled={isSubmitted}
            >
              {isSubmitted ? "Already Saved" : "Save"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

const InputField = ({ id, label, type = "text", value, onChange, readOnly = false, required = false, disabled = false }) => (
  <div>
    <label className="text-gray-700 dark:text-gray-200" htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      disabled={disabled}
      className="block w-full px-4 py-2 mt-2 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
    />
  </div>
);

export default Profile;
