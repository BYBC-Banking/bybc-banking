
const CryptoLoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/6093fac6-2c85-4690-b750-573e64b3f410.png" 
          alt="BYBC Banking Logo" 
          className="w-48 h-48 object-contain mb-8"
        />
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-amber-600 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-amber-700 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-amber-800 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default CryptoLoadingScreen;
