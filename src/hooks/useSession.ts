import AuthContext, { AuthContextData } from "@/contexts/AuthContext";
import { useContext } from "react";

const useSession = (): AuthContextData => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useSession;
