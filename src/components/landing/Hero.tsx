import heroGroceries from "@/assets/images/hero-groceries.png";

export const Hero = () => {
  return (
    <section className="relative mx-auto flex w-full max-w-[1288px] flex-col items-center px-6 pt-10 md:pt-12">
      <h1 className="select-none font-display text-[clamp(3.5rem,14.5vw,13rem)] leading-none text-cream">
        INVENTORY
      </h1>
      <img
        src={heroGroceries}
        alt="Grocery bag filled with fresh produce and pantry goods"
        className="relative -mt-[9%] w-[68%] max-w-[810px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)]"
      />
    </section>
  );
};
