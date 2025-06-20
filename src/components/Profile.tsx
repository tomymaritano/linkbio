const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-6 sm:gap-4 text-center">
      <img
        src="/profile.jpeg"
        alt="Tomás Maritano"
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
          Tomás Maritano
        </h1>

        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-light leading-snug">
          Indie dev & product builder{" "}—
          <span className="block sm:inline text-indigo-600 dark:text-indigo-400">
            Buenos Aires, Argentina
          </span>
        </p>
      </div>

      <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 max-w-xs sm:max-w-md leading-relaxed">
        I specialize in the entire lifecycle of digital products: from ideation,
        design, and development to metrics and execution. Passionate about
        creating impactful solutions. 🌍🚀{" "}
        <span className="text-indigo-500 underline">
          <a href="https://www.inkrun.app" target="_blank">@inkrun</a>
        </span>
      </p>
    </div>
  );
};

export default Profile;