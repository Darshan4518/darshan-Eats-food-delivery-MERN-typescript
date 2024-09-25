import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import { MenuInputState } from "../schema/menuSchema";

const MenuForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { addMenu, loading } = useMenuStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<MenuInputState>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addMenu(formData);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="sm:overflow-y-auto overflow-y-auto max-h-[90vh] p-4"
      >
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-gray-600 my-2">
            Add New Menu
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 w-full  dark:text-white font-bold"
              placeholder="Enter menu name"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700  dark:text-white"
            >
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 w-full  dark:text-white font-bold"
              placeholder="Enter menu description"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700  dark:text-white"
            >
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price.toString()}
              onChange={handleInputChange}
              className="mt-1 w-full  dark:text-white font-bold"
              placeholder="Enter menu price"
              required
            />
          </div>

          {profileImage && (
            <div className="relative w-full h-40 md:w-60 lg:w-80 mx-auto mb-4">
              <img
                src={profileImage}
                alt="Menu"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          )}

          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <Button
            type="button"
            onClick={handleImageClick}
            className="mb-4 w-full bg-blue-500 "
          >
            Upload Image
          </Button>

          {loading ? (
            <Button type="submit" className="w-full bg-orange-400">
              <Loader2 className=" animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-orange-400">
              Add Menu
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuForm;
