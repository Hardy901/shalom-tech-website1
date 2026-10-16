import React from 'react';

export const CulinaryIdeasSection: React.FC = () => {
  const recipes = [
    {
      name: 'Everyday Soft Roti',
      tag: 'Daily Essential',
      prep: '15 mins',
      benefit: 'Same puff, 4x more prebiotic fibre',
      desc: 'Rolls and puffs with the exact same pliability as 100% whole wheat flour. No stickiness, zero bitter aftertaste.',
      image: '/jackbloom/recipes/roti.jpg',
    },
    {
      name: 'Artisanal Loaf & Sourdough',
      tag: 'Baking Favorite',
      prep: '45 mins',
      benefit: 'Rich nutty aroma & golden crust',
      desc: 'Lends sandwich and sourdough loaves an earthy crumb structure with slow-digesting complex carbs.',
      image: '/jackbloom/recipes/bread.jpg',
    },
    {
      name: 'High-Fibre Crunchy Cookies',
      tag: 'Tea-Time Snack',
      prep: '20 mins',
      benefit: '13g fibre per 100g portion',
      desc: 'Bakes into golden, crunchy digestives and shortbreads that keep energy steady for hours.',
      image: '/jackbloom/recipes/cookies.jpg',
    },
    {
      name: 'Moist Spiced Tea Cakes',
      tag: 'Wholesome Bakes',
      prep: '35 mins',
      benefit: 'Plant protein & low glycemic',
      desc: 'Pairs wonderfully with cardamom, cinnamon, and jaggery for wholesome everyday celebration bakes.',
      image: '/jackbloom/recipes/cake.jpg',
    },
    {
      name: 'Golden Breakfast Pancakes',
      tag: 'Morning Ritual',
      prep: '10 mins',
      benefit: 'Steady morning metabolic energy',
      desc: 'Whisk with buttermilk or plant milk for fluffy, high-protein pancakes the entire family loves.',
      image: '/jackbloom/recipes/pancakes.jpg',
    },
  ];

  return (
    <section id="recipes" className="py-20 sm:py-28 paddx bg-[#F5EFE4] relative w-full border-t border-[#122B1E]/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-mono font-bold tracking-widest text-[#D98A2B] uppercase">
            From Your Kitchen
          </span>
          <h2 className="text150 uppercase text-[#122B1E] mt-1">
            Cooking Ideas.
          </h2>
          <p className="font-inter text-base sm:text-lg text-[#122B1E]/75 mt-2">
            No changes to your cooking style — just pure wholesome upgrade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recipes.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl bg-[#FDFBF7] border border-[#122B1E]/10 hover:border-[#D98A2B]/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group overflow-hidden p-4 sm:p-5"
            >
              <div>
                {/* Authentic Food Photo Container */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#ECE4D4] mb-4">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[11px] font-inter font-semibold uppercase bg-[#122B1E]/90 text-[#FDFBF7] px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                      {r.tag}
                    </span>
                  </div>
                </div>

                <h3 className="font-khand text-2xl sm:text-3xl font-bold uppercase text-[#122B1E] tracking-tight group-hover:text-[#D98A2B] transition-colors">
                  {r.name}
                </h3>
                <p className="text-xs font-inter text-[#D98A2B] font-semibold mt-1">
                  ★ {r.benefit}
                </p>
                <p className="text-xs sm:text-sm font-inter text-[#122B1E]/75 mt-3 leading-relaxed">
                  {r.desc}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-[#122B1E]/10 flex items-center justify-between text-xs font-mono text-[#122B1E]/60">
                <span>Prep: {r.prep}</span>
                <span className="font-semibold text-[#122B1E]">85:15 Blend</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
