import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import LiveSupportModal from './LiveSupportModal';

const FABLiveSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-3xl"
        title="Support en direct"
      >
        <MessageCircle className="h-7 w-7" />
      </button>

      <LiveSupportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default FABLiveSupport;
