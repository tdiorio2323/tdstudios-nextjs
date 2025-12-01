import Image from 'next/image';
import { serviceIcons } from '@/lib/visuals';

export default function ServiceCard({ id, title, description, icon, color = 'pink' }) {
  return (
    <div className="group bg-black p-10 relative overflow-hidden transition-all duration-400 h-full">
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gray scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ${color === 'pink' ? 'group-hover:bg-pink' : 'group-hover:bg-purple'}`} />

      <div className="flex justify-between items-start mb-8">
        <div className="text-[0.7rem] text-gray font-semibold tracking-widest">{id}</div>
        <Image
          src={serviceIcons[icon] ?? "/placeholders/icon-fallback.svg"}
          alt={title}
          width={32}
          height={32}
          className="h-8 w-8 opacity-80"
        />
      </div>

      <h3 className="font-serif text-2xl mb-4 text-white">{title}</h3>
      <p className="text-gray text-sm leading-relaxed">{description}</p>
    </div>
  );
}