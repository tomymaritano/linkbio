const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center p-2 gap-4 text-center">
            <img
                src="/profile.jpeg"
                alt="Tomás Maritano"
                className="w-32 h-32 rounded-full object-cover"
            />
            <div className="py-2">
                <h1 className="text-3xl font-medium text-white py-2">Tomás Maritano</h1>
                <p className="text-lg text-white font-extralight">
                    Indie dev building digital products end-to-end <a href="#" className="underline">@inkrun</a> –{" "}
                    <span className="text-indigo-400">Buenos Aires, Argentina</span>
                </p>
            </div>
            <p className="text-white text-md">
                I specialize in the entire lifecycle of digital products: from ideation, design, and development to metrics and execution. Passionate about creating impactful solutions. 🌍🚀
            </p>
        </div>
    );
};

export default Profile;