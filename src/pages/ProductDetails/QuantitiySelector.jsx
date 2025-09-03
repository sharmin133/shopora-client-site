// src/components/QuantitySelector.jsx
import React from "react";

const QuantitySelector = ({ quantity, setQuantity, stock }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded"
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="text-lg">{quantity}</span>
      <button
        className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded"
        onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
        disabled={quantity >= stock}
      >
        +
      </button>
      {stock === 0 && (
        <span className="ml-2 text-red-600 dark:text-red-400 font-medium">
          Stock Out
        </span>
      )}
    </div>
  );
};

export default QuantitySelector;
