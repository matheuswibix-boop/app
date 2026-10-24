import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Download, Loader2, LogOut, Trash2 } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const http = axios.create({ baseURL: API, withCredentials: true });

const fmtErr = (d) => (typeof d === "string" ? d : Array.isArray(d) ? d.map((e) => e?.msg).join(" ") : "Erro ao entrar.");

const Login = ({ onDone }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    try { const { data } = await http.post("/auth/login", { email, password }); onDone(data); }
    catch (x) { setErr(fmtErr(x?.response?.data?.detail)); }
    finally { setLoading(false); }
  };
  const cls = "w-full rounded-xl border border-white/15 bg-[#070809] px-4 py-3.5 text-sm outline-none focus:border-[#FFC400]";
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} data-testid="admin-login-form" className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#111316] p-8">
        <Logo />
        <h1 className="font-display mt-8 text-2xl uppercase">Painel de leads</h1>
        <div className="mt-6 space-y-3">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" data-testid="admin-email-input" className={cls} />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" data-testid="admin-password-input" className={cls} />
        </div>
        {err && <p data-testid="admin-login-error" className="mt-3 text-sm text-red-400">{err}</p>}
        <button disabled={loading} data-testid="admin-login-submit" className="mt-6 grid w-full place-items-center rounded-full bg-[#FFC400] py-3.5 font-bold text-[#070809]">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar"}
        </button>
      </form>
    </main>
  );
};

const toCsv = (rows) => {
  const cols = ["created_at", "name", "email", "phone", "company", "revenue", "service", "message"];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(";"), ...rows.map((r) => cols.map((c) => esc(r[c])).join(";"))].join("\n");
};

const Leads = ({ user, onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    try { const { data } = await http.get("/leads"); setLeads(Array.isArray(data) ? data : []); }
    catch { toast.error("Não foi possível carregar os leads."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    if (!window.confirm("Excluir este lead?")) return;
    await http.delete(`/leads/${id}`);
    setLeads((l) => l.filter((x) => x.id !== id));
    toast.success("Lead excluído.");
  };
  const exportCsv = () => {
    const blob = new Blob(["\uFEFF" + toCsv(leads)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "leads-insales.csv"; a.click();
  };

  return (
    <main data-testid="admin-leads-page" className="mx-auto max-w-[1400px] px-5 pb-20 pt-10 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Logo />
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-[#AEB0B6] sm:inline">{user.email}</span>
          <button onClick={onLogout} data-testid="admin-logout" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2"><LogOut className="h-4 w-4" /> Sair</button>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase md:text-4xl">Leads</h1>
          <p data-testid="admin-leads-count" className="mt-1 text-[#AEB0B6]">{leads.length} contato(s) recebido(s)</p>
        </div>
        <button onClick={exportCsv} disabled={!leads.length} data-testid="admin-export-csv" className="inline-flex items-center gap-2 rounded-full bg-[#FFC400] px-5 py-2.5 text-sm font-bold text-[#070809] disabled:opacity-50"><Download className="h-4 w-4" /> Exportar CSV</button>
      </div>
      {loading ? <Loader2 className="mt-10 h-6 w-6 animate-spin text-[#FFC400]" /> : (
        <div className="mt-8 grid gap-3">
          {!leads.length && <p data-testid="admin-leads-empty" className="rounded-2xl border border-white/10 p-8 text-center text-[#AEB0B6]">Nenhum lead ainda.</p>}
          {leads.map((l) => (
            <article key={l.id} data-testid={`admin-lead-${l.id}`} className="grid gap-3 rounded-2xl border border-white/10 bg-[#111316] p-5 md:grid-cols-[1.2fr_1.2fr_1fr_auto] md:items-start">
              <div><p className="font-bold">{l.name}</p><p className="text-sm text-[#AEB0B6]">{l.company || "—"}</p><p className="font-mono mt-1 text-xs text-[#AEB0B6]">{new Date(l.created_at).toLocaleString("pt-BR")}</p></div>
              <div className="text-sm"><a href={`mailto:${l.email}`} className="block text-[#FFC400]">{l.email}</a><a href={`https://wa.me/55${l.phone.replace(/\D/g, "").replace(/^55/, "")}`} target="_blank" rel="noreferrer" className="block">{l.phone}</a></div>
              <div className="text-sm text-[#c2c4c9]"><p>{l.service || "—"} · {l.revenue || "—"}</p>{l.message && <p className="mt-1 text-[#AEB0B6]">{l.message}</p>}</div>
              <button onClick={() => remove(l.id)} data-testid={`admin-delete-${l.id}`} aria-label="Excluir" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#AEB0B6] hover:border-red-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default function Admin() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    http.get("/auth/me").then(({ data }) => setUser(data)).catch(() => setUser(false));
  }, []);
  const logout = async () => { await http.post("/auth/logout"); setUser(false); };
  if (user === null) return <div className="grid min-h-screen place-items-center"><Loader2 className="h-6 w-6 animate-spin text-[#FFC400]" /></div>;
  return user ? <Leads user={user} onLogout={logout} /> : <Login onDone={setUser} />;
}
