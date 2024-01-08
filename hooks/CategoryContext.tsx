// "use client";

// import { API } from "@/lib/config";
// import axios from "axios";
// import { useState } from "react";

// export const useCategory = () => {
//   const [roleCategories, setRoleCategories] = useState<
//     { id: string; name: string; jobRolesId?: string }[]
//   >([]);

//   const getCategory = async (id: string) => {
//     const { data } = await axios.get(`${API}/jobSeeker/jobRoles`);

//     data.map((role: any) => {
//       if (role.id === id) {
//         setRoleCategories(role.roleCategory);
//       }
//     });
//   };
//   console.log(roleCategories);
//   return {
//     roleCategories,
//     getCategory,
//   };
// };
// CategoryContext.js
"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { API } from "@/lib/config";
interface RoleCategory {
  id: string;
  name: string;
}

interface CategoryContextType {
  roleCategories: RoleCategory[];
  getCategory: (id: string) => Promise<void>;
}
// Create a context
const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

// Provider component
export const CategoryProvider = ({ children }: any) => {
  const [roleCategories, setRoleCategories] = useState<RoleCategory[]>([]);

  const getCategory = async (id: string) => {
    const { data } = await axios.get(`${API}/jobSeeker/jobRoles`);

    data.map((role: any) => {
      if (role.id === id) {
        setRoleCategories(role.roleCategory);
      }
    });
  };

  return (
    <CategoryContext.Provider value={{ roleCategories, getCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook to use the context
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
