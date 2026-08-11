import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface StepLoaderProps {
  steps: readonly { id: string; label: string }[];
  onComplete: () => void;
  duration?: number;
}

export function StepLoader({ steps, onComplete, duration = 2800 }: StepLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = duration / steps.length;
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setCurrentStep(i + 1);
        }, stepDuration * (i + 1))
      );
    });

    timers.push(
      setTimeout(() => {
        onComplete();
      }, duration + 200)
    );

    return () => timers.forEach(clearTimeout);
  }, [steps, duration, onComplete]);

  return (
    <div className="w-full max-w-md mx-auto py-8">
      <div className="space-y-1">
        {steps.map((step, i) => {
          const isComplete = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-300 ${
                isCurrent ? 'bg-forest-50' : ''
              }`}
            >
              <div className="flex-shrink-0">
                {isComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-leaf-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-forest-600 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-charcoal-200" />
                )}
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  isComplete
                    ? 'text-charcoal-400 line-through'
                    : isCurrent
                      ? 'text-forest-800 font-medium'
                      : 'text-charcoal-300'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
