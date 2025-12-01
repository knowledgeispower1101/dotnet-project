import { useTransportationTabs } from '../hooks';
import type { TransportationType } from '../hooks';

interface TransportationTabsProps {
  activeTab: TransportationType;
  onTabChange: (tab: TransportationType) => void;
}

export const TransportationTabs = ({ activeTab, onTabChange }: TransportationTabsProps) => {
  const tabs = useTransportationTabs();

  return (
    <div className="border-b-2 border-gray-200">
      <div className="flex justify-center mx-auto gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          // Base classes for the button
          const baseClasses = `
            relative flex items-center gap-1.5 p-5 pb-3.5 bg-transparent border-none cursor-pointer 
            text-sm font-medium transition-colors border-b-2
          `;

          const activeClasses = isActive
            ? 'text-[#2474E5] border-[#2474E5]'
            : 'text-gray-700 border-transparent hover:text-[#2474E5]';

          return (
            <button key={tab.key} className={`${baseClasses} ${activeClasses}`} onClick={() => onTabChange(tab.key)}>
              {tab.badge && (
                <span className="absolute left-[105px] top-2 z-10 h-3.5 px-1 text-center text-[10px] font-bold leading-3.5 rounded-full bg-[#EB5757] text-white">
                  {tab.badge}
                </span>
              )}

              <span className="text-lg flex items-center gap-0.5">{tab.icon}</span>

              <span className="whitespace-nowrap text-base font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
