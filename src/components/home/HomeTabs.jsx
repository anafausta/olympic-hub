import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { artigosService } from '../../services/artigosService';
import { simuladoService } from '../../services/simuladoService';
import { trilhasService } from '../../services/trilhasService';
import { useStudent } from '../../context/StudentContext';
import {
  Award,
  Bookmark,
  Star,
  History,
  BookOpen,
  ArrowRight
} from '../ui/SolarIcon';
import { formatDate } from '../../utils/formatters';

export const HomeTabs = () => {
  const [activeTab, setActiveTab] = useState('achievements'); // 'achievements' | 'questoes' | 'artigos' | 'historico'
  const { student, toggleSavedArticle, toggleSavedQuestion, setActiveOverlayTrilhaId } = useStudent();
  const navigate = useNavigate();

  const [savedArticles, setSavedArticles] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [historyTrilhas, setHistoryTrilhas] = useState([]);

  useEffect(() => {
    const loadTabData = async () => {
      try {
        if (activeTab === 'artigos') {
          const allArt = await artigosService.getAllArtigos();
          const savedIds = student?.artigosSalvosIds || [];
          setSavedArticles(allArt.filter((a) => savedIds.includes(a.id)));
        } else if (activeTab === 'questoes') {
          const allQ = await simuladoService.getAllQuestions();
          const savedQIds = student?.questoesSalvasIds || [];
          setSavedQuestions(allQ.filter((q) => savedQIds.includes(q.id)));
        } else if (activeTab === 'historico') {
          const allT = await trilhasService.getAllTrilhas();
          setHistoryTrilhas(allT.filter((t) => (t.percentualConclusao ?? 0) > 0));
        }
      } catch (err) {
        console.error('Error loading tab data', err);
      }
    };

    loadTabData();
  }, [activeTab, student]);

  const tabs = [
    { id: 'achievements', label: 'Achievements Conquistados', icon: Award, count: student?.achievements?.filter(a => a.conquistado).length },
    { id: 'questoes', label: 'Questões Salvas', icon: Bookmark, count: student?.questoesSalvasIds?.length || 0 },
    { id: 'artigos', label: 'Artigos Salvos', icon: Star, count: student?.artigosSalvosIds?.length || 0 },
    { id: 'historico', label: 'Histórico de Trilhas', icon: History, count: null }
  ];

  return (
    <BentoCard variant="surface" className="space-y-6">
      {/* Tab Navigation Header */}
      <div className="flex items-center gap-2 border-b border-[var(--border-surface)] overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#7800D6] to-[#2E008F] text-white shadow-md shadow-[#7800D6]/20'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Body Content */}
      <div className="min-h-[220px]">
        {/* 1. Achievements (RF30) */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(student?.achievements || []).map((ach) => (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  ach.conquistado
                    ? 'bg-[var(--bg-elevated)] border-[#F9CA20]/30 shadow-sm'
                    : 'bg-[var(--bg-surface)] border-[var(--border-surface)] opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl p-2 rounded-xl bg-[var(--bg-card-hover)] flex-shrink-0">
                  {ach.icone}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">
                      {ach.titulo}
                    </h5>
                    {ach.conquistado && (
                      <Badge color="gold" size="sm">
                        Conquistado
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {ach.descricao}
                  </p>
                  {ach.conquistado && ach.data && (
                    <span className="text-[10px] text-[var(--text-muted)] block">
                      Em {formatDate(ach.data)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Questões Salvas (RF31, RF64) */}
        {activeTab === 'questoes' && (
          <div className="space-y-3">
            {savedQuestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-[var(--text-muted)] space-y-2">
                <Bookmark className="w-10 h-10 opacity-30" />
                <p className="text-sm">Você ainda não favoritou questões durante seus simulados.</p>
                <Button variant="secondary" size="sm" onClick={() => navigate('/simulado')}>
                  Iniciar Simulado
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge color="cyan" size="sm">
                          {q.assunto}
                        </Badge>
                        <button
                          onClick={() => toggleSavedQuestion(q.id)}
                          className="text-[#F9CA20] hover:scale-110 transition-transform cursor-pointer"
                          title="Remover das salvas"
                        >
                          <Star className="w-4 h-4 fill-[#F9CA20]" />
                        </button>
                      </div>
                      <p className="text-sm text-[var(--text-primary)] font-medium line-clamp-3">
                        {q.enunciado}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--border-surface)]/60 flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span>4 alternativas</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/simulado')}
                        className="text-xs text-[var(--brand-primary)]"
                      >
                        Praticar <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Artigos Salvos (RF108) */}
        {activeTab === 'artigos' && (
          <div className="space-y-3">
            {savedArticles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-[var(--text-muted)] space-y-2">
                <Star className="w-10 h-10 opacity-30" />
                <p className="text-sm">Nenhum artigo salvo na sua lista.</p>
                <Button variant="secondary" size="sm" onClick={() => navigate('/artigos')}>
                  Explorar Artigos / Wiki
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge color="lilac" size="sm">
                          {art.tags?.[0] || 'Conceitos'}
                        </Badge>
                        <button
                          onClick={() => toggleSavedArticle(art.id)}
                          className="text-[#F9CA20] hover:scale-110 transition-transform cursor-pointer"
                          title="Remover dos favoritos"
                        >
                          <Star className="w-4 h-4 fill-[#F9CA20]" />
                        </button>
                      </div>
                      <h5 className="font-heading font-bold text-sm text-[var(--text-primary)] line-clamp-2">
                        {art.titulo}
                      </h5>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth
                      onClick={() => navigate(`/artigos/${art.id}`)}
                      className="justify-between text-xs mt-2"
                    >
                      <span>Ler artigo</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Histórico de Trilhas (RF47) */}
        {activeTab === 'historico' && (
          <div className="space-y-3">
            {historyTrilhas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-[var(--text-muted)] space-y-2">
                <History className="w-10 h-10 opacity-30" />
                <p className="text-sm">Nenhuma trilha iniciada até o momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {historyTrilhas.map((trilha) => {
                  const is100 = (trilha.percentualConclusao ?? 0) >= 100;
                  return (
                    <div
                      key={trilha.id}
                      className={`p-4 rounded-2xl border space-y-3 flex flex-col justify-between ${
                        is100
                          ? 'bg-[var(--accent-emerald-bg)] border-[var(--accent-emerald)]/40'
                          : 'bg-[var(--bg-elevated)] border-[var(--border-surface)]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[var(--accent-gold)]">
                            {trilha.isGeral ? 'Trilha Geral' : 'Trilha Temática'}
                          </span>
                          <span className="text-xs font-bold text-[var(--text-primary)]">
                            {trilha.percentualConclusao}% concluído
                          </span>
                        </div>
                        <h5 className="font-heading font-bold text-sm text-[var(--text-primary)]">
                          {trilha.titulo}
                        </h5>
                      </div>

                      <div className="pt-2 border-t border-[var(--border-surface)]/60 flex items-center justify-between">
                        <span className="text-xs text-[var(--text-muted)]">
                          {trilha.atividades?.length || 0} atividades no percurso
                        </span>
                        <Button
                          variant={is100 ? 'emerald' : 'secondary'}
                          size="sm"
                          onClick={() => {
                            setActiveOverlayTrilhaId(trilha.id);
                            navigate('/trilhas');
                          }}
                          className="text-xs gap-1.5"
                        >
                          <span>Rever Trilha</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </BentoCard>
  );
};
