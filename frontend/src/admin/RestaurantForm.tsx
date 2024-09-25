import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ImageIcon, Loader2 } from "lucide-react";
import { restaurantInputState } from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const RestaurantForm = () => {
  const {
    loading,
    createRestaurant,
    restaurant,
    getRestaurant,
    updateRestaurant,
  } = useRestaurantStore();

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formdata, setFormdata] = useState<restaurantInputState>({
    restaurantName: "",
    restaurantDescription: "",
    cuisines: [""],
    country: "",
    address: "",
    deliveryTime: 0,
    city: "",
    imageFile: undefined,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        setFormdata({
          restaurantName: restaurant.restaurantName,
          restaurantDescription: restaurant.restaurantDescription,
          cuisines: restaurant.cuisines || [""],
          country: restaurant.country,
          address: restaurant.address,
          deliveryTime: restaurant.deliveryTime || 0,
          city: restaurant.city,
          imageFile: undefined,
        });
        setProfileImage(restaurant.imageUrl);
      }
    };
    fetchRestaurant();
  }, [getRestaurant]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setFormdata({ ...formdata, imageFile: file });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: name === "deliveryTime" ? +value : value,
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (restaurant) {
      await updateRestaurant(formdata);
    } else {
      await createRestaurant(formdata);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-5 ">
        <div className="max-w-xl lg:max-w-3xl w-full p-6 bg-white shadow-md rounded-lg mx-auto dark:bg-gray-800">
          <h3 className="text-gray-700 font-bold text-2xl text-center dark:text-gray-300">
            {restaurant ? "Update Restaurant" : "Add Restaurant"}
          </h3>
          <form onSubmit={handleSubmit} className="my-2">
            <div className="mb-4">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                id="restaurantName"
                name="restaurantName"
                value={formdata.restaurantName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="restaurantDescription">Description</Label>
              <Input
                id="restaurantDescription"
                name="restaurantDescription"
                value={formdata.restaurantDescription}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formdata.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formdata.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formdata.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="cuisines">Cuisines</Label>
              <Input
                id="cuisines"
                name="cuisines"
                value={formdata.cuisines.join(",")}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    cuisines: e.target.value.split(","),
                  })
                }
                placeholder="e.g. Indian, Italian, Chinese"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="deliveryTime">Delivery Time (in minutes)</Label>
              <Input
                id="deliveryTime"
                name="deliveryTime"
                type="number"
                value={formdata.deliveryTime.toString()}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            {profileImage && (
              <div className="relative w-full h-40 md:w-80">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex flex-col items-start gap-4 my-3">
              <Button onClick={handleImageClick} type="button" variant="ghost">
                <ImageIcon className="w-6 h-6" />
                <Label>{profileImage ? "Change Image" : "Upload Image"}</Label>
              </Button>
            </div>
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                className="mt-4 bg-orange-500 hover:bg-orange-400 dark:bg-orange-600 dark:hover:bg-orange-500"
                variant="secondary"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : restaurant ? (
                  "Update Restaurant"
                ) : (
                  "Add Restaurant"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantForm;
