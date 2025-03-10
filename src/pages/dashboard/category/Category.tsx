import { useState } from 'react';
import CategoryModal from '../../../modal/CategoryModal';
import Button from '../../../components/shared/Button';
import AddCategoryModal from '../../../modal/AddCategoryModal';
import user from '../../../../public/dashboard/user.svg';
import man from '../../../../public/category/men.svg';
import calender from '../../../../public/category/calender.svg';
import image1 from '../../../../public/category/image1.svg';
import image2 from '../../../../public/category/image2.png';
import image3 from '../../../../public/category/image3.svg';

const data = [
    {
        title: 'Equestrian Family House',
        revenue: '38,440',
        city: 'Singapore',
        amount: '678',
        men: 'Sole proprietorship',
        year: '1998',
        user: user,
        man: man,
        calender: calender,
        image: image1,
    },
    {
        title: 'Equestrian Family House',
        revenue: '38,440',
        city: 'Singapore',
        amount: '678',
        men: 'Sole proprietorship',
        year: '1998',
        user: user,
        man: man,
        calender: calender,
        image: image2,
    },
    {
        title: 'Equestrian Family House',
        revenue: '38,440',
        city: 'Singapore',
        amount: '678',
        men: 'Sole proprietorship',
        year: '1998',
        user: user,
        man: man,
        calender: calender,
        image: image3,
    },
    {
        title: 'Equestrian Family House',
        revenue: '38,440',
        city: 'Singapore',
        amount: '678',
        men: 'Sole proprietorship',
        year: '1998',
        user: user,
        man: man,
        calender: calender,
        image: image2,
    },
    {
        title: 'Equestrian Family House',
        revenue: '38,440',
        city: 'Singapore',
        amount: '678',
        men: 'Sole proprietorship',
        year: '1998',
        user: user,
        man: man,
        calender: calender,
        image: image3,
    },
    {
        title: 'Equestrian Family House',
        revenue: '38,440',
        city: 'Singapore',
        amount: '678',
        men: 'Sole proprietorship',
        year: '1998',
        user: user,
        man: man,
        calender: calender,
        image: image1,
    },
];

const Category = () => {
    const [categoryDetails, setCategoryDetails] = useState<boolean>(false);
    const [createModal, setCreateModal] = useState(false);

    return (
        <>
            <div className="flex justify-end my-6 pr-5" onClick={() => setCreateModal(true)}>
                <Button className="text-base">+ Add Category</Button>
            </div>

            <div className="grid grid-cols-3 gap-5 pr-5">
                {data.map(({ title, revenue, city, amount, men, year, user, man, calender, image }) => (
                    <div key={title} className="rounded-lg border border-gray-200 bg-white shadow-lg mb-6 ">
                        <img
                            src={image} // Replace with your image URL
                            alt="Hospital"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">{title}</h2>
                                <p className="text-primaryColor font-bold">Revenue: ${revenue}</p>
                            </div>
                            <p className="text-sm text-gray-500">{city} City</p>
                            <div className="flex items-center justify-between space-x-4 mt-5">
                                <div className="flex items-center gap-1">
                                    <img src={user} alt="user" className="w-5 h-5" />
                                    <span className="ml-1">{amount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src={man} alt="men" className="w-5 h-5" />
                                    <span className="ml-1">{men}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src={calender} alt="calendar" className="w-5 h-5" />
                                    <span className="ml-1">{year}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category details modal */}
            {categoryDetails && <CategoryModal isOpen={categoryDetails} onClose={() => setCategoryDetails(false)} />}
            {/* Add category modal */}
            {createModal && <AddCategoryModal isOpen={createModal} onClose={() => setCreateModal(false)} />}
        </>
    );
};

export default Category;
