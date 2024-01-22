"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { API } from "@/lib/config";
interface RoleCategory {
  id: string;
  name: string;
}
interface AllCategory {
  id: string;
  name: string;
}

interface CategoryContextType {
  roleCategories: RoleCategory[];
  allCategories: AllCategory[];
  getAllCategories: () => Promise<void>;
  getCategory: (id: string) => Promise<void>;
}
// Create a context
const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

// Provider component
export const CategoryProvider = ({ children }: any) => {
  const [roleCategories, setRoleCategories] = useState<RoleCategory[]>([]);
  const [allCategories, setAllCategories] = useState<AllCategory[]>([]);

  const getCategory = async (id: string) => {
    const { data } = await axios.get(`${API}/api/jobSeeker/jobRoles`);

    data.map((role: any) => {
      if (role.id === id) {
        setRoleCategories(role.roleCategory);
      }
    });
  };
  const getAllCategories = async () => {
    const { data } = await axios.get(`${API}/jobSeeker/jobRoles`);
    const category = data.flatMap((role: any) => role.roleCategory);

    setAllCategories(category);
  };

  return (
    <CategoryContext.Provider
      value={{ roleCategories, getCategory, getAllCategories, allCategories }}
    >
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
