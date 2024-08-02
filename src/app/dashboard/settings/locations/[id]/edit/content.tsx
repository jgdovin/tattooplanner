"use client";

import { LocationForm } from "@/forms/locationForm";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Content({ defaultValues }: any) {
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState<any>({});
  const clearMessages = () => {
    setErrors({});
    setSuccess({});
  };
  return (
    <div className="flex flex-col w-[800px] mt-5 ml-16">
      <div className="self-end">
        <Button
          variant="ghost"
          className="w-1/6"
          onClick={() => {
            window.location.href = `/dashboard/settings/locations`;
          }}
        >
          <FontAwesomeIcon className="h-4" icon={faX} />
        </Button>
      </div>
      {success.message && (
        <div className="bg-green-200 border border-green-400 rounded-md min-h-10 py-2 text-center">
          Successfully updated location
        </div>
      )}
      {errors.message && (
        <div className="bg-red-200 border border-red-400 rounded-md min-h-10 py-2 text-center">
          Failed to update location: {errors.message}
        </div>
      )}
      <LocationForm
        defaultValues={defaultValues}
        handleSubmit={(formData: any) => {
          if (!formData.id) throw new Error("No Location ID provided");
          clearMessages();
          const url = `/api/location/${formData.id}`;
          const response = fetch(url, {
            method: "PATCH",
            body: JSON.stringify(formData),
          });
          response
            .then((res) => {
              if (res.ok) {
                setSuccess({ message: "Successfully updated location" });
                return;
              }
              res.json().then((data) => {
                if (data.error) setErrors({ message: data.message });
              });
            })
            .catch((err) => {
              console.log("ERROR", err);
              setErrors({ message: err.message });
              console.error(err);
            });
        }}
      />
      <Button form="locationForm" className="mt-10">
        Save Changes
      </Button>
    </div>
  );
}
