const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center p-2 gap-4 text-center">
            <img
                src="/profile.jpeg"
                alt="Tomás Maritano"
                className="w-32 h-32 rounded-full object-cover"
            />
            <div className="py-2">
                <h1 className="text-2xl font-medium
                 text-white py-2">Tomás Maritano</h1>
                <p className="text-md text-white font-extralight">
                    Full stack engineer <a href="#" className="underline">@inkrun</a> –{" "}
                    <span className="text-lime-400">Buenos Aires, Argentina</span>
                </p>
            </div>
            <p className="text-white text-wrap">Detail-oriented UI Developer focused on responsive designs; skilled at transforming complex ideas into elegant solutions. 🌍 🚀 @baseLake</p>
        </div>
    );
};

export default Profile;