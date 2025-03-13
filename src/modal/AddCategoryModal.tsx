import React, { useState } from 'react';
import Modal from './Modal';
import { useCreateCategoryMutation } from '../redux/apiSlices/categorySlice';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddCategoryModal = ({ isOpen, onClose }: AddCategoryModalProps) => {
    const [createCategory] = useCreateCategoryMutation();
    const [formData, setFormData] = useState({
        fuel: '',
        carType: '',
        interiorColor: '',
        seat: '',
        transmission: '',
        price: '',
        logo: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createCategory(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-[#E6F2FF] p-6 rounded-lg shadow-lg w-[500px]">
                <h2 className="text-xl font-semibold mb-4">Add new category</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Fuel */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fuel" className="block text-sm font-medium">
                                Fuel
                            </label>
                            <input
                                type="text"
                                id="fuel"
                                name="fuel"
                                value={formData.fuel}
                                onChange={handleChange}
                                placeholder="Enter your fuel category"
                                className="w-full h-12   bg-[#EBF4FF] rounded-lg px-4 focus:outline-none"
                            />
                        </div>

                        {/* Car Type */}
                        <div>
                            <label htmlFor="carType" className="block text-sm font-medium">
                                Car Type
                            </label>
                            <input
                                type="text"
                                id="carType"
                                name="carType"
                                value={formData.carType}
                                onChange={handleChange}
                                placeholder="Enter your Car Type"
                                className="w-full h-12 bg-[#EBF4FF] rounded-lg px-4 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Interior Color */}
                        <div>
                            <label htmlFor="interiorColor" className="block text-sm font-medium">
                                Interior Color
                            </label>
                            <input
                                type="text"
                                id="interiorColor"
                                name="interiorColor"
                                value={formData.interiorColor}
                                onChange={handleChange}
                                placeholder="Enter your Interior Color"
                                className="w-full h-12 bg-[#EBF4FF] rounded-lg px-4 focus:outline-none"
                            />
                        </div>

                        {/* Seat */}
                        <div>
                            <label htmlFor="seat" className="block text-sm font-medium">
                                Seat
                            </label>
                            <input
                                type="text"
                                id="seat"
                                name="seat"
                                value={formData.seat}
                                onChange={handleChange}
                                placeholder="Enter your seat number"
                                className="w-full h-12 bg-[#EBF4FF] rounded-lg px-4 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Transmission */}
                        <div>
                            <label htmlFor="transmission" className="block text-sm font-medium">
                                Transmission
                            </label>
                            <input
                                type="text"
                                id="transmission"
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                placeholder="Enter your Transmission"
                                className="w-full h-12 bg-[#EBF4FF] rounded-lg px-4 focus:outline-none"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium">
                                Price
                            </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter your $990/Day"
                                className="w-full h-12 bg-[#EBF4FF] rounded-lg px-4 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Logo */}
                    <div>
                        <label htmlFor="logo" className="block text-sm font-medium">
                            Logo
                        </label>
                        <input
                            type="text"
                            id="logo"
                            name="logo"
                            value={formData.logo}
                            onChange={handleChange}
                            placeholder="Enter your Logo"
                            className="w-full h-12 bg-[#EBF4FF] rounded-lg px-4 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg mt-4">
                        Submit
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default AddCategoryModal;
