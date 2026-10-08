import { useEffect, useState } from 'react';
import { GitBranch, Mail, Moon, Sun } from 'lucide-react';

const projects = [
  {
    number: '01',
    icon: '◇',
    tone: 'blue',
    title: 'Godot VideoStreamPlayer 拓展',
    description: '为 Godot 原生 VideoStreamPlayer 增加 RTSP、RTMP、HTTP(S) 远程视频流支持，提供多种流传输协议与视频编码协议，并可通过 native_video 进行深度定制。',
    tags: ['Godot', 'GDExtension', 'RTSP / RTMP'],
    image: 'assets/projects/image1.png',
    imageAlt: 'Godot VideoStreamPlayer 远程视频流演示',
    repository: 'https://github.com/xrarlenal/godot-lunastream',
  },
  {
    number: '02',
    icon: '✺',
    tone: 'pink',
    title: 'Unity UGUI Demo',
    description: '基于 Unity 2022.3.62f3c1、URP 14.0.12、C# 和 UGUI 构建。通过自定义 ScriptableRendererFeature、ScriptableRenderPass 与手写 HLSL Shader，实现逐帧生成、按层级变化的实时毛玻璃界面。',
    tags: ['Unity', 'URP', 'C#', 'HLSL'],
    gallery: [
      ['assets/projects/image2.png', 'Unity UGUI Demo 战斗 HUD'],
      ['assets/projects/image3.png', 'Unity UGUI Demo 设置界面'],
      ['assets/projects/image4.png', 'Unity UGUI Demo 背包界面'],
    ],
    repository: 'https://github.com/xrarlenal/Para-UGUI',
  },
];

const navigation = [
  ['home', '⌂', '关于我'],
  ['projects', '✦', '项目'],
  ['skills', '⌘', '技能'],
];

