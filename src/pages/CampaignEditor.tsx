import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Play, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';

// Steps in the campaign creation process
type EditorStep = 'details' | 'trigger' | 'messages' | 'conditions' | 'scheduling';

const CampaignEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<EditorStep>('details');
  const [campaignName, setCampaignName] = useState(id ? 'Editar Campanha' : 'Nova Campanha');

  const isNewCampaign = !id;

  const steps = [
    { id: 'details', label: 'Detalhes' },
    { id: 'trigger', label: 'Gatilho' },
    { id: 'messages', label: 'Mensagens' },
    { id: 'conditions', label: 'Condições' },
    { id: 'scheduling', label: 'Agendamento' },
  ];

  const handleBack = () => {
    navigate('/campaigns');
  };

  const handleStepChange = (step: EditorStep) => {
    setCurrentStep(step);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Campanha
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Ex: Recuperação de Carrinho - Produtos Premium"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Descreva o objetivo dessa campanha..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: checkout, blackfriday, premium (separados por vírgula)"
              />
              <p className="mt-1 text-xs text-gray-500">
                Tags ajudam a organizar suas campanhas para facilitar buscas e filtros
              </p>
            </div>
          </div>
        );
      
      case 'trigger':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tipo de Gatilho</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="cart-abandoned"
                    name="trigger-type"
                    className="mt-1"
                    defaultChecked
                  />
                  <div>
                    <label htmlFor="cart-abandoned" className="block text-sm font-medium text-gray-700">
                      Carrinho Abandonado
                    </label>
                    <p className="text-xs text-gray-500">
                      Dispara quando o cliente adiciona itens ao carrinho mas não finaliza a compra
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="checkout-abandoned"
                    name="trigger-type"
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="checkout-abandoned" className="block text-sm font-medium text-gray-700">
                      Checkout Abandonado
                    </label>
                    <p className="text-xs text-gray-500">
                      Dispara quando o cliente inicia o checkout mas não conclui o pagamento
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="custom-webhook"
                    name="trigger-type"
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="custom-webhook" className="block text-sm font-medium text-gray-700">
                      Webhook Personalizado
                    </label>
                    <p className="text-xs text-gray-500">
                      Dispara através de um endpoint personalizado que você pode chamar de qualquer lugar
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tempo de Espera</h3>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  className="w-20 p-2 border border-gray-300 rounded-md"
                  defaultValue={30}
                  min={1}
                />
                <select className="p-2 border border-gray-300 rounded-md">
                  <option value="minutes">Minutos</option>
                  <option value="hours">Horas</option>
                  <option value="days">Dias</option>
                </select>
                <span className="text-sm text-gray-600">após o gatilho ser acionado</span>
              </div>
            </div>
          </div>
        );
        
      case 'messages':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-4">
                Configure as mensagens que serão enviadas quando o gatilho for acionado. 
                Para fluxos mais complexos, utilize o Editor de Fluxos.
              </p>
              <Button variant="outline" size="sm">
                Abrir Editor de Fluxos
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Mensagem Inicial</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Título da Mensagem
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Ex: Recuperação de Carrinho"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Conteúdo
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    rows={4}
                    placeholder="Olá {{nome}}, notamos que você deixou alguns itens no carrinho. Deseja completar sua compra? Seu carrinho ainda está salvo."
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Use {{nome}} para incluir o nome do cliente e outras variáveis dinâmicas
                  </p>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Botões de Ação (opcional)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Texto do botão (ex: Ver Carrinho)"
                    />
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="URL de destino"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              + Adicionar outra mensagem
            </button>
          </div>
        );
        
      case 'conditions':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Configure condições adicionais para determinar quando esta campanha deve ser acionada.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Valor Mínimo do Carrinho</h3>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  className="w-32 p-2 border border-gray-300 rounded-md"
                  placeholder="100.00"
                />
                <span className="text-sm text-gray-600">Apenas carrinho com valor igual ou maior</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Categorias de Produtos</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="cat-all" className="rounded text-blue-600" />
                  <label htmlFor="cat-all" className="text-sm text-gray-700">Todas as categorias</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="cat-electronics" className="rounded text-blue-600" />
                  <label htmlFor="cat-electronics" className="text-sm text-gray-700">Eletrônicos</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="cat-fashion" className="rounded text-blue-600" />
                  <label htmlFor="cat-fashion" className="text-sm text-gray-700">Moda</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="cat-home" className="rounded text-blue-600" />
                  <label htmlFor="cat-home" className="text-sm text-gray-700">Casa e Decoração</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Cliente</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Número de Compras Anteriores</label>
                  <div className="flex items-center space-x-2">
                    <select className="p-2 border border-gray-300 rounded-md text-sm">
                      <option value="any">Qualquer</option>
                      <option value="equal">Igual a</option>
                      <option value="greater">Maior que</option>
                      <option value="less">Menor que</option>
                    </select>
                    <input
                      type="number"
                      className="w-20 p-2 border border-gray-300 rounded-md text-sm"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'scheduling':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Status da Campanha</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="status-active"
                    name="campaign-status"
                    className="mt-1"
                    defaultChecked
                  />
                  <div>
                    <label htmlFor="status-active" className="block text-sm font-medium text-gray-700">
                      Ativar Imediatamente
                    </label>
                    <p className="text-xs text-gray-500">
                      A campanha começará a enviar mensagens assim que for salva
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="status-scheduled"
                    name="campaign-status"
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="status-scheduled" className="block text-sm font-medium text-gray-700">
                      Agendar Ativação
                    </label>
                    <p className="text-xs text-gray-500">
                      Definir uma data e hora específica para iniciar a campanha
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="status-draft"
                    name="campaign-status"
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="status-draft" className="block text-sm font-medium text-gray-700">
                      Salvar como Rascunho
                    </label>
                    <p className="text-xs text-gray-500">
                      A campanha não será ativada até que você a ative manualmente
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Restrições de Horário</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="time-restrict" className="rounded text-blue-600" />
                  <label htmlFor="time-restrict" className="text-sm text-gray-700">
                    Restringir envio para horários específicos
                  </label>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Horário Inicial</label>
                    <input
                      type="time"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      defaultValue="08:00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Horário Final</label>
                    <input
                      type="time"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      defaultValue="20:00"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Limites</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Limite diário de mensagens
                  </label>
                  <input
                    type="number"
                    className="w-32 p-2 border border-gray-300 rounded-md text-sm"
                    placeholder="500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Deixe em branco para não definir limite
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center">
        <button
          onClick={handleBack}
          className="mr-3 p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{campaignName}</h1>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between">
            <div className="space-x-1">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepChange(step.id as EditorStep)}
                  className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
                    currentStep === step.id
                      ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}. {step.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-200 pt-4">
          {!isNewCampaign && (
            <Button
              variant="danger"
              leftIcon={<Trash2 className="h-4 w-4" />}
            >
              Excluir
            </Button>
          )}
          <div className="flex space-x-3 ml-auto">
            <Button variant="outline" onClick={handleBack}>
              Cancelar
            </Button>
            <Button
              variant="secondary"
              leftIcon={<Save className="h-4 w-4" />}
            >
              Salvar
            </Button>
            <Button
              leftIcon={<Play className="h-4 w-4" />}
            >
              Salvar e Ativar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CampaignEditor;