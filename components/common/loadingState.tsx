import clsx from "clsx";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

type LoadingStateProps = {
  variant?: "default" | "plain";
  text?: string;
  classNamePlain?: string;
};

const LoadingState = ({
  variant = "default",
  text = "loading",
  classNamePlain = "mt-25 flex items-center justify-center",
}: LoadingStateProps) => {
  const t = useTranslations("LoadingState");
  if (variant === "plain") {
    return (
      <div className={clsx(classNamePlain)}>
        <div className="bg-secondary/50 flex size-40 flex-col items-center justify-center gap-5 rounded-xl">
          <Loader2Icon className="size-15 animate-spin stroke-gray-400" />
          <p className="text-base font-normal text-gray-500">{t(text)}</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
        <div className="flex flex-col items-center justify-center text-center font-medium">
          <div className="bg-secondary flex size-40 flex-col items-center justify-center gap-5 rounded-xl">
            <Loader2Icon className="size-15 animate-spin stroke-gray-400" />
            <p className="text-base font-normal text-gray-500">{text}</p>
          </div>
        </div>
      </div>
    );
};

export default LoadingState;
