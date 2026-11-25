import InlineVideo from '@/components/ui/InlineVideo';

const films = [
  { title: 'First sketches', id: '966721424', body: 'Get to know the house and try a few layouts.' },
  { title: 'Plans and materials', id: '966728565', body: 'Settle the details before we build.' },
  { title: 'Construction', id: '966901133', body: 'See how a drawing becomes a house.' },
];

export default function ProcessFilms() {
  return <section className="bg-bg-primary section" aria-labelledby="process-films-heading">
    <div className="container-wide">
      <p className="eyebrow">Behind the Process</p>
      <h2 id="process-films-heading" className="h-section mt-4">See the Work Come Together</h2>
      <p className="text-lead mt-5 max-w-2xl">Choose a chapter for a closer look at how our team works.</p>
      <div className="mt-10 grid items-start gap-7 lg:grid-cols-3">
        {films.map((film, i) => <article key={film.id}>
          <InlineVideo title={film.title} videoId={film.id} poster={`/video-posters/${film.id}.jpg`} />
          <p className="eyebrow mt-6">0{i + 1}</p>
          <p className="h-card-sm mt-3 text-text-primary">{film.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{film.body}</p>
        </article>)}
      </div>
    </div>
  </section>;
}
