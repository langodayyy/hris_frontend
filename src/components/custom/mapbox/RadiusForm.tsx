"user client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EmployeeResponse } from "@/types/employee";
import { useState } from "react";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/spinner";
import { useEdit } from "@/context/EditFormContext";

type Props = {
  onUpdate: () => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  selectedLocation?: {
    lat: number;
    lng: number;
  } | null;
  data_id?: string | number;
};

const RadiusForm = ({
  onUpdate,
  handleCancelClick,
  selectedLocation,
  data_id
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { setErrors, setSuccess } = useEdit();

  const handleSubmitForm = async () => {
    setLoading(true);

    try {
      const form = document.getElementById("radiusForm") as HTMLFormElement;
      const formData = new FormData(form);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/check-clock-rule`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (onUpdate) {
            onUpdate();
            setSuccess(responseData.success )
            handleCancelClick();
          }

      if (!response.ok) {
        setErrors(responseData.errors);
      };

    } catch (err) {
      console.error("Submit error:", err);
      // setErrors(err);
    } finally {
      setLoading(false);
    }
  };
  return (
      <form
        id="radiusForm"
        action=""
        onSubmit={(e) => {
          e.preventDefault(); // mencegah reload halaman
          handleSubmitForm();
        }}
      >
        <div className="mt-2 space-y-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="radius">Radius (meters)</Label>
            <Input
              name="radius"
              type="number"
              min="1"
              className="w-full no-spinner"
            />
            <input type="hidden" name="data_id" value={data_id} />
            <input
              type="hidden"
              name="latitude"
              value={selectedLocation?.lat}
            />
            <input
              type="hidden"
              name="longitude"
              value={selectedLocation?.lng}
            />
          </div>
        </div>
      <div className="flex gap-2 mt-2">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
        //   onClick={handleSaveClick}
        type="submit"
          disabled={loading}
          >
          {loading ? <Spinner size={"small"}></Spinner> : "Save"}
        </Button>
        <Button
          variant="destructive"
          size="lg"
          className="flex-1"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </div>
      <div className="mt-2 text-sm text-gray-500 text-center">
        Click on the map to place a marker
      </div>
    </form>
  );
};

export default RadiusForm;
