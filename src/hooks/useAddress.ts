import { API_ROUTES, HTTP_METHODS } from "@/utils/constant";
import { fetcher } from "@/utils/fetcher";
import { Address } from "cluster";

const useAddress = () => {
  const addAddress = async (name: string) => {
    try {
      return await fetcher<Address>(HTTP_METHODS.POST, API_ROUTES.ADDRESS, {
        name,
      });
    } catch (error) {
      throw error;
    }
  };
  return { addAddress };
};

export default useAddress;
