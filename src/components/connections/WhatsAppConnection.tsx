import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCcw, Smartphone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface WhatsAppConnectionProps {
  type: 'official' | 'unofficial';
  isConnected: boolean;
  phoneNumber?: string;
  lastSync?: string;
}

const WhatsAppConnection = ({ 
  type, 
  isConnected, 
  phoneNumber,
  lastSync 
}: WhatsAppConnectionProps) => {
  const [showQrCode, setShowQrCode] = useState(false);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Smartphone className="h-5 w-5 text-blue-600" />
          <CardTitle>
            WhatsApp {type === 'official' ? 'Oficial' : 'Não-Oficial'}
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Conectado</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <XCircle className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Desconectado</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isConnected ? (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Número</p>
                    <p className="text-sm text-gray-600">{phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Última sincronização</p>
                    <p className="text-sm text-gray-600">{lastSync}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<RefreshCcw className="h-4 w-4" />}
                >
                  Sincronizar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                >
                  Desconectar
                </Button>
              </div>
            </>
          ) : (
            <>
              {type === 'official' ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    Configure suas credenciais da API oficial do WhatsApp Business para começar a enviar mensagens.
                  </p>
                  <div className="grid gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number ID
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Insira o ID do número"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Access Token
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Insira o token de acesso"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {showQrCode ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                      <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-3">
                        <span className="text-sm text-gray-500">QR Code</span>
                      </div>
                      <p className="text-sm text-gray-600 text-center">
                        Escaneie o QR code com seu WhatsApp para conectar
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => setShowQrCode(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-3">
                        Conecte seu WhatsApp escaneando o QR code para usar a API não-oficial. Ideal para testes e desenvolvimento.
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowQrCode(true)}
                      >
                        Gerar QR Code
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppConnection;