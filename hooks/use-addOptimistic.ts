import { useOptimistic, useState } from "react";
import { toast } from "sonner";

const defaultState = {
  message: "",
  success: false,
  error: false,
};

export function useAddOptimistic(
  action: (formData: FormData) => Promise<typeof defaultState>,
  initialState: typeof defaultState = defaultState
) {
  const [state, setState] = useState(initialState);
  const [optimisticState, setOptimisticState] = useOptimistic(state);

  async function formAction(formData: FormData) {
    setOptimisticState({ ...state, success: true });
    const result = await action(formData);

    setState(result);

    if (result.error) toast.error(result.message);
  }

  return {
    formAction,
    state: optimisticState,
  };
}
