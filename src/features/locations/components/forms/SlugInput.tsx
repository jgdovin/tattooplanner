"use client";
import { InputField } from "@/components/forms/components/inputField";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faSpinner,
  faSearch,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export const SlugInput = ({
  form,
  isEditing,
}: {
  form: any;
  isEditing: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [subdomainValid, setSubdomainValid] = useState<boolean | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const { watch } = form;
  const watchSlug = watch("slug");

  useEffect(() => {
    if (!watchSlug) return;
    setHasChecked(false);
    setSubdomainValid(null);
  }, [watchSlug]);

  const checkAvailability = async ({ slug }: { slug: string }) => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/location/checkSlugAvailability/${slug}`
      );
      setSubdomainValid(res.data.available);
    } catch (error) {
      console.error(error);
      setSubdomainValid(false);
    } finally {
      setLoading(false);
      setHasChecked(true);
    }
  };

  const handleCheckAvailability = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { slug } = form.getValues();
    checkAvailability({ slug });
  };

  const getButtonVariant = () => {
    if (loading) return "outline";
    if (!hasChecked) return "default";
    return subdomainValid ? "accent" : "destructive";
  };

  const Icon = ({ icon, spin }: { icon: IconDefinition; spin?: boolean }) => (
    <FontAwesomeIcon icon={icon} className="mr-2 w-3 h-3" spin={spin} />
  );

  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <Icon icon={faSpinner} spin />
          &nbsp;Checking Availability
        </>
      );
    }
    if (!hasChecked) {
      return (
        <>
          <Icon icon={faSearch} />
          &nbsp;Check Availability
        </>
      );
    }
    if (subdomainValid) {
      return (
        <>
          <Icon icon={faCheckCircle} />
          &nbsp;Available
        </>
      );
    }
    return (
      <>
        <Icon icon={faTimesCircle} />
        &nbsp;Unavailable
      </>
    );
  };

  return (
    <>
      <InputField
        autoComplete="off"
        name="slug"
        form={form}
        label="Subdomain"
        required={true}
        disabled={isEditing}
      />
      {!isEditing && (
        <Button onClick={handleCheckAvailability} variant={getButtonVariant()}>
          {getButtonContent()}
        </Button>
      )}
    </>
  );
};
