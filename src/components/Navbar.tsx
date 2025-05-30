const Navbar = () => {
  return (
    <div className="w-full sm:w-4/5 mx-auto flex flex-col sm:flex-row items-center justify-between mt-4 mb-16 px-4 py-4 rounded-2xl gradient-border text-lg sm:text-2xl gap-4 sm:gap-0">
      <button className="w-full sm:w-auto text-center">Menu</button>
      <img
        src="./assets/animated/VIBECAT.gif"
        className="h-28 sm:h-40"
        alt="Vibe Cat"
      />
      <button className="w-full sm:w-auto text-center">Buy Now</button>
    </div>
  );
};

export default Navbar;
