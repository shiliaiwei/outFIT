'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ArrowDownLeft, 
  ArrowUpRight, 
  RefreshCw, 
  Plus, 
  Layers, 
  MapPin, 
  Truck,
  CheckCircle2,
  Boxes
} from 'lucide-react';
import { StockMovement } from '@/types';
import { ApiService } from '@/services/api';

export function WarehouseLogisticsView() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [skuInput, setSkuInput] = useState<string>('LN-092');
  const [qtyInput, setQtyInput] = useState<number>(20);
  const [binInput, setBinInput] = useState<string>('Bin A-14');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    ApiService.getStockMovements().then(data => setMovements(data));
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleInboundReceive = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovement: StockMovement = {
      id: `MOV-${Math.floor(800 + Math.random() * 200)}`,
      sku: skuInput,
      productName: skuInput === 'LN-092' ? 'Tailored Linen Overshirt' : 'Structured Apparel SKU',
      type: 'INBOUND',
      qty: qtyInput,
      location: binInput,
      timestamp: 'Just now',
      handler: 'Chenda Mom'
    };
    setMovements(prev => [newMovement, ...prev]);
    showToast(`Received ${qtyInput} units of ${skuInput} into ${binInput}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1E2631] text-white px-4 py-2.5 rounded-[9px] shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-amber-500" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* LEFT: INBOUND RECEIVING & BIN ALLOCATION (5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        
        {/* Inbound Form */}
        <div className="liquid-glass p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-[#5A6678]/15 pb-2.5">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600" />
              <h3 className="font-display font-black text-sm text-[#1E2631]">
                Inbound Supplier Shipment Intake
              </h3>
            </div>
            <span className="badge-2px bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 text-[10px] font-bold">
              Dock #01 Active
            </span>
          </div>

          <form onSubmit={handleInboundReceive} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#5A6678]">Product SKU</label>
              <input 
                type="text" 
                value={skuInput} 
                onChange={(e) => setSkuInput(e.target.value.toUpperCase())}
                className="bg-white border border-[#5A6678]/15 rounded-[9px] px-3 py-2 text-xs font-mono font-bold text-[#1E2631] focus:outline-none focus:border-[#C84428]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#5A6678]">Intake Units</label>
                <input 
                  type="number" 
                  value={qtyInput} 
                  min="1"
                  onChange={(e) => setQtyInput(parseInt(e.target.value) || 1)}
                  className="bg-white border border-[#5A6678]/15 rounded-[9px] px-3 py-2 text-xs font-mono font-bold text-[#1E2631] focus:outline-none focus:border-[#C84428]"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#5A6678]">Bin Rack Location</label>
                <input 
                  type="text" 
                  value={binInput} 
                  onChange={(e) => setBinInput(e.target.value)}
                  className="bg-white border border-[#5A6678]/15 rounded-[9px] px-3 py-2 text-xs font-mono font-bold text-[#1E2631] focus:outline-none focus:border-[#C84428]"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="btn-9px py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all mt-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Inbound Stock &bull; Sync POS</span>
            </button>
          </form>
        </div>

        {/* Warehouse Floor Summary */}
        <div className="liquid-glass p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#1E2631] border-b border-[#5A6678]/15 pb-2">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-[#C84428]" />
              <span>Bin Capacity Telemetry</span>
            </div>
            <span className="font-mono text-emerald-700 font-bold">84% Utilized</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-white border border-[#5A6678]/15 rounded-[9px]">
              <span className="text-[10px] text-[#5A6678]">Zone A (Overshirts)</span>
              <div className="font-mono font-bold text-sm text-[#1E2631]">420 / 500 pcs</div>
            </div>
            <div className="p-2.5 bg-white border border-[#5A6678]/15 rounded-[9px]">
              <span className="text-[10px] text-[#5A6678]">Zone B (Knits &amp; Polos)</span>
              <div className="font-mono font-bold text-sm text-[#1E2631]">310 / 400 pcs</div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT: REAL-TIME STOCK MOVEMENT LEDGER (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="liquid-glass p-4 flex flex-col gap-3 h-full">
          
          <div className="flex items-center justify-between border-b border-[#5A6678]/15 pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C84428]" />
              <h3 className="font-display font-black text-sm text-[#1E2631]">
                Real-Time Stock Movement Audit Log
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#5A6678]">SS-MIS Synced</span>
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto max-h-[480px] pr-1">
            {movements.map(mov => (
              <div 
                key={mov.id}
                className="bg-white border border-[#5A6678]/15 rounded-[9px] p-3 flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center ${
                    mov.type === 'INBOUND' ? 'bg-emerald-50 text-emerald-700' :
                    mov.type === 'SALE' ? 'bg-red-50 text-red-700' : 'bg-sky-50 text-sky-700'
                  }`}>
                    {mov.type === 'INBOUND' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1E2631]">{mov.sku}</span>
                      <span className="text-[10px] text-[#5A6678]">&bull; {mov.timestamp}</span>
                      <span className="badge-2px bg-slate-100 text-[#5A6678] px-1 text-[9px] font-bold">
                        {mov.location}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#1E2631]">{mov.productName}</p>
                    <span className="text-[10px] text-[#8E9AA8]">Logged by {mov.handler}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono font-black text-sm ${
                    mov.qty > 0 ? 'text-emerald-700' : 'text-[#C84428]'
                  }`}>
                    {mov.qty > 0 ? `+${mov.qty}` : mov.qty} pcs
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
