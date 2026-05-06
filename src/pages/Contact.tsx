import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="font-serif text-5xl font-bold text-navy-950 mb-8">Let's solve your next challenge.</h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Whether you're looking to optimize operations or define a new growth strategy, our experts are ready to help.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-navy-700" />
              </div>
              <div>
                <h3 className="font-bold text-navy-950 mb-1">Global Reach</h3>
                <p className="text-slate-500">Supporting clients across North America, Europe, and Asia.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-navy-700" />
              </div>
              <div>
                <h3 className="font-bold text-navy-950 mb-1">Expert Led</h3>
                <p className="text-slate-500">Direct access to partners with 20+ years of industry experience.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-950 mb-4">Message Sent</h2>
              <p className="text-slate-600 mb-8">Thank you for reaching out. A partner will contact you within 24 hours.</p>
              <button 
                onClick={() => setSubmitStatus('idle')}
                className="btn-primary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy-950">Full Name</label>
                  <input 
                    {...register('name')}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 focus:outline-none transition-all"
                  />
                  {errors.name && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy-950">Email Address</label>
                  <input 
                    {...register('email')}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 focus:outline-none transition-all"
                  />
                  {errors.email && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy-950">Company Name</label>
                  <input 
                    {...register('company')}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy-950">Reason for Outreach</label>
                  <select 
                    {...register('service')}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 focus:outline-none transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="strategy">Business Strategy</option>
                    <option value="operations">Operations Management</option>
                    <option value="marketing">Market Analysis</option>
                    <option value="finance">Financial Consulting</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.service.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-navy-950">Message</label>
                <textarea 
                  {...register('message')}
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 focus:outline-none transition-all resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.message.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Message'}
              </button>

              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm text-center font-medium">Something went wrong. Please try again later.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
