import Chart from './Chart';
import EventStates from './EventStates';
import RecentUser from './VisitorChart';

export default function Dashboard() {
    return (
        <div className="">
            <div className="col-span-4">
                <EventStates />
            </div>
            <div className="col-span-8">
                <Chart />
            </div>
            <div className="mt-5">
                <RecentUser />
            </div>
        </div>
    );
}
