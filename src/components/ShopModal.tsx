import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  X, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Package, 
  ChevronRight,
  Shield,
  Coins,
  Gem
} from 'lucide-react';
import { GameState, ShopItem, ShopCategory } from '../types';
import { COIN_SHOP_ITEMS, DIAMOND_SHOP_ITEMS, SHOP_CATEGORIES } from '../data/shop';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  onPurchase: (item: ShopItem) => Promise<boolean> | boolean;
  onOpenInventory: () => void;
  onAddTestCurrency?: (type: 'coins' | 'diamonds', amount: number) => void;
  isMuted?: boolean;
  playSynthSound?: (type: any, isMuted: boolean) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  gameState,
  onPurchase,
  onOpenInventory,
  onAddTestCurrency,
  isMuted = false,
  playSynthSound
}) => {
  const [activeTab, setActiveTab] = useState<'coins' | 'diamonds'>('coins');
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('all');
  const [confirmingItem, setConfirmingItem] = useState<ShopItem | null>(null);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<{
    item: ShopItem;
    message: string;
    remaining: number;
  } | null>(null);

  if (!isOpen) return null;

  const triggerSound = (type: string) => {
    if (playSynthSound) {
      playSynthSound(type, isMuted);
    }
  };

  // 取得玩家目前擁有的該道具數量
  const getItemOwnedCount = (itemId: ShopItem['itemId']): number => {
    switch (itemId) {
      case 'hintTickets':
        return gameState.hintTickets ?? 0;
      case 'tortoiseTreats':
        return gameState.tortoiseTreats ?? 0;
      case 'cabbages':
        return gameState.cabbages ?? 0;
      case 'waterBuckets':
        return gameState.waterBuckets ?? 0;
      case 'pesticides':
        return gameState.pesticides ?? 0;
      case 'pestNets':
        return gameState.pestNets ?? 0;
      case 'recoveryFertilizers':
        return gameState.recoveryFertilizers ?? 0;
      default:
        return 0;
    }
  };

  const userCoins = gameState.coins ?? 0;
  const userDiamonds = gameState.diamonds ?? 0;

  // 過濾金幣商店商品
  const filteredCoinItems = COIN_SHOP_ITEMS.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleOpenConfirm = (item: ShopItem) => {
    triggerSound('click');
    setConfirmingItem(item);
  };

  const handleExecutePurchase = async () => {
    if (!confirmingItem || isPurchasing) return;

    const currentBalance = confirmingItem.currency === 'coins' ? userCoins : userDiamonds;
    if (currentBalance < confirmingItem.price) {
      triggerSound('wrong');
      return;
    }

    setIsPurchasing(true);
    try {
      const result = await onPurchase(confirmingItem);
      if (result !== false) {
        if (confirmingItem.currency === 'diamonds') {
          triggerSound('levelUp');
        } else {
          triggerSound('success');
        }

        const remaining = currentBalance - confirmingItem.price;
        setSuccessToast({
          item: confirmingItem,
          message: `${confirmingItem.name} 已加入道具背包！`,
          remaining
        });

        setTimeout(() => {
          setSuccessToast(null);
        }, 3500);

        setConfirmingItem(null);
      }
    } catch (e) {
      console.error('Purchase error:', e);
    } finally {
      setIsPurchasing(false);
    }
  };

  const isDevMode = Boolean((import.meta as any).env?.DEV);

  return (
    <AnimatePresence>
      <div 
        id="farm-shop-modal-backdrop"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isPurchasing) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header 頂部導覽列 */}
          <div className={`p-4 sm:p-5 border-b transition-colors duration-300 ${
            activeTab === 'coins' 
              ? 'bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/30' 
              : 'bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border-purple-500/30'
          }`}>
            <div className="flex items-center justify-between gap-3">
              {/* Title & Badge */}
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-inner border ${
                  activeTab === 'coins'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                }`}>
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-black text-white tracking-wide font-display">
                      農場商店
                    </h2>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      activeTab === 'coins'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : 'bg-purple-500/20 text-purple-300 border-purple-400/40'
                    }`}>
                      FARM SHOP
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    採購補給與珍稀防護物資，助陣良田豐產無虞
                  </p>
                </div>
              </div>

              {/* 資源餘額與關閉按鈕 */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* 🪙 Coins Balance */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-amber-500/30 shadow-inner">
                  <span className="text-sm">🪙</span>
                  <div className="text-left leading-none">
                    <span className="text-[9px] text-amber-400/60 block font-mono">COINS</span>
                    <span className="text-xs font-black text-amber-300 font-mono">
                      {userCoins.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* 💎 Diamonds Balance */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-inner">
                  <span className="text-sm">💎</span>
                  <div className="text-left leading-none">
                    <span className="text-[9px] text-cyan-400/60 block font-mono">DIAMONDS</span>
                    <span className="text-xs font-black text-cyan-300 font-mono">
                      {userDiamonds.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* 關閉按鈕 */}
                <button
                  id="shop-modal-close-button"
                  onClick={() => {
                    triggerSound('click');
                    onClose();
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition active:scale-95 ml-1 cursor-pointer"
                  title="關閉商店"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs 切換按鈕 */}
            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                {/* 🪙 農場補給店 Tab */}
                <button
                  id="shop-tab-coins"
                  onClick={() => {
                    triggerSound('click');
                    setActiveTab('coins');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    activeTab === 'coins'
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 border border-emerald-400 font-black'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <span>🪙</span>
                  <span>農場補給店</span>
                  <span className="text-[10px] opacity-75 font-mono hidden sm:inline">COIN SHOP</span>
                </button>

                {/* 💎 珍稀商店 Tab */}
                <button
                  id="shop-tab-diamonds"
                  onClick={() => {
                    triggerSound('click');
                    setActiveTab('diamonds');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    activeTab === 'diamonds'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30 border border-purple-400 font-black'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <span>💎</span>
                  <span>珍稀商店</span>
                  <span className="text-[10px] opacity-75 font-mono hidden sm:inline">DIAMOND SHOP</span>
                </button>
              </div>

              {/* 🎒 快捷開啟背包按鈕 */}
              <button
                id="shop-open-inventory-btn"
                onClick={() => {
                  triggerSound('click');
                  onOpenInventory();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 transition active:scale-95 cursor-pointer shadow-sm"
              >
                <Package className="w-3.5 h-3.5 text-emerald-400" />
                <span>查看背包</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Coin Shop 分類 Filter */}
            {activeTab === 'coins' && (
              <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
                {SHOP_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      triggerSound('click');
                      setSelectedCategory(cat.id as ShopCategory);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 購買成功 Toast 提示 */}
          <AnimatePresence>
            {successToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-4 mt-3 p-3 bg-emerald-950/90 border border-emerald-400/80 rounded-2xl flex items-center justify-between shadow-lg shadow-emerald-950/50 z-20"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center text-lg font-black shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-300">
                      ✅ PURCHASE COMPLETE 購買成功！
                    </div>
                    <div className="text-xs text-slate-200">
                      {successToast.message}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">剩餘餘額</span>
                  <span className="text-xs font-black font-mono text-amber-300">
                    {successToast.item.currency === 'coins' ? `🪙 ${successToast.remaining.toLocaleString()}` : `💎 ${successToast.remaining.toLocaleString()}`}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 商品清單主區域 */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {/* Tab 描述橫幅 */}
            <div className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
              activeTab === 'coins'
                ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200/90'
                : 'bg-purple-950/20 border-purple-500/20 text-purple-200/90'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{activeTab === 'coins' ? '🌾' : '✨'}</span>
                <span>
                  {activeTab === 'coins'
                    ? '農場補給店提供日常闖關消耗品，多答對題目賺取金幣即可自由選購補給。'
                    : '珍稀商店販售強效戰略物資，可於害蟲防衛與作物復育時提供關鍵援助。'}
                </span>
              </div>
            </div>

            {/* 商品 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {(activeTab === 'coins' ? filteredCoinItems : DIAMOND_SHOP_ITEMS).map(item => {
                const ownedCount = getItemOwnedCount(item.itemId);
                const isCoins = item.currency === 'coins';
                const userBalance = isCoins ? userCoins : userDiamonds;
                const canAfford = userBalance >= item.price;
                const diff = item.price - userBalance;

                return (
                  <div
                    key={item.id}
                    id={`shop-item-card-${item.id}`}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative group ${
                      isCoins
                        ? 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/20'
                        : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/20'
                    }`}
                  >
                    {/* 上方：Icon + 獲得數量標籤 + 目前持有 */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border transition-transform duration-200 group-hover:scale-105 ${
                          isCoins
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                        }`}>
                          {item.icon}
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${
                            item.amount > 1
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-mono'
                              : 'bg-slate-800 text-slate-300 border-slate-700 font-mono'
                          }`}>
                            獲得 ×{item.amount}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            持有: <span className="text-slate-200 font-bold">{ownedCount}</span>
                          </span>
                        </div>
                      </div>

                      {/* 商品名稱與簡介 */}
                      <div className="mt-3">
                        <h4 className="text-sm font-black text-white font-display flex items-center gap-1.5">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* 下方：價格與購買按鈕 */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      {/* 價格標籤 */}
                      <div className="flex items-center gap-1">
                        <span className="text-base">{isCoins ? '🪙' : '💎'}</span>
                        <div>
                          <span className="text-sm font-black font-mono text-white">
                            {item.price.toLocaleString()}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono ml-0.5 uppercase">
                            {item.currency}
                          </span>
                        </div>
                      </div>

                      {/* 購買按鈕 */}
                      <button
                        id={`shop-buy-btn-${item.id}`}
                        onClick={() => handleOpenConfirm(item)}
                        disabled={!canAfford}
                        className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                          canAfford
                            ? isCoins
                              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                              : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-purple-500/20'
                            : 'bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                        }`}
                        title={canAfford ? `購買 ${item.name}` : `${isCoins ? '金幣' : '鑽石'}不足，還差 ${diff}`}
                      >
                        {canAfford ? (
                          <>
                            <span>購買</span>
                            <ChevronRight className="w-3 h-3" />
                          </>
                        ) : (
                          <span className="text-[11px]">
                            差 {isCoins ? '🪙' : '💎'}{diff}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 底部功能與 Dev 工具列 */}
          <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span>💡 提示：購買物資後將直接發送至道具背包，隨時可在各系統中發揮功效。</span>
            </div>

            {/* Developer Test Mode 測試資源按鈕 (只在 DEV 環境顯示) */}
            {isDevMode && onAddTestCurrency && (
              <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-amber-500/40 rounded-xl">
                <span className="text-[10px] text-amber-400 font-mono font-bold px-1">🛠️ DEV TEST:</span>
                <button
                  onClick={() => onAddTestCurrency('coins', 1000)}
                  className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-[10px] font-bold"
                >
                  +1,000 🪙
                </button>
                <button
                  onClick={() => onAddTestCurrency('diamonds', 100)}
                  className="px-2 py-0.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded text-[10px] font-bold"
                >
                  +100 💎
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* 購買二次確認 MODAL */}
        <AnimatePresence>
          {confirmingItem && (
            <div 
              id="shop-confirm-modal-backdrop"
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget && !isPurchasing) {
                  setConfirmingItem(null);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-white flex items-center gap-2 font-display">
                    <span>🛒 購買確認</span>
                  </h3>
                  <button
                    onClick={() => setConfirmingItem(null)}
                    disabled={isPurchasing}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 商品內容摘要卡 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3.5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border ${
                    confirmingItem.currency === 'coins'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-purple-500/10 border-purple-500/30'
                  }`}>
                    {confirmingItem.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white font-display">
                        {confirmingItem.name}
                      </h4>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        ×{confirmingItem.amount}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-tight">
                      {confirmingItem.usageDetail || confirmingItem.description}
                    </p>
                  </div>
                </div>

                {/* 費用與餘額試算 */}
                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>商品價格：</span>
                    <span className="font-black font-mono text-white">
                      {confirmingItem.currency === 'coins' ? `🪙 ${confirmingItem.price.toLocaleString()} Coins` : `💎 ${confirmingItem.price.toLocaleString()} Diamonds`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>目前持有：</span>
                    <span className="font-mono">
                      {confirmingItem.currency === 'coins' ? `🪙 ${userCoins.toLocaleString()}` : `💎 ${userDiamonds.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold">
                    <span className="text-slate-300">購買後剩餘：</span>
                    <span className={`font-mono ${
                      (confirmingItem.currency === 'coins' ? userCoins : userDiamonds) - confirmingItem.price < 0
                        ? 'text-red-400'
                        : confirmingItem.currency === 'coins' ? 'text-amber-400 font-black' : 'text-cyan-400 font-black'
                    }`}>
                      {confirmingItem.currency === 'coins'
                        ? `🪙 ${(userCoins - confirmingItem.price).toLocaleString()}`
                        : `💎 ${(userDiamonds - confirmingItem.price).toLocaleString()}`}
                    </span>
                  </div>
                </div>

                {/* 按鈕組 */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setConfirmingItem(null)}
                    disabled={isPurchasing}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                  >
                    取消
                  </button>

                  <button
                    id="shop-confirm-purchase-submit-btn"
                    onClick={handleExecutePurchase}
                    disabled={
                      isPurchasing || 
                      (confirmingItem.currency === 'coins' ? userCoins : userDiamonds) < confirmingItem.price
                    }
                    className={`flex-1 py-2.5 rounded-xl font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                      confirmingItem.currency === 'coins'
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-purple-500/20'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isPurchasing ? (
                      <span>處理中...</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>確認購買</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
