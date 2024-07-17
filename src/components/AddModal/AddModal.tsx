import React, { useState } from 'react';
import Modal from 'react-modal';
import { apiInstance } from '../../utils/api';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface AddModalProps {
    modalIsOpen: boolean,
    closeModal(): void
}

const AddModal = ({ modalIsOpen, closeModal }: AddModalProps) => {
    const [heading, setHeading] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setloading] = useState(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (heading === "" && details === '' && image === null) {
            toast.error('please entre the data')
            return
        }
        // Create form data
        const formData = new FormData();
        if (heading) {
            formData.append('heading', heading);
        }
        if (details) {
            formData.append('details', details);
        }
        if (image) {
            formData.append('image', image);
        }
        try {
            setloading(true)
            await apiInstance.post('post/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setHeading('');
            setDetails('')
            setImage(null)
            toast.success('Created Successfully')
            closeModal();
        } catch (error) {
            // Handle error
            console.error('Error sending data:', error);
        }
        setloading(false)
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className='w-full flex justify-end hover:cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" onClick={closeModal}>
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                </svg>
            </div>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label className='w-full' htmlFor="heading">Heading</label>
                <input
                    className='w-full my-4 border-b-2 border-green-400 p-3'
                    type="text"
                    id='heading'
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                />
                <label className='w-full' htmlFor="details">Details</label>
                <textarea
                    className='w-full my-4 border-b-2 border-green-400 p-3'
                    rows={5}
                    id='details'
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <label className='w-full' htmlFor="img">Image</label>
                <input
                    className='w-full my-4 border-b-2 border-green-400 p-3'
                    type="file"
                    accept="image/jpeg, image/png"
                    id='img'
                    onChange={handleFileChange}
                />

                <button className='bg-blue-200 p-3 hover:bg-blue-500' type="submit" disabled={loading}>{loading? 'LOADING...': 'Add'}</button>

            </form>
        </Modal>
    );
};

export default AddModal;
