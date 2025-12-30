import React from 'react'

const FormField = ({
  LabelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={name}
          className="text-sm font-semibold text-gray-300"
        >
          {LabelName}
        </label>

        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="text-xs font-semibold px-3 py-1 rounded-full
                       bg-gradient-to-r from-pink-500 to-purple-600
                       text-white hover:opacity-90 transition"
          >
            Surprise me
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-xl bg-[#0f172a]
                   border border-[#1f2937]
                   text-white placeholder-gray-500
                   focus:ring-2 focus:ring-indigo-500
                   focus:outline-none transition"
      />
    </div>
  )
}

export default FormField
