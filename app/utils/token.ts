import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export const getToken = async () => {
  try {
    const session = await getServerSession(authOptions);

    return session;
  } catch (error) {
    return "error not authorized";
  }
};
