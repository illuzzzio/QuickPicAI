import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://quickpicai-1-helion.onrender.com/api/v1/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        await fetch('https://quickpicai-1-helion.onrender.com/api/v1/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form }),
        });

        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-start bg-black px-6 py-14">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_0_60px_rgba(247,181,0,0.15)]">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(247,181,0,0.35)]">
            Create AI Art
          </h1>
          <p className="mt-3 text-gray-400 text-sm max-w-xl mx-auto">
            Turn imagination into visuals using QuickPicAI and share them with the world
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A cyberpunk Indian city at night, ultra-realistic…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <button
              type="button"
              onClick={generateImage}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.03] hover:shadow-green-500/40"
            >
              {generatingImg ? 'Generating…' : 'Generate Image'}
            </button>
          </div>

          {/* RIGHT */}
          <div className="relative h-[320px] rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center overflow-hidden">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-3/4 opacity-30"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Loader />
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="md:col-span-2 text-center mt-4">
            <p className="text-gray-400 text-sm mb-4">
              Once your image is ready, share it with the QuickPicAI community ✨
            </p>

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-10 py-3 font-bold text-black shadow-lg transition hover:scale-[1.04] hover:shadow-yellow-400/40"
            >
              {loading ? 'Sharing…' : 'Share with the Community'}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default CreatePost;
