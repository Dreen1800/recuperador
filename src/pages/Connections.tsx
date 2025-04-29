import { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import WhatsAppConnection from '../components/connections/WhatsAppConnection';

const Connections = () => {
  const [officialConnection] = useState({
    isConnected: false,
  });
  
  const [unofficialConnection] = useState({
    isConnected: true,
    phoneNumber: '+55 11 98765-4321',
    lastSync: 'Hoje, 14:32'
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Conexões</h1>
        <p className="text-gray-600">Gerencie suas conexões com o WhatsApp</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-800">
            <strong>Qual API devo usar?</strong>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Para uso em ambiente de produção, recomendamos a API Oficial que permite enviar mensagens para qualquer número sem limitações. 
            A API Não-Oficial é ideal para testes e desenvolvimento, mas tem limitações impostas pelo WhatsApp.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WhatsAppConnection
          type="official"
          isConnected={officialConnection.isConnected}
        />
        
        <WhatsAppConnection
          type="unofficial"
          isConnected={unofficialConnection.isConnected}
          phoneNumber={unofficialConnection.phoneNumber}
          lastSync={unofficialConnection.lastSync}
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Configurações de Webhook</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL do Webhook para Carrinhos Abandonados
            </label>
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-700"
                value="https://seusite.com.br/api/webhook/cart-recover"
                readOnly
              />
              <button className="px-4 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md text-gray-600 hover:bg-gray-200 transition-colors">
                Copiar
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Configure sua loja para enviar dados de carrinhos abandonados para esta URL
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chave de Autenticação
            </label>
            <div className="flex">
              <input
                type="password"
                className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-700"
                value="sk_test_WnFdSUlQcA6s8TlKL5m4XxxT"
                readOnly
              />
              <button className="px-4 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md text-gray-600 hover:bg-gray-200 transition-colors">
                Mostrar
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Inclua esta chave no cabeçalho "X-API-Key" de todas as requisições
            </p>
          </div>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Exemplo de Payload</h3>
            <pre className="bg-gray-50 p-3 rounded-md text-xs text-gray-700 overflow-auto">
{`{
  "cart_id": "123456789",
  "customer": {
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "phone": "5511987654321",
    "id": "cust_123456"
  },
  "cart": {
    "items": [
      {
        "id": "prod_123",
        "name": "Camiseta Preta",
        "price": 79.90,
        "quantity": 2,
        "image_url": "https://exemplo.com/img/camiseta.jpg"
      }
    ],
    "total": 159.80,
    "currency": "BRL",
    "abandoned_at": "2023-05-07T14:32:21Z",
    "recovery_url": "https://loja.exemplo.com/cart/recover/123456789"
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;