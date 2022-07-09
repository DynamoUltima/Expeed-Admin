const DashboardPage = () => {
    return (
        <div className="flex flex-col  h-screen p-10">

            <div className="text-2xl">Hello Admin</div>
            <div className="flex space-x-4 mt-5">
                {/* Card 1 */}
                <div className="h-56 bg-red-300 rectangle flex flex-col justify-between rounded-md shadow-xl p-2">
                    <div className="text-4xl text-white pt-5">480</div>
                    <div className="  text-white text-sm font-normal">Active Users</div>
                    <div className="text-xs font-light text-white pb-5">2nd July 2022</div>
                </div>


                <div className="h-56 bg-blue-300 rectangle flex flex-col justify-between rounded-md shadow-xl p-2">
                    <div className="text-4xl text-white pt-5">480</div>
                    <div className="  text-white text-sm font-normal">Active Users</div>
                    <div className="text-xs font-light text-white pb-5">2nd July 2022</div>
                </div>

                <div className="h-56 bg-green-300 rectangle flex flex-col justify-between rounded-md shadow-xl p-2">
                    <div className="text-4xl text-white pt-5">480</div>
                    <div className="  text-white text-sm font-normal">Active Users</div>
                    <div className="text-xs font-light text-white pb-5">2nd July 2022</div>
                </div>


                <div className="h-56 bg-purple-300 rectangle flex flex-col justify-between rounded-md shadow-xl p-2">
                    <div className="text-4xl text-white pt-5">480</div>
                    <div className="  text-white text-sm font-normal">Active Users</div>
                    <div className="text-xs font-light text-white pb-5">2nd July 2022</div>

                </div>
            </div>

        </div>

    );
}

export default DashboardPage;