import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, ActivitySquare, Construction as Connection, BarChart3, Settings, BarChart as FlowChart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: MessageSquare, label: 'Campanhas', path: '/campaigns' },
    { icon: FlowChart, label: 'Editor de Fluxos', path: '/flows' },
    { icon: Connection, label: 'Conexões', path: '/connections' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <div className={cn(
          "flex items-center transition-all duration-300",
          isOpen ? "justify-start pl-4" : "justify-center"
        )}>
          <ActivitySquare className="h-8 w-8 text-blue-600" />
          {isOpen && (
            <span className="ml-2 text-xl font-semibold text-gray-800">CartRescue</span>
          )}
        </div>
      </div>
      <nav className="px-2 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-100",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className="w-5 h-5" />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;