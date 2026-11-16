import { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { BentoCard } from '../components/ui/BentoCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { RelatedArticles } from '../components/artigos/RelatedArticles';
import { ForumTopicsSection } from '../components/artigos/ForumTopicsSection';
import {
  Star,
  Calendar,
  User,
  ArrowLeft,
  AlertTriangle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { formatDate } from '../utils/formatters';

export const ArtigoLeituraView = ({
  artigo,
  isSaved,
  onToggleSave,
  recomendados,
  onBack,
  fromTrilha = false,
  onCompleteTrackActivity
}) => {
  const [videoError, setVideoError] = useState(false);

  if (!artigo) {
    return (
      <PageContainer>
        <div className="text-center py-16 space-y-4">
          <p className="text-sm text-[var(--text-muted)]">Artigo não encontrado.</p>
          <Button variant="secondary" onClick={onBack}>
            Voltar para Artigos
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Back button & Track Completion Action */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{fromTrilha ? 'Voltar para a Trilha' : 'Voltar para lista de artigos'}</span>
        </button>

        {fromTrilha && (
          <Button
            variant="emerald"
            size="sm"
            onClick={onCompleteTrackActivity}
            className="gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Concluir Leitura e Voltar à Trilha</span>
          </Button>
        )}
      </div>

      {/* Main Reading Card */}
      <BentoCard variant="surface" className="space-y-6 max-w-4xl mx-auto">
        {/* RF21: Header with title, tags, date and author */}
        <div className="space-y-4 border-b border-[var(--border-surface)] pb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {artigo.tags?.map((tag) => (
                <Badge key={tag} color="lilac" size="md">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* RF24: Star Favorite Button on Reading Page */}
            <button
              onClick={onToggleSave}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isSaved
                  ? 'bg-[var(--accent-gold-bg)] border-[var(--accent-gold)]/40 text-[var(--accent-gold)]'
                  : 'bg-[var(--bg-elevated)] border-[var(--border-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Star
                className={`w-4 h-4 ${isSaved ? 'fill-[#F9CA20] text-[#F9CA20]' : 'stroke-current'}`}
              />
              <span>{isSaved ? 'Salvo nos Favoritos' : 'Salvar Artigo'}</span>
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-[var(--text-primary)] tracking-tight leading-tight">
            {artigo.titulo}
          </h1>

          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] flex-wrap">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[var(--accent-cyan)]" />
              {artigo.autor || 'Prof. Olímpico'}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[var(--accent-lilac)]" />
              Publicado em {formatDate(artigo.dataPublicacao)}
            </span>
          </div>
        </div>

        {/* RF22: Video Embed with Error Fallback */}
        {artigo.videoUrl && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Vídeo Aula Complementar (Embed)
            </h4>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-[var(--border-surface)]">
              {!videoError ? (
                <iframe
                  src={artigo.videoUrl}
                  title={artigo.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setVideoError(true)}
                  className="w-full h-full border-0"
                />
              ) : (
                /* RF22: Fallback se a mídia falhar ao carregar */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 text-[var(--accent-coral)]">
                  <AlertTriangle className="w-8 h-8" />
                  <p className="text-sm font-semibold">
                    Não foi possível carregar o vídeo incorporado.
                  </p>
                  <a
                    href={artigo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--accent-cyan)] underline flex items-center gap-1"
                  >
                    <span>Abrir link direto da plataforma de origem</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-[var(--text-secondary)] space-y-4">
          <div className="whitespace-pre-line leading-relaxed">
            {artigo.conteudo}
          </div>
        </div>

        {/* RF25, RF112: Manual Curated Recommendations (Up to 5, NO AI) */}
        <RelatedArticles recomendados={recomendados} />

        {/* RF26: Related Forum Topics with "Abrir tópico" button */}
        <ForumTopicsSection artigo={artigo} />
      </BentoCard>
    </PageContainer>
  );
};
