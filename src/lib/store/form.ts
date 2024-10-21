import { atom, useAtom } from "jotai";

// A factory function to create form state atoms
export function createFormState() {
  const isEditingAtom = atom(false);
  const activeIdAtom = atom<string | null>(null);
  const isDirtyAtom = atom(false);

  return {
    isEditingAtom,
    activeIdAtom,
    isDirtyAtom,
  };
}

// Example of a hook to use the form state
export function useFormState() {
  const { isEditingAtom, activeIdAtom, isDirtyAtom } = createFormState();

  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [activeId, setActiveId] = useAtom(activeIdAtom);
  const [isDirty, setIsDirty] = useAtom(isDirtyAtom);

  const setFormDirty = () => setIsDirty(true);
  const resetFormState = () => {
    setIsEditing(false);
    setActiveId(null);
    setIsDirty(false);
  };

  return {
    isEditing,
    setIsEditing,
    activeId,
    setActiveId,
    isDirty,
    setFormDirty,
    resetFormState,
  };
}
