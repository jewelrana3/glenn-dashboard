import card from '../../../../public/dashboard/card.svg';
import user from '../../../../public/dashboard/user.svg';
import { useGetAdminQuery } from '../../../redux/apiSlices/dashboard/dashboardSlice';

const EventStates = () => {
    const { data } = useGetAdminQuery(undefined);
    console.log(data);

    const datas = [
        {
            name: 'Total Seller',
            count: data?.data?.totalSeller,

            textColor: '#FBB040',
            image: user,
            alt: 'earing',
        },
        {
            name: 'Total Customer',
            count: data?.data?.totalCustomer,

            bgColor: '#FDF6EC',
            image: card,
            alt: 'user',
        },
        {
            name: 'Total Visitor',
            count: data?.data?.TotalVisitor,

            textColor: '#FBB040',
            image: user,
            alt: 'earing',
        },
        {
            name: 'Total Revenue',
            count: `$ ${data?.data?.TotalRevenue}`,

            bgColor: '#FDF6EC',
            image: card,
            alt: 'user',
        },
    ];
    return (
        <div>
            <div className="grid lg:grid-cols-4 gap-9 my-4">
                {datas.map((item) => (
                    <div key={item.name} className="bg-bgHeader rounded-md p-4  w-full shadow-sm ">
                        <div className="flex  items-center gap-3 px-4">
                            <div className={` w-[54px] h-[54px] rounded-full flex items-center justify-center `}>
                                <img src={item.image} width={80} height={80} alt={item.alt} />
                            </div>
                            <div className=" flex flex-col gap-1 ">
                                <p className="text-2xl font-medium text-textGray">{item.name}</p>

                                <p className="text-2xl font-semibold text-textYellow ml-1">{item.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventStates;
