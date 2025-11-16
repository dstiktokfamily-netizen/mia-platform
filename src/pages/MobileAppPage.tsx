import { Smartphone, Download, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';

const MobileAppPage = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const currentUrl = window.location.origin;

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <Smartphone className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Application Mobile MIA
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Installez MIA sur votre appareil pour une expérience optimale
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* QR Code Section */}
        <div className="rounded-2xl bg-white/70 p-8 text-center shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Scannez pour installer
          </h2>
          
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <QRCodeSVG
                value={currentUrl}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Utilisez l'appareil photo de votre smartphone pour scanner ce QR code
            et accéder directement à l'application
          </p>
        </div>

        {/* Installation Instructions */}
        <div className="rounded-2xl bg-white/70 p-8 shadow-lg backdrop-blur-sm dark:bg-gray-800/70">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
            Comment installer ?
          </h2>

          <div className="space-y-6">
            {/* Desktop Install Button */}
            {isInstallable && (
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
                <button
                  onClick={handleInstall}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <Download className="h-5 w-5" />
                  Installer l'application
                </button>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Cliquez pour installer directement sur cet appareil
                </p>
              </div>
            )}

            {/* iOS Instructions */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <span className="text-2xl">📱</span>
                Sur iPhone / iPad
              </h3>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Ouvrez Safari et accédez à MIA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Appuyez sur le bouton "Partager" (carré avec flèche)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Sélectionnez "Sur l'écran d'accueil"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Confirmez l'installation</span>
                </li>
              </ol>
            </div>

            {/* Android Instructions */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <span className="text-2xl">🤖</span>
                Sur Android
              </h3>
              <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Ouvrez Chrome et accédez à MIA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Appuyez sur le menu (trois points verticaux)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Sélectionnez "Installer l'application"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>Confirmez pour ajouter à l'écran d'accueil</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Avantages de l'application
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-3 text-4xl">⚡</div>
            <h3 className="mb-2 font-semibold">Ultra rapide</h3>
            <p className="text-sm opacity-90">
              Accès instantané sans passer par le navigateur
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 text-4xl">📱</div>
            <h3 className="mb-2 font-semibold">Expérience native</h3>
            <p className="text-sm opacity-90">
              Interface optimisée pour mobile
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 text-4xl">🔔</div>
            <h3 className="mb-2 font-semibold">Notifications</h3>
            <p className="text-sm opacity-90">
              Restez informé des nouvelles missions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppPage;
