import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Calendar as CalendarIcon, Clock } from 'lucide-react';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  service: z.string().min(1, 'Please select a service interest'),
  description: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookConsultation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'consultations'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error booking consultation:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-5xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-navy-900 p-10 lg:p-16 text-white flex flex-col justify-between">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-8">Schedule Your Strategic Audit</h1>
              <p className="text-indigo-100 opacity-80 leading-relaxed mb-10">
                Book a 45-minute deep-dive with one of our partners to audit your current business processes and identify growth bottlenecks.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span>45 Minutes Duration</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <span>Flexible Scheduling</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Success Metric</p>
              <p className="text-2xl font-serif font-bold italic">"Their initial audit uncovered $250k in वार्षिक operational waste we hadn't even noticed."</p>
              <p className="text-sm mt-4 opacity-60">— Managing Director, Elevate Retail</p>
            </div>
          </div>

          <div className="lg:w-3/5 p-10 lg:p-16">
            {submitStatus === 'success' ? (
              <div className="text-center py-20">
                 <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                 </div>
                 <h2 className="text-3xl font-bold text-navy-950 mb-4">Consultation Booked!</h2>
                 <p className="text-slate-600 mb-10">You'll receive a calendar invitation and a Zoom link via email shortly.</p>
                 <button onClick={() => setSubmitStatus('idle')} className="btn-primary">Book Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy-950">Full Name</label>
                    <input {...register('name')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg" placeholder="Jane Cooper" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy-950">Email Address</label>
                    <input {...register('email')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg" placeholder="jane@example.com" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy-950">Phone Number</label>
                    <input {...register('phone')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg" placeholder="+1 (555) 000-0000" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy-950">Primary Interest</label>
                    <select {...register('service')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <option value="">Select a service</option>
                      <option value="strategy">Business Strategy</option>
                      <option value="operations">Operations Management</option>
                      <option value="marketing">Market Analysis</option>
                      <option value="finance">Financial Consulting</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy-950 text-flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Preferred Date</label>
                    <input type="date" {...register('date')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg" />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy-950 flex items-center gap-2"><Clock className="w-4 h-4" /> Preferred Time</label>
                    <select {...register('time')} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <option value="">Select a slot</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy-950">Additional Context (Optional)</label>
                  <textarea {...register('description')} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg resize-none" placeholder="Briefly describe your business goals..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-5 text-xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

