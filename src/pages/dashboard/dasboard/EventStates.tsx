import card from '../../../../public/dashboard/card.svg';
import user from '../../../../public/dashboard/user.svg';

const data = [
    {
        name: 'Total Seller',
        count: '$88k',

        textColor: '#FBB040',
        image: user,
        alt: 'earing',
    },
    {
        name: 'Total Visitor',
        count: '820',

        bgColor: '#FDF6EC',
        image: card,
        alt: 'user',
    },
];

const EventStates = () => {
    return (
        <div>
            <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-9 my-4">
                {data.map((item) => (
                    <div key={item.name} className="bg-bgHeader rounded-md p-4  w-full shadow-sm ">
                        <div className="flex  items-center gap-3 px-4">
                            <div className={` w-[54px] h-[54px] rounded-full flex items-center justify-center `}>
                                <img src={item.image} width={80} height={80} alt={item.alt} />
                            </div>
                            <div className=" flex flex-col gap-1 ">
                                <p className="text-2xl font-medium text-textGray">{item.name}</p>

                                <p className="text-2xl font-semibold text-textYellow">{item.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventStates;