function TypewriterText({ children, speed = 42 }) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let characterIndex = 0;
    const timer = window.setInterval(() => {
      characterIndex += 1;
      setVisibleText(children.slice(0, characterIndex));
      if (characterIndex >= children.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [children, speed]);

  return <span className="typewriter-text">{visibleText}<span className="typewriter-cursor" aria-hidden="true">|</span></span>;
}

function ProjectCard({ project, index }) {
  return (
    <article className={`glass project-card project-card-featured reveal ${index % 2 ? 'reveal-right' : 'reveal-left'}`}>
      <div className="project-number">{project.number}</div>
      <div className={`project-icon ${project.tone}`}>{project.icon}</div>
      {project.image && (
        <div className="project-image">
          <img src={project.image} alt={project.imageAlt} />
        </div>
      )}
      {project.gallery && (
        <div className="project-gallery" aria-label={`${project.title} 项目图片`}>
          {project.gallery.map(([src, alt]) => <img key={src} src={src} alt={alt} />)}
        </div>
      )}
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">查看 GitHub <span>↗</span></a>
    </article>
  );
}

function HomeView({ initialCard = 'hero' }) {
  const [activeCard, setActiveCard] = useState(initialCard);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isCycling, setIsCycling] = useState(false);
  const cardOrder = ['hero', 'about', 'projects', 'skills'];
  const activeIndex = cardOrder.indexOf(activeCard);

  const cardStyle = (card) => {
    const cardIndex = cardOrder.indexOf(card);
    const stackDistance = (cardIndex - activeIndex + cardOrder.length) % cardOrder.length;
    return {
      zIndex: cardOrder.length - stackDistance,
      '--stack-distance': stackDistance,
    };
  };

  useEffect(() => {
    setActiveCard(initialCard);
    setIsSwapping(true);
    const timer = window.setTimeout(() => setIsSwapping(false), 720);
    return () => window.clearTimeout(timer);
  }, [initialCard]);

  const cycleTo = (card) => {
    if (isCycling || card === activeCard) return;

    const targetIndex = cardOrder.indexOf(card);
    const steps = (targetIndex - activeIndex + cardOrder.length) % cardOrder.length;
    let step = 0;
    setIsCycling(true);
    setIsSwapping(true);
    const timer = window.setInterval(() => {
      step += 1;
      setActiveCard(cardOrder[(activeIndex + step) % cardOrder.length]);
      if (step >= steps) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setIsSwapping(false);
          setIsCycling(false);
        }, 220);
      }
    }, 80);
  };

  const switchCard = (event, card) => {
    if (event.target.closest('a, button')) return;
    cycleTo(card);
  };

  return (
    <div id="home" className="page-view active-view">
      <div className={`intro-stack active-${activeCard} ${isSwapping ? 'is-swapping' : ''}`} aria-label="个人介绍卡片组">
        <section style={cardStyle('hero')} className={`glass hero-card stack-card ${activeCard === 'hero' ? 'is-front' : 'is-back'}`} onClick={(event) => switchCard(event, 'hero')}>
          <div>
            <p className="eyebrow">HELLO, I'M XR</p>
            <h2><span className="hero-title-line">把技术变成</span><br /><em className="hero-title-line hero-title-accent">值得记住的体验。</em></h2>
            <div className="hero-title-rules" aria-hidden="true"><span /><span /></div>
            <p className="hero-copy"><TypewriterText>专注于图形、交互与工具开发。喜欢把复杂系统整理成清晰、好用，也有一点惊喜的产品。</TypewriterText></p>
            <a className="primary-button" href="#projects">查看我的项目 <span>↘</span></a>
          </div>
          <div className="hero-mark" aria-hidden="true"><span>01</span><b><i>MAKE</i><i>IT</i><i>MATTER</i></b></div>
        </section>
        <section style={cardStyle('about')} className={`glass content-card about-card home-about stack-card ${activeCard === 'about' ? 'is-front' : 'is-back'}`} onClick={(event) => switchCard(event, 'about')}>
          <div className="section-heading"><div><p className="eyebrow">A LITTLE ABOUT ME</p><h2 className="section-title">关于我</h2></div><span className="section-index">HOME</span></div>
          <p><TypewriterText speed={38}>我是 XR，一名喜欢在工程和视觉之间来回探索的开发者。我的工作通常从一个问题开始，最后落在一个可以被使用、被感知的界面或工具上。</TypewriterText></p>
          <div className="about-meta"><span><b>BASE</b> China / Remote</span><span><b>FOCUS</b> Graphics · Tools · UI</span></div>
          <div className="home-actions"><a className="secondary-button" href="#projects">浏览项目 <span>↗</span></a><a className="secondary-button" href="#skills">查看技能 <span>↗</span></a></div>
        </section>
        <section style={cardStyle('projects')} className={`glass page-card-view stack-card card-projects ${activeCard === 'projects' ? 'is-front' : 'is-back'}`} onClick={(event) => switchCard(event, 'projects')}>
          <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2 className="section-title">项目</h2></div><span className="section-index">01 / 02</span></div>
          <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
        </section>
        <section style={cardStyle('skills')} className={`glass page-card-view stack-card card-skills ${activeCard === 'skills' ? 'is-front' : 'is-back'}`} onClick={(event) => switchCard(event, 'skills')}>
          <div className="section-heading"><div><p className="eyebrow">THE TOOLKIT</p><h2 className="section-title">技能</h2></div><span className="section-index">02 / 02</span></div>
          <div className="skill-list"><div className="glass skill-group"><span className="skill-index">01</span><h3>前端与交互</h3><p>构建有节奏、可探索的界面与实时交互。</p><div className="tag-row">{['JavaScript', 'TypeScript', 'React', 'WebGL'].map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="glass skill-group pink-line"><span className="skill-index">02</span><h3>系统与图形</h3><p>在底层系统、渲染管线和工具开发之间工作。</p><div className="tag-row">{['C++', 'OpenGL', 'GLSL', 'Python'].map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>
        </section>
        {cardOrder.filter((card) => card !== activeCard).map((card) => {
          const distance = (cardOrder.indexOf(card) - activeIndex + cardOrder.length) % cardOrder.length;
          return <button key={card} className="stack-edge-button" style={{ '--stack-distance': distance }} type="button" aria-label={`切换到${card}卡片`} onClick={() => cycleTo(card)} />;
        })}
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || 'home');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setPage(window.location.hash.slice(1) || 'home');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!['home', 'projects', 'skills'].includes(page)) {
      window.history.replaceState(null, '', '#home');
      setPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    document.body.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  return (
    <div className="page-shell">
      <aside className="sidebar" aria-label="个人信息与导航">
        <div className="glass sidebar-card reveal reveal-left">
          <div className="avatar" aria-hidden="true">XR</div>
          <p className="eyebrow">TECHNICAL PORTFOLIO</p>
          <h1>XR Paras</h1>
          <p className="role">Creative Developer</p>
          <div className="sidebar-divider" />
          <div className="status-row"><span className="status-dot" /><span>正在构建有趣的东西</span></div>
          <nav className="sidebar-links" aria-label="页面导航">
            {navigation.map(([id, icon, label]) => <a className={`sidebar-link ${page === id ? 'nav-active' : ''}`} href={`#${id}`} key={id}><span>{icon}</span>{label}</a>)}
          </nav>
          <div className="social-links">
            <a href="mailto:xrarlenal@outlook.com" aria-label="发送邮件"><Mail size={15} strokeWidth={1.8} /></a>
            <a href="https://github.com/xrarlenal" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={15} strokeWidth={1.8} /></a>
            <a href="https://x.com/aparasr" target="_blank" rel="noreferrer" aria-label="X @aparasr"><span className="x-glyph">X</span></a>
            <button className="theme-toggle" type="button" aria-label="切换主题" onClick={() => setDark((value) => !value)}>{dark ? <Moon size={15} strokeWidth={1.8} /> : <Sun size={15} strokeWidth={1.8} />}</button>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <HomeView initialCard={page === 'projects' || page === 'skills' ? page : 'hero'} />
        <footer className="footer">Designed & built by XR <span>·</span> 2026</footer>
      </main>
    </div>
  );
}

export default App;
