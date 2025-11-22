"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { seedInitialData } from "@/services/quiz.service";

/**
 * This component handles one-time application initialization logic
 * that needs to run on the client, such as seeding localStorage.
 * It also add react-hot-toast init
 */
export const AppInitializer = () => {
  useEffect(() => {
    seedInitialData();
  }, []);

  return <Toaster />;
};
