import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function App() {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [generate, setGenerate] = useState(false);

  useEffect(() => {
    console.log("QR Code:", qrCode);
  }, [qrCode]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url('./assets/Images/abstract-bg.jpg')] bg-center bg-cover bg-no-repeat text-white">
      <form
        className="p-8 font-normal flex flex-col justify-center items-center gap-6
        bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl shadow-black w-[90%] max-w-md"
      >
        <h1 className="text-xl md:text-3xl font-bold text-white/80 text-center">
          QR Code Generator
        </h1>

        {loading ? (
          <div className="flex items-center justify-center w-full h-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : qrCode && generate ? (
          <QRCode
            bgColor="transparent"
            value={qrCode}
            size={186}
            className="w-[186px] h-[186px]"
          />
        ) : (
          <input
            type="text"
            placeholder="Type something..."
            onChange={(e) => {
              setQrCode(e.target.value);
            }}
            className="px-4 py-2 w-86 text-sm border border-white/40 bg-white/30 placeholder-white/70 text-white rounded-lg md:w-full focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            if (generate) {
              setGenerate(false);
              setQrCode("");
              setLoading(false);
              return;
            }
            setLoading(true);
            setTimeout(() => {
              if (!qrCode) setLoading(false);
              if (qrCode.trim() === "") {
                setQrCode("");
              } else {
                if (qrCode) {
                  setGenerate(true);
                }
              }
              setLoading(false);
            }, Math.random() * 1000);
          }}
          type="submit"
          className="px-4 py-2 text-sm bg-blue-600 text-white cursor-pointer rounded-full w-full transition-all duration-300 hover:bg-blue-700"
        >
          {qrCode && generate ? "Clear" : "Generate"}
        </button>
      </form>
    </div>
  );
}

export default App;
