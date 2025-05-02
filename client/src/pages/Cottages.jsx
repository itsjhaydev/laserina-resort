import CottageCard from '../components/CottageCard';
import PonsideCottage from '../assets/cottage/pondsidecottage.png';
import LargeKuboCottage from '../assets/cottage/largekubocottage.png';
import UmbrellaCottage from '../assets/cottage/umbrellacottage.png';
import KuboCottage from '../assets/cottage/kubocottage.png';
import RockCottages from '../assets/cottage/rockcottages.png';

const services = [
    {
        image: PonsideCottage,
        title: 'Pondside Cottage',
        description: 'Cozy cottage with beautiful pond views. Perfect for 6-12 people.',
        cottage_price: 200,
        cottage_id: 'pondside',
    },
    {
        image: LargeKuboCottage,
        title: 'Large Kubo Cottage',
        description: 'Spacious native-style cottage for groups up to 10 people.',
        cottage_price: 200,
        cottage_id: 'largekubo',
    },
    {
        image: UmbrellaCottage,
        title: 'Umbrella Cottage',
        description: 'Open-air shaded area, perfect for outdoor meals and relaxation.',
        cottage_price: 200,
        cottage_id: 'umbrella',
    },
    {
        image: KuboCottage,
        title: 'Kubo Cottage',
        description: 'Kubo Cottage is Traditional Filipino bamboo hut with native charm.',
        cottage_price: 100,
        cottage_id: 'kubo',
    },
    {
        image: RockCottages,
        title: 'Rock Cottage',
        description: 'Unique small concrete room providing privacy and ventilation.',
        cottage_price: 100,
        cottage_id: 'rock',
    }
];

const Cottages = () => {
    return (
        <div className="px-4 py-12 max-w-7xl mx-auto pt-30">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">
                    Our <span className="text-blue-500">Cottages</span>
                </h1>
                <p className="text-gray-500 mt-2">Modern Stays, Timeless Memories</p>
            </div>

            {/* Flexbox for controlled row layout with consistent card height */}
            <div className="flex flex-wrap justify-center gap-8">
                {services.map((cottage, index) => (
                    <div key={index} className="w-full sm:w-[45%] lg:w-[30%] h-full">
                        <div className="h-full flex flex-col">
                            <CottageCard cottage={cottage} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cottages;
