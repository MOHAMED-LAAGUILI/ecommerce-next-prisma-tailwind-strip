"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../_actions/ProductsActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Assuming you have react-toastify installed

export function ProductActiveToggle({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const handleToggle = async () => {
    startTransition(async () => {
      // Toggle the availability and pass the new value (opposite of current state)
      await toggleProductAvailability(id, !isAvailableForPurchase);
      router.refresh()

    });
  };

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={handleToggle}
      className={`cursor-pointer ${isPending ? "opacity-50" : ""}`} // Optional: Add visual cue for pending state
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteDropItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteProduct(id);
      router.refresh();
    });
  };

  const confirmDelete = () => {
    toast(
      <div>
        <span>Are you sure you want to delete this item?</span>
        <div className="flex gap-4 mt-2">
          <button
            className="px-4 py-2 rounded bg-red-500 text-white"
            onClick={() => {
              handleDelete();
              toast.dismiss(); // Close the toast
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-500 text-white"
            onClick={() => toast.dismiss()} // Close the toast
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false, // Don't auto-close the toast, user has to confirm
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        theme: "dark",
      }
    );
  };

  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={confirmDelete} // Show the confirmation toast
      className={`cursor-pointer ${isPending ? "opacity-50" : ""}`} // Optional: Add visual cue for pending state
    >
      Delete
    </DropdownMenuItem>
  );
}