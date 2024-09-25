import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Edit, Upload } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UserInputState } from "@/schema/authScheama";
import { useUserStore } from "@/store/useUserStore";

const EditProfile = () => {
  const { user, loading, updateUser } = useUserStore();

  const [profileImage, setProfileImage] = useState<string | null>(
    user.profilePicture || null
  );
  const [input, setInput] = useState<UserInputState>({
    fullName: user.fullName || "",
    country: user.country || "",
    contact: user.contact || "",
    address: user.address || "",
    city: user.city || "",
    profilePicture: undefined,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setInput({ ...input, profilePicture: file });
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser(input);
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Profile
        </h2>

        {/* Profile Image Upload */}
        <div className="mb-6 flex flex-col items-center gap-2">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Upload className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Change Profile Image
            </Label>
            {/* Hidden file input */}
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </Label>
          <Input
            type="text"
            value={user.email}
            disabled={true}
            className=" dark:text-white font-bold  mt-1"
          />
        </div>
        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={input.fullName}
              onChange={handleInputChange}
              className="mt-1 dark:text-white"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contact
            </Label>
            <Input
              id="contact"
              name="contact"
              value={input.contact}
              onChange={handleInputChange}
              className="mt-1 dark:text-white"
              placeholder="Contact"
              required
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Country
            </Label>
            <Input
              id="country"
              name="country"
              value={input.country}
              onChange={handleInputChange}
              className="mt-1 dark:text-white"
              placeholder="Country"
              required
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={input.address}
              onChange={handleInputChange}
              className="mt-1 dark:text-white"
              placeholder="Address"
              required
            />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={input.city}
              onChange={handleInputChange}
              className="mt-1 dark:text-white"
              placeholder="City"
              required
            />
          </div>

          <Button type="submit" className="mt-4">
            {loading ? (
              <>
                <Edit className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Update Profile
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
