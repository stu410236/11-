import React, { useState } from 'react';
import { GameState, TortoisePet } from '../types';
import { GAME_ITEMS } from '../data/items';
import { 
  Package, 
  X, 
  Sparkles, 
  Shield, 
  Bug, 
  Heart, 
  Ticket, 
  Info,
  ChevronRight
} from 'lucide-react';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  tortoise: TortoisePet;
  onFeedTortoiseTreat: () => void;
  onFeedTortoiseCabbage: () => void;
  onWaterTortoise: () => void;
  onOpenLottery: () => void;
  onOpenShop?: () => void;
  isMuted?: boolean;
  playSynthSound?: (type: 'click' | 'correct' | 'wrong' | 'levelUp' | 'irrigate' | 'feed' | 'water' | 'pet', muted: boolean) => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  gameState,
  tortoise,
  onFeedTortoiseTreat,
  onFeedTortoiseCabbage,
  onWaterTortoise,
  onOpenLottery,
  onOpenShop,
  isMuted = false,
  playSynthSound
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'currency' | 'battle' | 'farming' | 'pet' | 'special'>('all');
  const [confirmItem, setConfirmItem] = useState<{ id: string; name: string; action: () => void } | null>(null);
  const [isActionPending, setIsActionPending] = useState(false);

  if (!isOpen) return null;

  // 取得各道具實際數量
  const getItemQuantity = (itemId: string): number => {
    switch (itemId) {
      case 'coins':
        return gameState.coins ?? 0;
      case 'diamonds':
        return gameState.diamonds ?? 0;
      case 'hintTickets':
        return gameState.hintTickets ?? 0;
      case 'pesticides':
        return gameState.pesticides ?? 0;
      case 'pestNets':
        return gameState.pestNets ?? 0;
      case 'recoveryFertilizers':
        return gameState.recoveryFertilizers ?? 0;
      case 'tortoiseTreats':
        return gameState.tortoiseTreats ?? 0;
      case 'water':
        return gameState.waterBuckets ?? 0;
      case 'cabbage':
        return gameState.cabbages ?? 0;
      case 'lotteryTickets':
        return gameState.lotteryTickets ?? 0;
      default:
        return 0;
    }
  };

  const inventoryItemsList = [
    { ...GAME_ITEMS.diamonds, count: getItemQuantity('diamonds') },
    { ...GAME_ITEMS.lotteryTickets, count: getItemQuantity('lotteryTickets') },
    { ...GAME_ITEMS.hintTickets, count: getItemQuantity('hintTickets') },
    { ...GAME_ITEMS.pesticides, count: getItemQuantity('pesticides') },
    { ...GAME_ITEMS.pestNets, count: getItemQuantity('pestNets') },
    { ...GAME_ITEMS.recoveryFertilizers, count: getItemQuantity('recoveryFertilizers') },
    { ...GAME_ITEMS.tortoiseTreats, count: getItemQuantity('tortoiseTreats') },
    { ...GAME_ITEMS.water, count: getItemQuantity('water') },
    { ...GAME_ITEMS.cabbage, count: getItemQuantity('cabbage') },
  ];

  const filteredItems = activeCategory === 'all' 
    ? inventoryItemsList 
    : inventoryItemsList.filter(item => item.category === activeCategory);

  const handleExecuteAction = (action: () => void) => {
    if (isActionPending) return;
    setIsActionPending(true);
    action();
    setConfirmItem(null);
    setTimeout(() => setIsActionPending(false), 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#121926] via-[#0c121d] to-[#070b13] border-2 border-emerald-500/50 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl shadow-inner">
              🎒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black tracking-widest uppercase bg-emerald-600 text-white rounded-md shadow-sm">
                  INVENTORY
                </span>
                <span className="text-xs text-emerald-300 font-mono">農場物資道具背包</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white font-display mt-0.5">
                持有道具與資源庫存
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Badges */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-950/80 border border-slate-700/80 px-3 py-1.5 rounded-xl font-mono text-xs">
              <span className="text-amber-300 font-bold flex items-center gap-1">
                🪙 {gameState.coins ?? 0}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-300 font-bold flex items-center gap-1">
                💎 {gameState.diamonds ?? 0}
              </span>
            </div>

            {/* 前往商店按鈕 */}
            {onOpenShop && (
              <button
                id="inventory-to-shop-btn"
                onClick={() => {
                  if (playSynthSound) playSynthSound('click', isMuted);
                  onOpenShop();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
                title="前往農場商店"
              >
                <span>🏪</span>
                <span className="hidden sm:inline">農場商店</span>
              </button>
            )}

            <button
              onClick={() => {
                if (playSynthSound) playSynthSound('click', isMuted);
                onClose();
              }}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors text-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto select-none scrollbar-none">
          {[
            { id: 'all', label: '全部道具', icon: '📦' },
            { id: 'currency', label: '貨幣財富', icon: '💎' },
            { id: 'battle', label: '防衛作戰', icon: '🛡️' },
            { id: 'farming', label: '農田復育', icon: '🌱' },
            { id: 'pet', label: '烏龜培育', icon: '🐢' },
            { id: 'special', label: '特殊券類', icon: '🎟️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (playSynthSound) playSynthSound('click', isMuted);
                setActiveCategory(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-display transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body: Items Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-slate-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredItems.map(item => {
              const count = item.count;
              const hasItems = count > 0;

              return (
                <div
                  key={item.id}
                  className={`relative p-4 rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
                    hasItems
                      ? `${item.bgColor} ${item.borderColor} shadow-md`
                      : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                  }`}
                >
                  {/* Item Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="text-3xl p-2 rounded-2xl bg-black/40 border border-white/10 shrink-0">
                          {item.emoji}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-black text-white font-display">
                              {item.name}
                            </h4>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${item.badgeBg}`}>
                              {item.category.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xs font-mono font-black mt-0.5 flex items-center gap-1">
                            <span className="text-slate-400">持有數量:</span>
                            <span className={hasItems ? `${item.color} text-sm font-black` : 'text-slate-500'}>
                              ×{count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item Description */}
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Item Actions / Status */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-400 leading-tight">
                      <span className="text-slate-500 block text-[9px] font-mono">使用時機</span>
                      <span>{item.usageGuide}</span>
                    </div>

                    {/* Action buttons depending on item type */}
                    {item.id === 'tortoiseTreats' && (
                      <button
                        disabled={!hasItems || isActionPending}
                        onClick={() => {
                          setConfirmItem({
                            id: item.id,
                            name: item.name,
                            action: () => {
                              onFeedTortoiseTreat();
                              if (playSynthSound) playSynthSound('levelUp', isMuted);
                            }
                          });
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center gap-1"
                      >
                        <span>餵食</span>
                        <span className="text-[9px] font-mono">+50XP</span>
                      </button>
                    )}

                    {item.id === 'cabbage' && (
                      <button
                        disabled={!hasItems || isActionPending}
                        onClick={() => {
                          setConfirmItem({
                            id: item.id,
                            name: item.name,
                            action: () => {
                              onFeedTortoiseCabbage();
                              if (playSynthSound) playSynthSound('feed', isMuted);
                            }
                          });
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center gap-1"
                      >
                        <span>餵食</span>
                        <span className="text-[9px] font-mono">飽食+25</span>
                      </button>
                    )}

                    {item.id === 'water' && (
                      <button
                        disabled={!hasItems || isActionPending}
                        onClick={() => {
                          setConfirmItem({
                            id: item.id,
                            name: item.name,
                            action: () => {
                              onWaterTortoise();
                              if (playSynthSound) playSynthSound('water', isMuted);
                            }
                          });
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center gap-1"
                      >
                        <span>給水</span>
                        <span className="text-[9px] font-mono">水分+25</span>
                      </button>
                    )}

                    {item.id === 'lotteryTickets' && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenLottery();
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow transition shrink-0 flex items-center gap-1"
                      >
                        <span>福引所</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Item Usage Guide Card */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed space-y-1">
              <span className="font-bold text-white block">道具使用說明：</span>
              <p>
                • <strong>除蟲劑 / 防蟲網 / 復甦肥料</strong>：屬於特定時機道具，防蟲網可於健康良田裝備；除蟲劑在害蟲防衛失敗時觸發；復甦肥料在復育枯萎作物時使用。
              </p>
              <p>
                • <strong>提示券</strong>：挑戰 150 區 C++ 關卡時，點擊提示按鈕即可使用，獲得核心解題靈感！
              </p>
            </div>
          </div>

        </div>

        {/* Action Confirmation Modal */}
        {confirmItem && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl text-center">
              <div className="text-4xl">🐢</div>
              <h4 className="text-base font-black text-white">確認使用 {confirmItem.name}？</h4>
              <p className="text-xs text-slate-300">
                將消耗 1 個 {confirmItem.name} 餵食小綠龜。
              </p>
              <div className="flex gap-2 justify-center pt-2">
                <button
                  type="button"
                  disabled={isActionPending}
                  onClick={() => setConfirmItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
                >
                  取消
                </button>
                <button
                  type="button"
                  disabled={isActionPending}
                  onClick={() => handleExecuteAction(confirmItem.action)}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md transition disabled:opacity-50"
                >
                  {isActionPending ? '處理中...' : '確認使用'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>🐢 小綠龜狀態：</span>
            <span className="text-emerald-300 font-bold">Lvl.{tortoise.level} ({tortoise.name})</span>
          </div>

          <button
            onClick={() => {
              if (playSynthSound) playSynthSound('click', isMuted);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            關閉背包
          </button>
        </div>

      </div>
    </div>
  );
};
