import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
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
} from '../components/ui/SolarIcon';
import { formatDate } from '../utils/formatters';

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-heading font-bold text-[var(--text-primary)] mt-8 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)] mt-7 mb-3 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg md:text-xl font-heading font-bold text-[var(--text-primary)] mt-6 mb-2.5 first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base md:text-lg font-heading font-semibold text-[var(--text-primary)] mt-5 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="leading-relaxed text-[var(--text-secondary)] mb-4 last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-1.5 mb-4 text-[var(--text-secondary)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-1.5 mb-4 text-[var(--text-secondary)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[var(--brand-primary)] bg-[var(--bg-elevated)]/60 pl-4 pr-3 py-2.5 my-4 rounded-r-xl text-[var(--text-secondary)] italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--accent-cyan)] underline underline-offset-2 hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto rounded-xl border border-[var(--border-surface)]">
      <table className="w-full text-left border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--bg-elevated)] text-[var(--text-primary)]">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-[var(--border-surface)]">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-[var(--border-surface)] last:border-b-0">{children}</tr>
  ),
  th: ({ children, style }) => (
    <th
      style={style}
      className="px-4 py-2.5 font-heading font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)]"
    >
      {children}
    </th>
  ),
  td: ({ children, style }) => (
    <td style={style} className="px-4 py-2.5 text-[var(--text-secondary)]">
      {children}
    </td>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code
          className={`block bg-[var(--bg-elevated)] border border-[var(--border-surface)] rounded-xl p-4 my-4 text-xs md:text-sm overflow-x-auto text-[var(--text-primary)] ${className}`}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="bg-[var(--bg-elevated)] border border-[var(--border-surface)] rounded px-1.5 py-0.5 text-xs md:text-sm text-[var(--text-primary)]"
        {...props}
      >
        {children}
      </code>
    );
  },
  hr: () => <hr className="border-[var(--border-surface)] my-6" />
};

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
      {/* Back button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{fromTrilha ? 'Voltar para a Trilha' : 'Voltar para lista de artigos'}</span>
        </button>
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

        {/* RF22: Video Embed with Error Fallback + Direct Link */}
        {artigo.videoUrl && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Vídeo Aula Complementar
              </h4>
              <a
                href={artigo.videoUrl.replace('/embed/', '/watch?v=')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--accent-cyan)] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Abrir vídeo no YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
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
                    href={artigo.videoUrl.replace('/embed/', '/watch?v=')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--accent-cyan)] underline flex items-center gap-1"
                  >
                    <span>Abrir link direto no YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <div className="max-w-none text-sm md:text-base leading-relaxed text-[var(--text-secondary)] overflow-x-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={markdownComponents}
          >
            {artigo.conteudo || ''}
          </ReactMarkdown>
        </div>

        {/* Conclude Lesson/Reading Action at the bottom of the text */}
        {fromTrilha && (
          <div className="pt-4 border-t border-[var(--border-surface)] flex justify-center sm:justify-end">
            <Button
              variant="emerald"
              size="lg"
              onClick={onCompleteTrackActivity}
              className="w-full sm:w-auto gap-2.5 px-8 py-3.5 text-base font-bold shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Concluir Aula e Voltar à Trilha</span>
            </Button>
          </div>
        )}

        {/* RF25, RF112: Manual Curated Recommendations (Up to 5, NO AI) */}
        <RelatedArticles recomendados={recomendados} />

        {/* RF26: Related Forum Topics with "Abrir tópico" button */}
        <ForumTopicsSection artigo={artigo} />
      </BentoCard>
    </PageContainer>
  );
};
