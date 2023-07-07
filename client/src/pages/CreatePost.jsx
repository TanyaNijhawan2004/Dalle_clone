import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {preview} from '../assets';
import {getRandomPrompt} from '../utils';
import {Form, Loader} from '../Components';




const CreatePost = () => {
  //intialize navigate hook once the post ois created navigate back to the hook 
  const navigate=useNavigate();
  //new state field form
  const [form,setForm]=useState({
    name:'',
    prompt:'',
    image:''
  });

  const [generatingImg, setGeneratingImg]=useState(false);
  const [loading , setloading]=useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://localhost:3000/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://localhost:3000/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        
        const data = await response.json();
        console.log(data);
        setForm({ ...form, image: `data:image/jpeg;base64,${data.image}` });
      } catch (err) {
        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
                <h1 className='font-extra-bold text-[#222328] text-[32px]'>Create </h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[800px]">Create imaginative and visually stunning images through DALL-E AI and share them with community</p>
        </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}> 
      <div className="flex flex-col gap-5">
        <Form
         labelName="Your Name"
         type="text"
         name="name"
         placeholder="tanya"
         value={form.name}
         handleChange={handleChange}
        />
        <Form
         labelName="prompt"
         type="text"
         name="prompt"
         placeholder="A steampunk-inspired robot playing the violin, digital art"
         value={form.prompt}
         handleChange={handleChange}
         isSurpriseMe
         handleSurpriseMe={handleSurpriseMe}
        />

      <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.image ? (
              <img
                src={form.image}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div  className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
      </div>
      </div>

      <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
      </div>

      <div className='mt-8 ext-[#666e75] text-[16px] '>
        <p>
          Once created you can share your image with others on community 
        </p>
        <button type="submit"  className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          {loading ? 'Sharing':'Share with the community'}
        </button>
      </div>
      </form>
    </section>
  )
}

export default CreatePost