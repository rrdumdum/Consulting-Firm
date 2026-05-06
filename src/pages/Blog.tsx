import { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { collection, query, orderBy, getDocs, doc, getDoc, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: any;
  image: string;
  tags: string[];
}

export function Blog() {
  return (
    <div className="pt-20 min-h-screen">
      <Routes>
        <Route index element={<BlogList />} />
        <Route path=":slug" element={<BlogPostDetail />} />
      </Routes>
    </div>
  );
}

function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, 'posts'), orderBy('publishedAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <h1 className="font-serif text-5xl font-bold text-navy-950 mb-6">Insights & Perspectives</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Thought leadership from our experts on strategy, operations, and the future of business.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-navy-700" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-slate-50 p-20 rounded-3xl text-center">
            <p className="text-xl text-slate-500 italic">No articles found in our knowledge base yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6 shadow-sm">
                    <img 
                      src={post.image || 'https://images.unsplash.com/photo-1454165833767-027ffea9e81b?auto=format&fit=crop&q=80&w=600'} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-xs font-bold text-navy-700 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.publishedAt?.toDate()).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy-950 mb-4 group-hover:text-navy-700 transition-colors">{post.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="font-bold text-navy-950 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Article <ArrowLeft className="w-4 h-4 rotate-180" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const q = query(collection(db, 'posts'), orderBy('publishedAt', 'desc'), limit(10)); // Simplified for demo
        const querySnapshot = await getDocs(q);
        const matchedPost = querySnapshot.docs.find(doc => doc.data().slug === slug);
        if (matchedPost) {
          setPost({ id: matchedPost.id, ...matchedPost.data() } as BlogPost);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) return <div className="flex justify-center py-40"><Loader2 className="w-10 h-10 animate-spin text-navy-700" /></div>;
  if (!post) return <div className="container-custom py-40">Post not found.</div>;

  return (
    <article className="py-20 animate-in fade-in duration-700">
      <div className="container-custom max-w-4xl">
        <Link to="/blog" className="text-navy-700 font-bold mb-12 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-6 mb-8 text-sm font-bold text-navy-700 uppercase tracking-widest">
             <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.publishedAt?.toDate()).toLocaleDateString()}</span>
             <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-navy-950 mb-10 leading-tight">
            {post.title}
          </h1>
          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-xl">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </header>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-navy-950 prose-a:text-navy-700 font-sans leading-relaxed text-slate-800">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap gap-4">
          {post.tags?.map(tag => (
            <span key={tag} className="px-4 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

