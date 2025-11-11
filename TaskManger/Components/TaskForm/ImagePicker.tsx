import React from "react";
import { FiLink } from "react-icons/fi";

interface ImagePickerProps {
  imageUrl: string | null;
  onChange: (url: string | null) => void;
}

const defaultImages: string[] = [
  "https://picsum.photos/150/150?random=1",
  "https://picsum.photos/150/150?random=2",
  "https://picsum.photos/150/150?random=3",
  "https://picsum.photos/150/150?random=4",
];

const ImagePicker: React.FC<ImagePickerProps> = ({ imageUrl, onChange }) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700">
      Image URL
    </label>
    <div className="relative mt-1">
      <input
        type="url"
        placeholder="Enter image link here"
        name="imageUrl"
        className="block w-full border-gray-300 rounded-lg shadow-sm p-3 border pr-10 focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
        value={imageUrl || ""}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FiLink className="h-5 w-5 text-gray-400" />
      </div>
    </div>

    <div className="mt-2 grid grid-cols-2 gap-2 p-1">
      {defaultImages.map((url, index) => (
        <div
          key={index}
          onClick={() => onChange(url)}
          className={`w-full h-40 rounded-lg overflow-hidden cursor-pointer border-2 transition duration-200 ${
            imageUrl === url
              ? "border-indigo-500 ring-2 ring-indigo-500"
              : "border-gray-300 hover:border-indigo-400"
          }`}
        >
          <img
            src={url}
            alt={`Default ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div
        onClick={() => onChange(null)}
        className={`w-full h-16 rounded-lg overflow-hidden cursor-pointer border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition duration-200 text-sm col-span-2 ${
          !imageUrl ? "bg-gray-200" : ""
        }`}
      >
        Clear Selection
      </div>
    </div>
  </div>
);

export default ImagePicker;
