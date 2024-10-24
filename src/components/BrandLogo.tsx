import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BrandLogo() {
  return (
    <span className="flex items-center gap-2 font-semibold flex-shrink-0 text-2xl">
      <span className="h-10 w-10">
        <FontAwesomeIcon icon={faGlobe} />
      </span>
      <span>Tattoo Plan</span>
    </span>
  );
}
