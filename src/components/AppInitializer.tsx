"use client";

import { useEffect } from "react";
import { seedInitialData } from "@/services/quiz.service";

/**
 * This component handles one-time application initialization logic
 * that needs to run on the client, such as seeding localStorage.
 * It renders null and does not affect the DOM.
 */
export const AppInitializer = () => {
  useEffect(() => {
    seedInitialData();
  }, []);

  return null;
};
