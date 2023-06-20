import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const schema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, {message: 'Name should be at least 2 characters long'}),
    email: z.string().email(),
    phone: z.string().min(1, {message: 'Mobile Phone is required'})
})

type UserData = z.infer <typeof schema>

interface Props {
    onSubmit: (data:UserData) => void;
}

const UserForm = ( {onSubmit}:Props ) => {
    const { register, handleSubmit, reset, formState: {errors} } = useForm <UserData> ( {resolver: zodResolver(schema)} );
    
  return (<>
  <h1 className="display-6">Add a new contact.</h1>

    <form onSubmit={handleSubmit(data => {
        onSubmit(data)
        reset()
    })}>


    <div className="mb-3">
        <input {...register('name')} id="name" type="text" className="form-control" placeholder="Name" />
        {errors.name && <p className='text-danger'>{errors.name.message}</p>}
    </div>

    <div className="mb-3">
        <input {...register('email')} id="email" type="email" className="form-control" placeholder="Email" />
        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
    </div>

    <div className="mb-3">
        <input {...register('phone')} id="phone" type="text" className="form-control" placeholder="Mobile Phone" />
        {errors.phone && <p className='text-danger'>{errors.phone.message}</p>}
    </div>

    <button type="submit" className="btn btn-outline-primary rounded-0">Add contact</button>
    </form>
    </>)
}

export default UserForm