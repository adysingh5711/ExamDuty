import {
  Cpu,
  Lock,
  Scale,
  FileSpreadsheet,
  Shield,
  CheckCircle,
} from "lucide-react";
import Fade from "../shared/Fade";
import { featureItems } from "../../data/landing";

const iconMap = {
  Cpu: <Cpu size={18} className="text-indigo-600" />,
  Lock: <Lock size={18} className="text-indigo-600" />,
  Scale: <Scale size={18} className="text-indigo-600" />,
  FileSpreadsheet: <FileSpreadsheet size={18} className="text-indigo-600" />,
  Shield: <Shield size={18} className="text-indigo-600" />,
  CheckCircle: <CheckCircle size={18} className="text-indigo-600" />,
};

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
      {featureItems.map((f) => (
        <Fade key={f.title} delay={f.delay}>
          <div className="bg-white p-7 h-full">
            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
              {iconMap[f.iconName]}
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1.5">
              {f.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {f.body}
            </p>
          </div>
        </Fade>
      ))}
    </div>
  );
}
