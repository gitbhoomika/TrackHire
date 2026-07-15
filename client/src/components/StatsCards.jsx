import {
    BriefcaseBusiness,
    Clock3,
    BadgeCheck,
    Trophy,
} from "lucide-react";

function StatsCards({
    totalApplications,
    pendingCount,
    interviewCount,
    offeredCount,
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Total */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Total Applications
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {totalApplications}
                        </h2>
                    </div>

                    <BriefcaseBusiness className="text-blue-600" size={38}/>
                </div>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Pending
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {pendingCount}
                        </h2>
                    </div>

                    <Clock3 className="text-yellow-500" size={38}/>
                </div>
            </div>

            {/* Interviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Interviews
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {interviewCount}
                        </h2>
                    </div>

                    <BadgeCheck className="text-sky-500" size={38}/>
                </div>
            </div>

            {/* Offers */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Offers
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {offeredCount}
                        </h2>
                    </div>

                    <Trophy className="text-green-500" size={38}/>
                </div>
            </div>

        </div>
    );
}

export default StatsCards;