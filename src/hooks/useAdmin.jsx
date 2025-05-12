import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";

function useAdmin() {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: isAdmin = false,
    isPending,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email, // only run if email exists
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
    staleTime: 0, // always fetch fresh
  });

  return [isAdmin, isPending || isLoading, isError, refetch];
}

export default useAdmin;
