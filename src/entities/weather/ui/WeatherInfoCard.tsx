export const WeatherInfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
    <p className="text-slate-400 text-xs font-bold mb-2 uppercase">{label}</p>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
  </div>
);
