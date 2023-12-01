import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/lib/api';
import { FormField } from '@/interfaces';

const formBuilder: FormField[] = [
  {
    id: 'username',
    type: 'text',
    label: 'Username',
    formOptions: {
      required: 'required'
    }
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    formOptions: {
      required: 'required',
      minLength: {
        value: 3,
        message: 'Min length is 3'
      }
    }
  }
];

export default function LoginForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {}
  });

  const router = useRouter();

  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const userData = await loginUser(data.username, data.password);
      if (userData.length > 0) {
        router.push('/expenses');
      } else {
        reset();
        console.error('Invalid username/password');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formBuilder.map(({ id, type, label, formOptions }, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-600" htmlFor={id}>
            {label}
          </label>
          <input
            id={id}
            {...register(id, formOptions)}
            type={type}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors[id] && (
            <span className="text-sm px-1 text-red-600" role="alert">
              {errors[id]?.message}
            </span>
          )}
        </div>
      ))}

      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}