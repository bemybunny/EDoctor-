import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddDoctor = () => {
  const navigate = useNavigate();
  const [formField, setFormField] = useState({
    name: '',
    email: '',
    specialization: '',
    college: '',
    experience: '',
    password: '',
    file: null,
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const Baseurl = import.meta.env.VITE_API_BASE_URL;
  const PASSWORD = import.meta.env.VITE_PASSWORD;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files && files.length > 0) {
      setFormField({
        ...formField,
        [name]: files[0], // Store only the first file if multiple files are selected
      });
    } else {
      setFormField({
        ...formField,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (PASSWORD !== formField.password) {
      Swal.fire({
        title: 'Error',
        text: 'Wrong Password',
        icon: 'error',
      });
      return;
    }

    const formData = new FormData();
    formData.append('email', formField.email);
    formData.append('password', formField.password);

    if (isSignUp) {
      formData.append('name', formField.name);
      formData.append('specialization', formField.specialization);
      formData.append('college', formField.college);
      formData.append('experience', formField.experience);
      formData.append('file', formField.file);
    }

    try {
      const post = isSignUp ? 'signup' : 'login';
      const response = await axios.post(`${Baseurl}/api/doctor/${post}`, formData);
      setFormField({
        name: '',
        email: '',
        specialization: '',
        college: '',
        experience: '',
        password: '',
        file: null,
      });
      localStorage.clear();
      localStorage.setItem('auth-token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    }
  };

  const handleAuthChange = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-[#434974] to-[#242949] space-y-12 rounded-xl">
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <label className="text-white w-1/4" htmlFor="email">
            Email
          </label>
          <input
            className="w-3/4 p-2 rounded"
            id="email"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formField.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-white w-1/4" htmlFor="password">
            Password
          </label>
          <input
            className="w-3/4 p-2 rounded"
            id="password"
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formField.password}
            onChange={handleChange}
          />
        </div>
        {isSignUp && (
          <>
            <div className="flex justify-between items-center">
              <label className="text-white w-1/4" htmlFor="name">
                Name
              </label>
              <input
                className="w-3/4 p-2 rounded"
                id="name"
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formField.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-white w-1/4" htmlFor="specialization">
                Specialization
              </label>
              <input
                className="w-3/4 p-2 rounded"
                id="specialization"
                type="text"
                name="specialization"
                placeholder="Enter Your Specialization"
                value={formField.specialization}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-white w-1/4" htmlFor="college">
                College Name
              </label>
              <input
                className="w-3/4 p-2 rounded"
                id="college"
                type="text"
                name="college"
                placeholder="Enter College Name"
                value={formField.college}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-white w-1/4" htmlFor="experience">
                Experience
              </label>
              <input
                className="w-3/4 p-2 rounded"
                id="experience"
                type="text"
                name="experience"
                placeholder="Enter Your Experience"
                value={formField.experience}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-white w-1/4" htmlFor="file">
                Profile Photo
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
              />
              {formField.file && (
                <img className="mt-4 h-32 w-32 object-cover rounded" src={URL.createObjectURL(formField.file)} alt="Uploaded" />
              )}
            </div>
          </>
        )}
        {isSignUp ? (
          <p className="text-white tracking-wider">
            Already have an account?{' '}
            <span onClick={handleAuthChange} className="cursor-pointer underline text-purple-500 hover:text-purple-500">
              SignIn
            </span>
          </p>
        ) : (
          <p className="text-white tracking-wider">
            Don't have an account?{' '}
            <span onClick={handleAuthChange} className="cursor-pointer underline text-purple-500 hover:text-purple-500">
              SignUp
            </span>
          </p>
        )}
        <div className="flex justify-center">
          <button className="text-white bg-purple-500 px-4 py-1 rounded hover:bg-purple-700 text-xl" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
