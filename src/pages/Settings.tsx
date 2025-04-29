import { useState } from 'react';
import { Key, BellRing as BellRinging, User, ServerCog, Shield, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('account')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'account'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <User className="h-4 w-4 inline-block mr-2" />
          Conta
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'security'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Key className="h-4 w-4 inline-block mr-2" />
          Segurança
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'notifications'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <BellRinging className="h-4 w-4 inline-block mr-2" />
          Notificações
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'integrations'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ServerCog className="h-4 w-4 inline-block mr-2" />
          Integrações
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'billing'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <CreditCard className="h-4 w-4 inline-block mr-2" />
          Faturamento
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'account' && (
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="João Silva"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="joao@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="Minha Loja Online"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue="(11) 98765-4321"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuso Horário
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>América/São_Paulo (UTC-3)</option>
                    <option>América/Manaus (UTC-4)</option>
                    <option>América/Noronha (UTC-2)</option>
                  </select>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>Salvar Alterações</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'security' && (
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Alterar Senha</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Senha Atual
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nova Senha
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar Nova Senha
                      </label>
                      <input
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button>Atualizar Senha</Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Chaves API</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Chave API Primária</p>
                        <p className="text-sm text-gray-600 font-mono">sk_live_WnFdSUlQ••••••••••••</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Revelar</Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" leftIcon={<Key className="h-4 w-4" />}>
                    Gerar Nova Chave API
                  </Button>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Autenticação de Dois Fatores</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium text-gray-700">Desativado</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'notifications' && (
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Notificações por E-mail</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Relatórios diários</p>
                        <p className="text-xs text-gray-500">Receba um resumo diário de desempenho</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Alertas de sistema</p>
                        <p className="text-xs text-gray-500">Receba alertas sobre problemas no sistema</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Atualizações de produto</p>
                        <p className="text-xs text-gray-500">Receba informações sobre novos recursos</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Notificações no Aplicativo</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Conversões de campanha</p>
                        <p className="text-xs text-gray-500">Notificar quando houver uma nova conversão</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Status de conexão</p>
                        <p className="text-xs text-gray-500">Notificar quando uma conexão cair ou for restabelecida</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button>Salvar Preferências</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'integrations' && (
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">
                    Conecte sua plataforma de e-commerce ou CRM para sincronizar dados de carrinhos abandonados.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Plataformas de E-commerce</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                          <span className="text-gray-500 font-medium">W</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">WooCommerce</p>
                          <p className="text-xs text-gray-500">Não conectado</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Conectar</Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                          <span className="text-gray-500 font-medium">S</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Shopify</p>
                          <p className="text-xs text-gray-500">Não conectado</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Conectar</Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                          <span className="text-gray-500 font-medium">M</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Magento</p>
                          <p className="text-xs text-gray-500">Não conectado</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Conectar</Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                          <span className="text-gray-500 font-medium">V</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">VTEX</p>
                          <p className="text-xs text-green-600">Conectado</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">CRM e Análise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                          <span className="text-gray-500 font-medium">G</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Google Analytics</p>
                          <p className="text-xs text-gray-500">Não conectado</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Conectar</Button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                          <span className="text-gray-500 font-medium">S</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Salesforce</p>
                          <p className="text-xs text-gray-500">Não conectado</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Conectar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'billing' && (
          <Card>
            <CardHeader>
              <CardTitle>Faturamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Plano Business
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Seu plano atual permite até 10.000 mensagens por mês e todas as funcionalidades premium.
                    </p>
                    <div className="mt-2">
                      <Button size="sm" variant="outline">Atualizar Plano</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Uso Atual</h3>
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Mensagens enviadas este mês</span>
                    <span className="text-sm font-medium text-gray-700">4,328 / 10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '43.28%' }}></div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Ciclo de faturamento: 01/05/2023 - 31/05/2023</p>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Método de Pagamento</h3>
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                        <span className="text-gray-500 font-medium text-xs">VISA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Visa terminando em 4242</p>
                        <p className="text-xs text-gray-500">Expira em 12/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Atualizar</Button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Faturamento</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 text-left font-medium text-gray-500">Data</th>
                        <th className="py-2 text-left font-medium text-gray-500">Descrição</th>
                        <th className="py-2 text-left font-medium text-gray-500">Total</th>
                        <th className="py-2 text-left font-medium text-gray-500">Status</th>
                        <th className="py-2 text-left font-medium text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-600">01/05/2023</td>
                        <td className="py-3 text-gray-600">Plano Business - Maio 2023</td>
                        <td className="py-3 font-medium text-gray-700">R$ 199,00</td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Pago
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                            Ver Fatura
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 text-gray-600">01/04/2023</td>
                        <td className="py-3 text-gray-600">Plano Business - Abril 2023</td>
                        <td className="py-3 font-medium text-gray-700">R$ 199,00</td>
                        <td className="py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Pago
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                            Ver Fatura
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;