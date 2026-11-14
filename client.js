window.__ModuleLoader__.load({
  id: '@huakirax/dsh-perf-css',
  factory() {
    const CSS = `
html[data-perf-hidden] *, html[data-perf-hidden] *::before, html[data-perf-hidden] *::after { animation-play-state: paused !important; }
`;
    return {
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.perfCss = '';
          style.textContent = CSS;
          document.head.appendChild(style);
          const sync = () => {
            if (document.hidden) document.documentElement.setAttribute('data-perf-hidden', '');
            else document.documentElement.removeAttribute('data-perf-hidden');
          };
          document.addEventListener('visibilitychange', sync);
          sync();
          return () => {
            document.removeEventListener('visibilitychange', sync);
            document.documentElement.removeAttribute('data-perf-hidden');
            style.remove();
          };
        }, 'perf-css');
      },
    };
  },
});
