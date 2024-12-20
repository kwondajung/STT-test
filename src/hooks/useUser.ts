import { getUserClient } from "@/api/supabase/getUserClient";

import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserClient()
  });

  return { userInfo, isLoading };
};
