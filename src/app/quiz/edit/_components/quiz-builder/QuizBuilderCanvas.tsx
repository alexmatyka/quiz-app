"use client";

import { useState } from "react";

export const QuizBuilderCanvas = () => {
  const [isOver, setIsOver] = useState(false);

  return (
    <div className="flex flex-col w-full h-full px-4 py-4">
      <div className="mb-2 text-gray-600 font-medium">Dropable Area</div>

      {/* biome-ignore lint/a11y/useSemanticElements: using div with role="region" for droppable canvas area */}
      <div
        role="region"
        aria-label="Drop area"
        className={`flex-1 border-2 border-dashed rounded-lg flex-col gap-2 transition-colors
      ${isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOver(false);
        }}
      >
        {isOver ? (
          <p className="text-blue-500 text-center">Release to drop</p>
        ) : (
          <p className="text-gray-400 text-center">Drag blocks here</p>
        )}
      </div>
    </div>
  );
};
