const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-4 text-center">
      <img
        src="/profile.jpeg"
        alt="Tomás Maritano"
        className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
      />

      <div className="py-2">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-white py-2">
          Tomás Maritano
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-extralight">
          Indie dev building digital products end-to-end{" "}
          <a href="#" className="underline text-indigo-500">@inkrun</a> –{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Buenos Aires, Argentina
          </span>
        </p>
      </div>

      <p className="text-gray-800 dark:text-gray-300 text-md max-w-lg">
        I specialize in the entire lifecycle of digital products: from ideation,
        design, and development to metrics and execution. Passionate about
        creating impactful solutions. 🌍🚀
      </p>
    </div>
  );
};

export default Profile;