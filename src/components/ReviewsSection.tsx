import React from 'react';
import { Star } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      title: 'Puffs just like normal atta.',
      text: 'My rotis are just as soft, fluffy, and puffed. But having 13g of fibre without needing bran supplements is an absolute game-changer.',
      author: 'Priya N.',
      city: 'Bengaluru',
      verified: 'Verified Home Cook',
    },
    {
      title: 'Our kids noticed zero difference.',
      text: 'Getting children to eat more fibre used to be a daily battle. With JackBloom 85:15 blend, their parathas and rotis taste identical.',
      author: 'Sameer K.',
      city: 'Mumbai',
      verified: 'Verified Buyer',
    },
    {
      title: 'Artisanal sourdough perfection.',
      text: 'As an artisanal baker, the micro-ground jackfruit seed flour adds a subtle rustic nuance and superior crumb retention to our loaves.',
      author: 'Chef Ananya R.',
      city: 'Delhi NCR',
      verified: 'Head Baker, The Crumb Lab',
    },
    {
      title: 'Finally true circular food tech.',
      text: 'Knowing that these seeds were rescued from fruit processing waste and turned into superfood flour makes every meal feel purposeful.',
      author: 'Rohit V.',
      city: 'Pune',
      verified: 'Sustainable Living Advocate',
    },
  ];

  return (
    <section id="reviews" className="py-20 sm:py-28 paddx bg-[#FDFBF7] relative w-full overflow-hidden border-t border-[#122B1E]/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-mono font-bold tracking-widest text-[#D98A2B] uppercase">
            Community Love
          </span>
          <h2 className="text150 uppercase text-[#122B1E] mt-1">
            Bakers & Families Say.
          </h2>
          <p className="font-inter text-base sm:text-lg text-[#122B1E]/75 mt-2">
            Real kitchens, real rotis, real impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.title}
              className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE4] border border-[#122B1E]/10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-[#D98A2B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-khand text-2xl sm:text-3xl font-bold uppercase text-[#122B1E] tracking-tight mb-2">
                  "{rev.title}"
                </h3>
                <p className="text-xs sm:text-sm font-inter text-[#122B1E]/80 leading-relaxed">
                  {rev.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#122B1E]/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-[#122B1E] block font-inter text-xs">{rev.author}</span>
                  <span className="text-[#122B1E]/60 text-[11px]">{rev.city}</span>
                </div>
                <span className="bg-[#122B1E] text-[#FDFBF7] px-2.5 py-1 rounded font-semibold text-[11px] font-inter">
                  {rev.verified}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
