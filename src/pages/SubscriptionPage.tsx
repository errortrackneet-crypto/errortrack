import { ArrowLeft, CheckCircle, Lock } from "lucide-react";
import etFavicon from "@/assets/ET_Fevicon.png";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "forever",
    tag: null,
    color: "border-gray-200",
    headerBg: "bg-gray-50",
    headerText: "text-gray-800",
    btnStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    features: [
      "Access to all PYQs (Botany & Zoology)",
      "Basic bookmarks (up to 20)",
      "Performance overview",
    ],
    locked: [
      "NCERT Line by Line",
      "Chapter-wise practice",
      "Mock & chapter tests",
      "Unlimited bookmarks",
      "Detailed statistics",
    ],
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "₹59",
    period: "per month",
    tag: null,
    color: "border-teal-200",
    headerBg: "bg-teal-50",
    headerText: "text-pink-700",
    btnStyle: "bg-teal-500 text-white hover:bg-teal-600",
    features: [
      "Everything in Free",
      "NCERT Line by Line",
      "Chapter-wise practice (all types)",
      "Full Mock & Chapter Tests",
      "Unlimited bookmarks",
      "Detailed statistics",
    ],
    locked: [],
  },
  {
    id: "biannual",
    name: "6 Months",
    price: "₹199",
    period: "per 6 months",
    tag: "Save 44%",
    color: "border-teal-400",
    headerBg: "bg-gradient-to-br from-[#0f1f5c] to-[#1a3a7a]",
    headerText: "text-white",
    btnStyle: "bg-teal-500 text-white hover:bg-teal-600",
    features: [
      "Everything in Monthly",
      "Priority support",
      "Early access to new features",
    ],
    locked: [],
  },
  {
    id: "annual",
    name: "12 Months",
    price: "₹349",
    period: "per year",
    tag: "Best Value",
    color: "border-amber-400",
    headerBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    headerText: "text-white",
    btnStyle: "bg-amber-500 text-white hover:bg-amber-600",
    features: [
      "Everything in 6 Months",
      "All future content included",
      "Dedicated doubt support",
    ],
    locked: [],
  },
];

export function SubscriptionPage({
  isPremium,
  onSubscribe,
  onBack,
}: {
  isPremium: boolean;
  onSubscribe: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 mb-4">
          <img src={etFavicon} alt="" className="w-4 h-4 object-contain" />
          <span className="text-sm font-semibold text-teal-700">ErrorTrack Plans</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 font-display">Choose your plan</h2>
        <p className="text-gray-500 text-sm mt-2">
          PYQs are always free. Upgrade to unlock NCERT, all practice types & tests.
        </p>
      </div>

      {/* Plan grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => {
          const isCurrent = plan.id === "free" && !isPremium;
          const isPaid = plan.id !== "free";
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border-2 ${plan.color} shadow-sm overflow-hidden relative`}
            >
              {plan.tag && (
                <div className="absolute top-3 right-3 bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {plan.tag}
                </div>
              )}

              {/* Plan header */}
              <div className={`${plan.headerBg} px-5 py-4`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${plan.headerText} opacity-70`}>
                  {plan.name}
                </p>
                <div className={`flex items-baseline gap-1 mt-1 ${plan.headerText}`}>
                  <span className="text-3xl font-black font-display">{plan.price}</span>
                  <span className="text-xs opacity-70">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="px-5 py-4 space-y-2">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
                {plan.locked.map((f) => (
                  <div key={f} className="flex items-start gap-2 opacity-40">
                    <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-500">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                {isCurrent ? (
                  <div className="w-full py-2.5 rounded-xl text-sm font-semibold text-center bg-gray-100 text-gray-500">
                    Current Plan
                  </div>
                ) : isPaid && isPremium ? (
                  <div className="w-full py-2.5 rounded-xl text-sm font-semibold text-center bg-green-50 text-green-600">
                    Active ✓
                  </div>
                ) : (
                  <button
                    onClick={isPaid ? onSubscribe : undefined}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${plan.btnStyle}`}
                  >
                    {plan.id === "free" ? "Continue Free" : `Get ${plan.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400 pb-4">
        All payments are secure. Cancel anytime. GST included.
      </p>
    </div>
  );
}
